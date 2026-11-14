import winston from "winston";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Anclado a backend/logs, no a process.cwd(): bajo pm2 el cwd depende de
// desde dónde se lance "pm2 start" (no está fijado en ecosystem.config.cjs),
// así que con process.cwd() la carpeta de logs podía terminar en cualquier
// lado, o fallar si el proceso no tiene permiso de escritura ahí.
const logDir = path.resolve(__dirname, "..", "logs");
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.printf(
          ({ level, message, timestamp, controller, action, route }) =>
            `[${timestamp}] [${controller || "-"}] [${action || "-"}] ${route || "-"} - ${level}: ${message}`
        )
      ),
    }),
    new winston.transports.File({
      filename: path.join(logDir, "combined.log"),
      // Rotación básica sin depender de una librería extra: al llegar a
      // ~10MB, winston rota a combined1.log, combined2.log, etc. y
      // mantiene como máximo 5 (el resto se descarta). Antes esto crecía
      // para siempre; ya habíamos tenido que ponerle un techo de lectura
      // en routes/log.js porque el archivo no tenía límite acá.
      maxsize: 10 * 1024 * 1024,
      maxFiles: 5,
      tailable: true,
    }),
  ],
});

export default logger;
