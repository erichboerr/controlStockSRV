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

// Crear nuevo
export async function create(modelo, marcaId) {
  if (!modelo || typeof modelo !== "string") {
    const error = new Error("modelo inválido");
    error.isCustom = true;
    error.httpStatus = 400;
    error.code = "INVALID_MODELO";
    throw error;
  }
  if (!marcaId || typeof marcaId !== "number") {
    const error = new Error("marcaId inválido");
    error.isCustom = true;
    error.httpStatus = 400;
    error.code = "INVALID_MARCAID";
    throw error;
  }

  const normalizedModelo = modelo.trim().toUpperCase();
  const existente = await Modelo.findOne({ where: { modelo: normalizedModelo, marcaId } });
  if (existente) {
    const error = new Error("El modelo ya existe para esta marca");
    error.isCustom = true;
    error.httpStatus = 409;
    error.code = "MODELO_EXISTS";
    throw error;
  }

  try {
    return await Modelo.create({ modelo: normalizedModelo, marcaId });
  } catch (err) {
    err.isCustom = true;
    err.httpStatus = 500;
    err.code = "DB_ERROR";
    throw err;
  }
}

// Actualizar
export async function update(id, data) {
  const modelo = await Modelo.findByPk(id);
  if (!modelo) {
    const error = new Error("modelo no encontrado");
    error.isCustom = true;
    error.httpStatus = 404;
    error.code = "NOT_FOUND";
    throw error;
  }

  modelo.modelo = data.modelo || modelo.modelo;
  await modelo.save();
  return modelo;
}

// Eliminar
export async function remove(id) {
  const modelo = await Modelo.findByPk(id);
  if (!modelo) {
    const error = new Error("Modelo no encontrado");
    error.isCustom = true;
    error.httpStatus = 404;
    error.code = "NOT_FOUND";
    throw error;
  }

  if (!modelo.flagHabilitado) {
    const error = new Error("El modelo ya está dado de baja");
    error.isCustom = true;
    error.httpStatus = 409;
    error.code = "ALREADY_DISABLED";
    throw error;
  }

  await modelo.update({ flagHabilitado: false });
  await modelo.destroy();
  return { mensaje: "Modelo dado de baja" };
}