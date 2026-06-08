import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET;

export function generarToken(payload) {
  return jwt.sign(payload, SECRET, { expiresIn: "8h" });
}