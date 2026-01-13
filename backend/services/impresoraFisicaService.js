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

export async function create({
  proveedorId,
  numeroSerie,
  remito,
  impresoraId,
}) {
  if (!proveedorId || !numeroSerie || !remito || !impresoraId) {
    const error = new Error("Datos incompletos");
    error.isCustom = true;
    error.httpStatus = 400;
    error.code = "MISSING_DATA";
    throw error;
  }

  try {
    return await ImpresoraFisica.create({
      proveedorId,
      numeroSerie,
      remito,
      impresoraId,
    });
  } catch (err) {
    err.isCustom = true;
    err.httpStatus = 500;
    err.code = "DB_ERROR";
    throw err;
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

  // ✅ Solo las que NO tienen entrega activa
  return impresoras.filter((f) => f.servicios.length === 0);
}

export async function darDeBajaImpresoraService(impresoraFisicaId) {
  if (!impresoraFisicaId) {
    const error = new Error("Falta impresoraFisicaId");
    error.isCustom = true;
    error.httpStatus = 400;
    error.code = "MISSING_ID";
    throw error;
  }

  const impresora = await ImpresoraFisica.findByPk(impresoraFisicaId);
  if (!impresora) {
    const error = new Error("Impresora física no encontrada");
    error.isCustom = true;
    error.httpStatus = 404;
    error.code = "NOT_FOUND";
    throw error;
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
      const error = new Error("La impresora física seleccionada no existe");
      error.isCustom = true;
      error.httpStatus = 404;
      throw error;
    }

    // El método update guarda automáticamente y maneja el updatedAt
    await impresora.update({ numeroSerie: numeroSerie });

    return impresora;
  } catch (error) {
    // Si es error de Sequelize (como UniqueConstraint), lo lanzamos para que el controller lo vea
    if (error.name === 'SequelizeUniqueConstraintError') throw error;

    if (!error.isCustom) {
      console.error("Error Interno:", error);
      const customError = new Error("No se pudo actualizar la serie");
      customError.isCustom = true;
      customError.httpStatus = 500;
      throw customError;
    }
    throw error;
  }
}
