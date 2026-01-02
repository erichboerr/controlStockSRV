import bcrypt from "bcrypt";

/**
 * Hashea una contraseña con sal segura
 * @param {string} plainPassword - Contraseña en texto plano
 * @returns {Promise<string>} - Contraseña hasheada
 */
export async function hashPassword(plainPassword) {
  if (!plainPassword || typeof plainPassword !== "string") {
    throw new Error("Contraseña inválida");
  }

  const saltRounds = 10;
  return await bcrypt.hash(plainPassword, saltRounds);
}
