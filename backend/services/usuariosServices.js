import Usuario from "../models/Usuario.js";
import { hashPassword } from "../helpers/hashPassword.js";
import { normalizeUser } from "../utils/normalize.js";

// GET - listar todos
export async function getAll() {
  return await Usuario.findAll({ order: [["user", "ASC"]] });
}

/*********************************************************************/
export async function create(data) {
  const { user, rolId, password } = data;

  const normalizedUser = normalizeUser(user);

  // 1) Validación previa por existencia (con normalización)
  const existente = await Usuario.findOne({ where: { user: user } });
  const existente2 = await Usuario.findOne({ where: { user: normalizedUser } });

  if (existente || existente2) {
  const error = new Error("El usuario ya existe");
  error.isCustom = true;
  error.httpStatus = 409;       // 👈 Conflict
  error.code = "USER_EXISTS";   // 👈 código interno
  throw error;
}

  if (!password || password.length < 6) {
    const error = new Error(
      "Contraseña inválida: debe tener al menos 6 caracteres"
    );
    error.isCustom = true;
    error.httpStatus = 400;
    error.code = "INVALID_PASSWORD";
    throw error;
  }

  const hashed = await hashPassword(password);

  // 2) Crear y capturar violaciones de unicidad por carreras concurrentes
  try {
    return await Usuario.create({
      user: normalizedUser,
      rolId,
      password: hashed,
    });
  } catch (error) {
    if (error?.name === "SequelizeUniqueConstraintError") {
      error.isCustom = true;
      error.httpStatus = 409;
      error.message = "El usuario ya existe";
    }
    throw error;
  }
}

/*********************************************************************/
// PUT - actualizar
export async function update(id, data) {
  const { password } = data;

  const usuario = await Usuario.findByPk(id);

  if (!usuario) {
    const error = new Error("Usuario no encontrado");
    error.isCustom = true;
    error.httpStatus = 404;
    error.code = "USER_NOT_FOUND";
    throw error;
  }

  usuario.user = data.user || usuario.user;
  usuario.rolId = data.rolId || usuario.rolId;

  if (data.password) {
    if (!password || password.length < 6) {
      const error = new Error(
        "Contraseña inválida: debe tener al menos 6 caracteres"
      );
      error.isCustom = true;
      error.httpStatus = 400;
      error.code = "INVALID_PASSWORD";
      throw error;
    }

    const hashed = await hashPassword(data.password);

    if (hashed !== usuario.password) {
      usuario.set("password", hashed);
    } else {
      const error = new Error(
        "La nueva contraseña coincide con la actual, no se actualiza"
      );
      error.isCustom = true;
      error.httpStatus = 409; // Conflict
      error.code = "PASSWORD_SAME";
      throw error;
    }
  }

  await usuario.save();
  return usuario;
}

/*********************************************************************/
export async function remove(id) {
  // 1) Validar ID
  if (!id) {
    const error = new Error("ID de usuario requerido");
    error.isCustom = true;
    error.httpStatus = 400;
    error.code = "MISSING_ID";
    throw error;
  }

  // 2) Buscar usuario
  const usuario = await Usuario.findByPk(id);
  if (!usuario) {
    const error = new Error("Usuario no encontrado");
    error.isCustom = true;
    error.httpStatus = 404;
    error.code = "USER_NOT_FOUND";
    throw error;
  }

  // 3) Validar estado habilitado
  if (!usuario.flagHabilitado) {
    const error = new Error("El usuario ya está dado de baja");
    error.isCustom = true;
    error.httpStatus = 409; // Conflict
    error.code = "USER_ALREADY_DISABLED";
    throw error;
  }

  // 4) Soft delete
  await usuario.update({ flagHabilitado: false });
  await usuario.destroy(); // setea deletedAt

  return {
    mensaje: "Usuario dado de baja",
  };
}

/*********************************************************************/
