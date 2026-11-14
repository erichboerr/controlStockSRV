import rateLimit from "express-rate-limit";
import logger from "../utils/logger.js";

// Limita los intentos de login por IP para frenar ataques de fuerza bruta.
// No cuenta los logins exitosos (skipSuccessfulRequests), así que un usuario
// legítimo que se equivoca de contraseña un par de veces no se ve afectado,
// pero un intento de fuerza bruta sostenido sí queda bloqueado.
export const loginRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: true,
  handler: (req, res) => {
    logger.error({
      message: "Límite de intentos de login excedido",
      controller: "/auth",
      action: "loginRateLimiter",
      route: req.originalUrl,
    });
    res.status(429).json({
      success: false,
      message: "Demasiados intentos de inicio de sesión. Probá de nuevo en unos minutos.",
    });
  },
});
