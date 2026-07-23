import { listarBackups, restaurarBackup, crearBackup } from "../services/backupService.js";
import logger from "../utils/logger.js";

export async function CrearBackup(req, res, next) {
  try {
    logger.info({
      message: "Backup manual solicitado",
      usuario: req.user?.usuario,
      action: "CrearBackup",
      route: req.originalUrl,
    });

    const resultado = await crearBackup();
    res.status(201).json(resultado);
  } catch (err) {
    next(err);
  }
}

export async function ListarBackups(req, res, next) {
  try {
    const backups = await listarBackups();
    res.json(backups);
  } catch (err) {
    next(err);
  }
}

export async function RestaurarBackup(req, res, next) {
  try {
    const { archivo } = req.body;

    logger.info({
      message: `Restauración de backup solicitada: ${archivo}`,
      usuario: req.user?.usuario,
      action: "RestaurarBackup",
      route: req.originalUrl,
    });

    const resultado = await restaurarBackup(archivo);
    res.status(200).json(resultado);
  } catch (err) {
    next(err);
  }
}
