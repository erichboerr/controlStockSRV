import { createError } from "../utils/createError.js";
import Marca from "../models/Marca.js";

export async function getAll() {
  return await Marca.findAll({
    where: { flagHabilitado: true },
    order: [["marca", "ASC"]],
  });
}

export async function create(marca) {
  if (!marca || typeof marca !== "string") {
    throw createError("Marca inválida", 400, "INVALID_MARCA");
  }

  try {
    return await Marca.create({ marca });
  } catch (err) {
    if (err.name === "Esta marca ya existe en el sistema") {
      throw createError("Esta marca ya existe en el sistema", 409, "MARCA_EXISTS");
    }
    throw createError("Error al crear marca", 500, "DB_ERROR");
  }
}

export async function update(id, data) {
  const marca = await Marca.findByPk(id);
  if (!marca) {
    throw createError("Marca no encontrada", 404, "NOT_FOUND");
  }

  marca.marca = data.marca || marca.marca;
  await marca.save();
  return marca;
}

export async function remove(id) {
  const marca = await Marca.findByPk(id);
  if (!marca) {
    throw createError("Marca no encontrada", 404, "NOT_FOUND");
  }

  if (!marca.flagHabilitado) {
    throw createError("La marca ya está dada de baja", 409, "ALREADY_DISABLED");
  }

  await marca.update({ flagHabilitado: false });
  return { mensaje: "Marca dada de baja" };
}