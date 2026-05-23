import { createError } from "../utils/createError.js";
import Modelo from "../models/Modelo.js";

export async function getAll() {
  return await Modelo.findAll({
    where: { flagHabilitado: true },
    order: [["modelo", "ASC"]],
  });
}

export async function getAllMarca({ idMarca }) {
  const filtros = { flagHabilitado: true };
  if (idMarca) filtros.marcaId = parseInt(idMarca, 10);
  return await Modelo.findAll({ where: filtros });
}

export async function create(modelo, marcaId) {
  if (!modelo || typeof modelo !== "string") {
    throw createError("modelo inválido", 400, "INVALID_MODELO");
  }
  if (!marcaId || typeof marcaId !== "number") {
    throw createError("marcaId inválido", 400, "INVALID_MARCAID");
  }

  const normalizedModelo = modelo.trim().toUpperCase();
  const existente = await Modelo.findOne({ where: { modelo: normalizedModelo, marcaId } });
  if (existente) {
    throw createError("El modelo ya existe para esta marca", 409, "MODELO_EXISTS");
  }

  try {
    return await Modelo.create({ modelo: normalizedModelo, marcaId });
  } catch (err) {
    throw createError("Error al crear modelo", 500, "DB_ERROR");
  }
}

export async function update(id, data) {
  const modelo = await Modelo.findByPk(id);
  if (!modelo) {
    throw createError("modelo no encontrado", 404, "NOT_FOUND");
  }

  modelo.modelo = data.modelo || modelo.modelo;
  await modelo.save();
  return modelo;
}

export async function remove(id) {
  const modelo = await Modelo.findByPk(id);
  if (!modelo) {
    throw createError("Modelo no encontrado", 404, "NOT_FOUND");
  }

  if (!modelo.flagHabilitado) {
    throw createError("El modelo ya está dado de baja", 409, "ALREADY_DISABLED");
  }

  await modelo.update({ flagHabilitado: false });
  return { mensaje: "Modelo dado de baja" };
}