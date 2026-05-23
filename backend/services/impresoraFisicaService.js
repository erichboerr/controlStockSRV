import { createError } from "../utils/createError.js";
import ImpresoraFisica from "../models/ImpresoraFisica.js";
import ImpresoraServicio from "../models/ImpresoraServicio.js";
import Impresora from "../models/Impresora.js";

export async function getAll() {
  return await ImpresoraFisica.findAll({
    where: { flagHabilitado: true },
    include: [
      {
        model: Impresora,
        as: "impresora",
        include: ["marca", "modelo"],
      },
      {
        model: ImpresoraServicio,
        as: "servicios",
        required: false,
        where: { fechaRetiro: null },
      },
    ],
  });
}

export async function create({ proveedorId, numeroSerie, remito, impresoraId }) {
  if (!proveedorId || !numeroSerie || !remito || !impresoraId) {
    throw createError("Datos incompletos", 400, "MISSING_DATA");
  }

  try {
    return await ImpresoraFisica.create({ proveedorId, numeroSerie, remito, impresoraId });
  } catch (err) {
    throw createError("Error al registrar impresora", 500, "DB_ERROR");
  }
}

export async function obtenerSeriesDisponibles({ marcaId, modeloId }) {
  const impresoras = await ImpresoraFisica.findAll({
    where: { flagHabilitado: true },
    include: [
      {
        model: Impresora,
        as: "impresora",
        where: { modeloId, marcaId },
      },
      {
        model: ImpresoraServicio,
        as: "servicios",
        required: false,
        where: { fechaRetiro: null },
      },
    ],
  });

  return impresoras.filter((f) => f.servicios.length === 0);
}

export async function darDeBajaImpresoraService(impresoraFisicaId) {
  if (!impresoraFisicaId) {
    throw createError("Falta impresoraFisicaId", 400, "MISSING_ID");
  }

  const impresora = await ImpresoraFisica.findByPk(impresoraFisicaId);
  if (!impresora) {
    throw createError("Impresora física no encontrada", 404, "NOT_FOUND");
  }

  impresora.flagHabilitado = false;
  impresora.fechaBaja = new Date();
  await impresora.save();

  return impresora;
}

export async function updateSerie(id, numeroSerie) {
  try {
    const impresora = await ImpresoraFisica.findByPk(id);

    if (!impresora) {
      throw createError("La impresora física seleccionada no existe", 404, "NOT_FOUND");
    }

    await impresora.update({ numeroSerie });
    return impresora;
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") throw error;
    if (!error.isCustom) {
      throw createError("No se pudo actualizar la serie", 500, "DB_ERROR");
    }
    throw error;
  }
}