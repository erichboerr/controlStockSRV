import jwt from "jsonwebtoken";
import logger from "../utils/logger.js";

// rolId 1 = ROOT, rolId 2 = ADMINISTRADOR (ver seeders/cargarSeeds.js)
const ROLES_PERMITIDOS = [1, 2];

export function verificarRootOAdmin(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: "Token requerido" });
  }

  const token = authHeader.split(" ")[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    if (ROLES_PERMITIDOS.includes(payload.rolId)) {
      req.user = payload;
      next();
    } else {
      res
        .status(403)
        .json({ error: "Acceso denegado: solo Root o Administrador" });
    }
  } catch (err) {
    logger.error({
      message: err.message,
      middleware: "verificarRootOAdmin",
      action: "verificarRootOAdmin",
      route: req.originalUrl,
    });
    res.status(401).json({ error: "token invalido" });
  }
}
