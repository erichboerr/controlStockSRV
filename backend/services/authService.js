import { createError } from "../utils/createError.js";
import Usuario from "../models/Usuario.js";
import bcrypt from "bcrypt";

// Mensaje único para usuario inexistente y contraseña incorrecta: si
// devolviéramos mensajes distintos, alguien podría usar el endpoint de
// login para averiguar qué nombres de usuario existen en el sistema
// (enumeración de usuarios) probando uno por uno.
const CREDENCIALES_INVALIDAS = () =>
  createError("Usuario o contraseña incorrectos", 401, "INVALID_CREDENTIALS");

export async function autenticarUsuario({ user, password }) {
  const usuario = await Usuario.findOne({ where: { user } });

  if (!usuario || !usuario.flagHabilitado) {
    // Igualamos el tiempo de respuesta contra un hash "dummy" para no
    // filtrar por timing si el usuario no existe (bcrypt.compare siempre
    // toma un tiempo similar, exista o no la cuenta).
    await bcrypt.compare(password, "$2b$10$abcdefghijklmnopqrstuu");
    throw CREDENCIALES_INVALIDAS();
  }

  const match = await bcrypt.compare(password, usuario.password);
  if (!match) {
    throw CREDENCIALES_INVALIDAS();
  }

  return {
    id: usuario.id,
    usuario: usuario.user,
    rolId: usuario.rolId,
  };
}