import logger from "../utils/logger.js";

export function errorHandler(err, req, res, next) {
  // Derivar controller del primer segmento de la URL
  const segments = req.originalUrl.split("/").filter(Boolean);
  const controller = segments.length > 0 ? `/${segments[0]}` : "unknown";
  const action = req.route?.path || "unknown";

  if (err.isCustom) {
    logger.error({
      message: err.message,
      code: err.code || null,
      httpStatus: err.httpStatus || null,
      controller,
      action,
      method: req.method,
      route: req.originalUrl,
      level: "error",
      timestamp: new Date().toISOString(),
    });

    return res.status(err.httpStatus || 400).json({
      error: err.message,
      code: err.code || null,
      ...(err.data !== undefined ? { data: err.data } : {}),
    });
  }

  logger.error({
    message: err.message,
    code: err.code || "INTERNAL_ERROR",
    httpStatus: err.httpStatus || 500,
    stack: err.stack,
    controller,
    action,
    method: req.method,
    route: req.originalUrl,
    level: "error",
    timestamp: new Date().toISOString(),
  });

  return res.status(500).json({ error: "Error interno del servidor" });
}