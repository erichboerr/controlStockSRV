import jwt from "jsonwebtoken";
import logger from "../utils/Logger.js";

export function verificarRoot(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: "Token requerido" });
  }

  const token = authHeader.split(" ")[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    if (payload.rolId === 1) {
      req.user = payload; // opcional: guardar datos del usuario
      next();
    } else {
      res.status(403).json({ error: "Acceso denegado: solo Root" });
    }
  } catch (err) {
    logger.error({
      message: err.message,
      middleware: "verificarRoot",
      action: "verificarRoot",
      route: req.originalUrl,
    });
    res.status(401).json({ error: "token invalido" });
  }
}