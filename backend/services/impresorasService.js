import { createError } from "../utils/createError.js";
import Impresora from "../models/Impresora.js";

export async function getAll() {
  return await Impresora.findAll({
    where: { flagHabilitado: true },
    order: [["impresora", "ASC"]],
  });
}

export async function obtenerImpresoraPorMarcaYModelo(marcaId, modeloId) {
  return await Impresora.findOne({
    where: {
      marcaId: parseInt(marcaId),
      modeloId: parseInt(modeloId),
    },
  });
}

export async function create({ marcaId, modeloId }) {
  if (!marcaId || typeof marcaId !== "number") {
    throw createError("marcaId inválido", 400, "INVALID_MARCA");
  }
  if (!modeloId || typeof modeloId !== "number") {
    throw createError("modeloId inválido", 400, "INVALID_MODELO");
  }

  try {
    return await Impresora.create({ marcaId, modeloId });
  } catch (err) {
    if (err.name === "Esta IMPRESORA ya existe en el sistema") {
      throw createError("Esta impresora ya existe en el sistema", 409, "IMPRESORA_EXISTS");
    }
    throw createError("Error al crear impresora", 500, "DB_ERROR");
  }
}

export async function update(id, data) {
  const impresora = await Impresora.findByPk(id);
  if (!impresora) {
    throw createError("Impresora no encontrada", 404, "NOT_FOUND");
  }

  impresora.impresora = data.impresora || impresora.impresora;
  await impresora.save();
  return impresora;
}

export async function remove(id) {
  const impresora = await Impresora.findByPk(id);
  if (!impresora) {
    throw createError("Impresora no encontrada", 404, "NOT_FOUND");
  }

  if (!impresora.flagHabilitado) {
    throw createError("La impresora ya está dada de baja", 409, "ALREADY_DISABLED");
  }

  await impresora.update({ flagHabilitado: false });
  return { mensaje: "Impresora dada de baja" };
}