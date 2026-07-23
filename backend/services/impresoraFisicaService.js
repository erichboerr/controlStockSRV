import { createError } from "../utils/createError.js";
import ImpresoraFisica from "../models/ImpresoraFisica.js";
import ImpresoraServicio from "../models/ImpresoraServicio.js";
import Impresora from "../models/Impresora.js";
import sequelize from "../config/db.js";

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

export async function createBulk({ proveedorId, remito, impresoraId, numerosSerie }) {
  if (
    !proveedorId ||
    !remito ||
    !impresoraId ||
    !Array.isArray(numerosSerie) ||
    numerosSerie.length === 0
  ) {
    throw createError("Datos incompletos", 400, "MISSING_DATA");
  }

  // Normalizar (trim + mayúsculas) y sacar duplicados dentro del propio lote
  const seriesNormalizadas = numerosSerie
    .map((s) => (s || "").trim().toUpperCase())
    .filter(Boolean);

  const seriesUnicas = [...new Set(seriesNormalizadas)];
  if (seriesUnicas.length !== seriesNormalizadas.length) {
    throw createError(
      "Hay números de serie repetidos en la carga",
      400,
      "DUPLICATE_IN_BATCH"
    );
  }

  // Verificar que ninguna serie ya exista en la base antes de insertar
  const existentes = await ImpresoraFisica.findAll({
    where: { numeroSerie: seriesUnicas },
  });
  if (existentes.length > 0) {
    const seriesExistentes = existentes.map((e) => e.numeroSerie).join(", ");
    throw createError(
      `Las siguientes series ya están registradas: ${seriesExistentes}`,
      409,
      "DUPLICATE_SERIE"
    );
  }

  const registros = seriesUnicas.map((numeroSerie) => ({
    proveedorId,
    remito,
    impresoraId,
    numeroSerie,
  }));

  const t = await sequelize.transaction();
  try {
    const creadas = await ImpresoraFisica.bulkCreate(registros, {
      transaction: t,
    });
    await t.commit();
    return creadas;
  } catch (err) {
    await t.rollback();
    if (err.isCustom) throw err;
    throw createError("Error al registrar las impresoras", 500, "DB_ERROR");
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