import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { verificarRoot } from "../middlewares/verificarRoot.js";

const router = express.Router();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
// Mismo criterio que en utils/logger.js: anclado a backend/logs, no a
// process.cwd() (que bajo pm2 puede no ser backend/).
const logsDir = path.resolve(__dirname, "..", "logs");

// Los archivos de log crecen sin límite con el tiempo. Antes esta ruta
// leía y devolvía el archivo completo entero en un solo JSON, lo que con
// meses de uso puede volverse lento/pesado o directamente tirar el
// proceso por consumo de memoria. Ahora se limita a los últimos
// MAX_BYTES_POR_ARCHIVO de cada archivo, y dentro de eso a las últimas
// MAX_LINEAS líneas (el frontend ya solo necesita ver los eventos
// recientes, y pagina del lado del cliente sobre lo que le llega).
const MAX_BYTES_POR_ARCHIVO = 2 * 1024 * 1024; // 2 MB por archivo
const MAX_LINEAS = 5000;

function leerColaDeArchivo(filePath) {
  const { size } = fs.statSync(filePath);
  const bytesALeer = Math.min(size, MAX_BYTES_POR_ARCHIVO);
  const buffer = Buffer.alloc(bytesALeer);
  const fd = fs.openSync(filePath, "r");
  try {
    fs.readSync(fd, buffer, 0, bytesALeer, size - bytesALeer);
  } finally {
    fs.closeSync(fd);
  }

  let contenido = buffer.toString("utf8");
  // Si no arrancamos desde el principio del archivo, la primera línea
  // puede venir cortada a la mitad: la descartamos.
  if (bytesALeer < size) {
    const primerSalto = contenido.indexOf("\n");
    contenido = primerSalto >= 0 ? contenido.slice(primerSalto + 1) : "";
  }

  const lineas = contenido.split("\n").filter(Boolean);
  const truncado = size > MAX_BYTES_POR_ARCHIVO || lineas.length > MAX_LINEAS;
  return { contenido: lineas.slice(-MAX_LINEAS).join("\n"), truncado };
}

router.get("/logs", verificarRoot, (req, res) => {
  try {
    const files = fs.readdirSync(logsDir);
    const logs = files.map((file) => {
      const { contenido, truncado } = leerColaDeArchivo(path.join(logsDir, file));
      return { file, content: contenido, truncado };
    });
    res.json(logs);
  } catch (error) {
    res.status(500).json({ error: "Error al leer logs" });
  }
});

export default router;
