import { createError } from "../utils/createError.js";
import Usuario from "../models/Usuario.js";
import bcrypt from "bcrypt";

export async function autenticarUsuario({ user, password }) {
  const usuario = await Usuario.findOne({ where: { user } });

  if (!usuario) {
    throw createError("Usuario no encontrado", 401, "USER_NOT_FOUND");
  }

  const match = await bcrypt.compare(password, usuario.password);
  if (!match) {
    throw createError("Credenciales inválidas", 401, "INVALID_CREDENTIALS");
  }

  return {
    id: usuario.id,
    usuario: usuario.user,
    rolId: usuario.rolId,
  };
}