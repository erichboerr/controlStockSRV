import { createError } from "../utils/createError.js";
import Usuario from "../models/Usuario.js";
import { hashPassword } from "../helpers/hashPassword.js";
import { normalizeUser } from "../utils/normalize.js";
import bcrypt from "bcrypt";

export async function getAll() {
  // El hash de la contraseña nunca debe salir del backend: aunque esta
  // ruta ya está restringida a ROOT, no hay motivo para exponerlo y así
  // se evita que quede disponible para un intento de crackeo offline.
  return await Usuario.findAll({
    order: [["user", "ASC"]],
    attributes: { exclude: ["password"] },
  });
}

export async function create(data) {
  const { user, rolId, password } = data;
  const normalizedUser = normalizeUser(user);

  const existente = await Usuario.findOne({ where: { user: normalizedUser } });

  if (existente) {
    if (existente.flagHabilitado) {
      throw createError("El usuario ya existe", 409, "USER_EXISTS");
    }
    // Existe pero está dado de baja: no lo recreamos (chocaría contra el
    // unique constraint de "user"). Avisamos al frontend para que le
    // ofrezca al usuario reactivarlo en vez de fallar sin más.
    throw createError(
      "Ya existe un usuario con ese nombre, dado de baja",
      409,
      "EXISTS_DISABLED",
      { id: existente.id, nombre: existente.user, bajaEl: existente.updatedAt }
    );
  }

  if (!password || password.length < 6) {
    throw createError("Contraseña inválida: debe tener al menos 6 caracteres", 400, "INVALID_PASSWORD");
  }

  const hashed = await hashPassword(password);

  try {
    const creado = await Usuario.create({ user: normalizedUser, rolId, password: hashed });
    const { password: _omit, ...sinPassword } = creado.toJSON();
    return sinPassword;
  } catch (error) {
    if (error?.name === "SequelizeUniqueConstraintError") {
      throw createError("El usuario ya existe", 409, "USER_EXISTS");
    }
    throw error;
  }
}

export async function reactivar(id, { rolId, password }) {
  const usuario = await Usuario.findByPk(id);
  if (!usuario) {
    throw createError("Usuario no encontrado", 404, "NOT_FOUND");
  }
  if (usuario.flagHabilitado) {
    throw createError("El usuario ya está habilitado", 409, "ALREADY_ENABLED");
  }
  if (!password || password.length < 6) {
    throw createError("Contraseña inválida: debe tener al menos 6 caracteres", 400, "INVALID_PASSWORD");
  }

  // Al reactivar tomamos el rol y la contraseña que se acaban de tipear en
  // el formulario de alta: para quien lo está usando, esto es "volver a
  // crear" la cuenta, así que tiene sentido dejarla con esos datos frescos
  // en vez de resucitar la contraseña vieja.
  usuario.rolId = rolId || usuario.rolId;
  usuario.set("password", await hashPassword(password));
  usuario.flagHabilitado = true;
  await usuario.save();

  const { password: _omit, ...sinPassword } = usuario.toJSON();
  return sinPassword;
}

export async function update(id, data) {
  const { password } = data;
  const usuario = await Usuario.findByPk(id);

  if (!usuario) {
    throw createError("Usuario no encontrado", 404, "USER_NOT_FOUND");
  }

  usuario.user = data.user || usuario.user;
  usuario.rolId = data.rolId || usuario.rolId;

  if (data.password) {
    if (!password || password.length < 6) {
      throw createError("Contraseña inválida: debe tener al menos 6 caracteres", 400, "INVALID_PASSWORD");
    }

    // bcrypt genera una sal distinta en cada hash, así que dos hashes de la
    // misma contraseña nunca son iguales entre sí. Para saber si la nueva
    // contraseña coincide con la actual hay que comparar el texto plano
    // contra el hash guardado con bcrypt.compare, no comparar dos hashes.
    const esIgualALaActual = await bcrypt.compare(data.password, usuario.password);
    if (esIgualALaActual) {
      throw createError("La nueva contraseña coincide con la actual, no se actualiza", 409, "PASSWORD_SAME");
    }

    usuario.set("password", await hashPassword(data.password));
  }

  await usuario.save();
  const { password: _omit, ...sinPassword } = usuario.toJSON();
  return sinPassword;
}

export async function remove(id) {
  if (!id) {
    throw createError("ID de usuario requerido", 400, "MISSING_ID");
  }

  const usuario = await Usuario.findByPk(id);
  if (!usuario) {
    throw createError("Usuario no encontrado", 404, "USER_NOT_FOUND");
  }

  if (!usuario.flagHabilitado) {
    throw createError("El usuario ya está dado de baja", 409, "USER_ALREADY_DISABLED");
  }

  await usuario.update({ flagHabilitado: false });
  return { mensaje: "Usuario dado de baja" };
}