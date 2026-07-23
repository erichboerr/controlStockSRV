import fs from "fs";
import path from "path";
import { execFile } from "child_process";
import { promisify } from "util";
import { createError } from "../utils/createError.js";
import sequelize from "../config/db.js";

const execFileAsync = promisify(execFile);

// Carpeta donde backup_db.sh deja los .backup (definida en .env)
const BACKUP_DIR = process.env.BACKUP_DIR;

// Solo nombres de archivo "simples": letras, números, guiones, guion bajo,
// punto y la extensión .backup. Nada de '/', '..', espacios, etc.
const NOMBRE_ARCHIVO_VALIDO = /^[a-zA-Z0-9_.-]+\.backup$/;

function obtenerArchivosBackup() {
  if (!BACKUP_DIR) {
    throw createError(
      "No está configurado BACKUP_DIR en el servidor",
      500,
      "BACKUP_DIR_NOT_SET"
    );
  }

  if (!fs.existsSync(BACKUP_DIR)) {
    throw createError(
      "El directorio de backups no existe en el servidor",
      500,
      "BACKUP_DIR_NOT_FOUND"
    );
  }

  return fs
    .readdirSync(BACKUP_DIR)
    .filter((f) => f.endsWith(".backup"));
}

function timestamp() {
  const d = new Date();
  const pad = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}_${pad(
    d.getHours()
  )}-${pad(d.getMinutes())}`;
}

// Borra (de cualquier origen, manual o cron) los backups con más de 7 días.
// La corre también el backup manual, así en desarrollo (sin cron) la carpeta
// de prueba no crece sin límite.
function limpiarBackupsViejos() {
  const LIMITE_DIAS = 7;
  const ahora = Date.now();

  for (const archivo of obtenerArchivosBackup()) {
    const ruta = path.join(BACKUP_DIR, archivo);
    const stats = fs.statSync(ruta);
    const diasDeVida = (ahora - stats.mtime.getTime()) / (1000 * 60 * 60 * 24);
    if (diasDeVida > LIMITE_DIAS) {
      fs.unlinkSync(ruta);
    }
  }
}

export async function crearBackup() {
  if (!BACKUP_DIR) {
    throw createError(
      "No está configurado BACKUP_DIR en el servidor",
      500,
      "BACKUP_DIR_NOT_SET"
    );
  }

  // A diferencia de la restauración, acá sí creamos la carpeta si no existe
  // (es solo el destino del backup, no hay riesgo de tocar datos existentes)
  fs.mkdirSync(BACKUP_DIR, { recursive: true });

  const nombreArchivo = `${process.env.DB_NAME}_manual_${timestamp()}.backup`;
  const rutaCompleta = path.join(BACKUP_DIR, nombreArchivo);

  const args = [
    "-h", process.env.DB_HOST,
    "-p", String(process.env.DB_PORT),
    "-U", process.env.DB_USER,
    "-F", "c",
    "-b",
    "-f", rutaCompleta,
    process.env.DB_NAME,
  ];

  try {
    await execFileAsync("pg_dump", args, {
      env: { ...process.env, PGPASSWORD: process.env.DB_PASS },
      maxBuffer: 1024 * 1024 * 20,
    });
  } catch (err) {
    throw createError(
      `Error al generar el backup: ${err.stderr || err.message}`,
      500,
      "BACKUP_ERROR"
    );
  }

  limpiarBackupsViejos();

  const stats = fs.statSync(rutaCompleta);
  return {
    archivo: nombreArchivo,
    fecha: stats.mtime,
    tamanioMB: +(stats.size / (1024 * 1024)).toFixed(2),
  };
}

export async function listarBackups() {
  const archivos = obtenerArchivosBackup();

  const backups = archivos.map((archivo) => {
    const stats = fs.statSync(path.join(BACKUP_DIR, archivo));
    return {
      archivo,
      fecha: stats.mtime, // fecha real de creación del archivo en disco
      tamanioMB: +(stats.size / (1024 * 1024)).toFixed(2),
    };
  });

  // Más reciente primero
  return backups.sort((a, b) => b.fecha - a.fecha);
}

export async function restaurarBackup(nombreArchivo) {
  if (!nombreArchivo || typeof nombreArchivo !== "string") {
    throw createError("Falta el nombre del backup", 400, "MISSING_DATA");
  }

  if (!NOMBRE_ARCHIVO_VALIDO.test(nombreArchivo)) {
    throw createError("Nombre de archivo inválido", 400, "INVALID_FILENAME");
  }

  // Re-verificar contra el listado real del directorio (no confiar
  // ciegamente en lo que mandó el cliente, aunque haya pasado el regex)
  const archivosDisponibles = obtenerArchivosBackup();
  if (!archivosDisponibles.includes(nombreArchivo)) {
    throw createError(
      "El backup seleccionado no existe",
      404,
      "BACKUP_NOT_FOUND"
    );
  }

  const rutaCompleta = path.join(BACKUP_DIR, nombreArchivo);

  // Cortar otras conexiones activas a la base para que pg_restore
  // (con --clean) pueda dropear y recrear los objetos sin bloqueos.
  // Esta misma conexión queda excluida (pg_backend_pid()).
  try {
    await sequelize.query(
      `SELECT pg_terminate_backend(pid)
       FROM pg_stat_activity
       WHERE datname = current_database() AND pid <> pg_backend_pid();`
    );
  } catch (err) {
    // No es crítico si falla el corte de conexiones; seguimos igual
  }

  const args = [
    "-h", process.env.DB_HOST,
    "-p", String(process.env.DB_PORT),
    "-U", process.env.DB_USER,
    "-d", process.env.DB_NAME,
    "--clean",
    "--if-exists",
    "--no-owner",
    rutaCompleta,
  ];

  try {
    await execFileAsync("pg_restore", args, {
      env: { ...process.env, PGPASSWORD: process.env.DB_PASS },
      maxBuffer: 1024 * 1024 * 20, // 20MB, por si tira mucha salida
    });
  } catch (err) {
    // pg_restore puede devolver código de salida != 0 con warnings no
    // fatales (ej: "no existía, se ignora por --if-exists"). Si el
    // proceso realmente falló, err.stderr trae el detalle.
    throw createError(
      `Error al restaurar el backup: ${err.stderr || err.message}`,
      500,
      "RESTORE_ERROR"
    );
  }

  return { archivo: nombreArchivo, restauradoEn: new Date() };
}
