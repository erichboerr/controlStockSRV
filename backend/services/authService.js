import Usuario from "../models/Usuario.js";
import bcrypt from "bcrypt";

export async function autenticarUsuario({ user, password }) {
  const usuario = await Usuario.findOne({ where: { user } });

  if (!usuario) {
    const error = new Error("Usuario no encontrado");
    error.isCustom = true;
    error.httpStatus = 401;
    error.code = "USER_NOT_FOUND";
    throw error;
  }

  const match = await bcrypt.compare(password, usuario.password);
  if (!match) {
    const error = new Error("Credenciales inválidas");
    error.isCustom = true;
    error.httpStatus = 401;
    error.code = "INVALID_CREDENTIALS";
    throw error;
  }

  return {
    id: usuario.id,
    usuario: usuario.user,
    rolId: usuario.rolId,
  };
}