import { createError } from "../utils/createError.js";
import Usuario from "../models/Usuario.js";
import { hashPassword } from "../helpers/hashPassword.js";
import { normalizeUser } from "../utils/normalize.js";

export async function getAll() {
  return await Usuario.findAll({ order: [["user", "ASC"]] });
}

export async function create(data) {
  const { user, rolId, password } = data;
  const normalizedUser = normalizeUser(user);

  const existente = await Usuario.findOne({ where: { user } });
  const existente2 = await Usuario.findOne({ where: { user: normalizedUser } });

  if (existente || existente2) {
    throw createError("El usuario ya existe", 409, "USER_EXISTS");
  }

  if (!password || password.length < 6) {
    throw createError("Contraseña inválida: debe tener al menos 6 caracteres", 400, "INVALID_PASSWORD");
  }

  const hashed = await hashPassword(password);

  try {
    return await Usuario.create({ user: normalizedUser, rolId, password: hashed });
  } catch (error) {
    if (error?.name === "SequelizeUniqueConstraintError") {
      throw createError("El usuario ya existe", 409, "USER_EXISTS");
    }
    throw error;
  }
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

    const hashed = await hashPassword(data.password);

    if (hashed !== usuario.password) {
      usuario.set("password", hashed);
    } else {
      throw createError("La nueva contraseña coincide con la actual, no se actualiza", 409, "PASSWORD_SAME");
    }
  }

  await usuario.save();
  return usuario;
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