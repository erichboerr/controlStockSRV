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
    const error = new Error("marcaId inválido");
    error.isCustom = true;
    error.httpStatus = 400;
    error.code = "INVALID_MARCA";
    throw error;
  }
  if (!modeloId || typeof modeloId !== "number") {
    const error = new Error("modeloId inválido");
    error.isCustom = true;
    error.httpStatus = 400;
    error.code = "INVALID_MODELO";
    throw error;
  }

  try {
    return await Impresora.create({ marcaId, modeloId });
  } catch (err) {
    if (err.name === "Esta IMPRESORA ya existe en el sistema") {
      err.isCustom = true;
      err.httpStatus = 409;
      err.code = "IMPRESORA_EXISTS";
    } else {
      err.isCustom = true;
      err.httpStatus = 500;
      err.code = "DB_ERROR";
    }
    throw err;
  }
}

export async function update(id, data) {
  const impresora = await Impresora.findByPk(id);
  if (!impresora) {
    const error = new Error("Impresora no encontrada");
    error.isCustom = true;
    error.httpStatus = 404;
    error.code = "NOT_FOUND";
    throw error;
  }

  impresora.impresora = data.impresora || impresora.impresora;
  await impresora.save();
  return impresora;
}

export async function remove(id) {
  const impresora = await Impresora.findByPk(id);
  if (!impresora) {
    const error = new Error("Impresora no encontrada");
    error.isCustom = true;
    error.httpStatus = 404;
    error.code = "NOT_FOUND";
    throw error;
  }

  if (!impresora.flagHabilitado) {
    const error = new Error("La impresora ya está dada de baja");
    error.isCustom = true;
    error.httpStatus = 409;
    error.code = "ALREADY_DISABLED";
    throw error;
  }

  await impresora.update({ flagHabilitado: false });
  await impresora.destroy(); // soft delete

  return { mensaje: "Impresora dada de baja" };
}