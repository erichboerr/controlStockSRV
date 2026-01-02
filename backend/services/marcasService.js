import Marca from "../models/Marca.js";

export async function getAll() {
  return await Marca.findAll({
    where: { flagHabilitado: true },
    order: [["marca", "ASC"]],
  });
}

// Crear nuevo
export async function create(marca) {
  if (!marca || typeof marca !== "string") {
    const error = new Error("Marca inválida");
    error.isCustom = true;
    error.httpStatus = 400;
    error.code = "INVALID_MARCA";
    throw error;
  }

  try {
    return await Marca.create({ marca });
  } catch (err) {
    if (err.name === "SequelizeUniqueConstraintError") {
      err.isCustom = true;
      err.httpStatus = 409;
      err.code = "MARCA_EXISTS";
    } else {
      err.isCustom = true;
      err.httpStatus = 500;
      err.code = "DB_ERROR";
    }
    throw err;
  }
}

// Actualizar
export async function update(id, data) {
  const marca = await Marca.findByPk(id);
  if (!marca) {
    const error = new Error("Marca no encontrada");
    error.isCustom = true;
    error.httpStatus = 404;
    error.code = "NOT_FOUND";
    throw error;
  }

  marca.marca = data.marca || marca.marca;
  await marca.save();
  return marca;
}

// Eliminar
export async function remove(id) {
  const marca = await Marca.findByPk(id);
  if (!marca) {
    const error = new Error("Marca no encontrada");
    error.isCustom = true;
    error.httpStatus = 404;
    error.code = "NOT_FOUND";
    throw error;
  }

  if (!marca.flagHabilitado) {
    const error = new Error("La marca ya está dada de baja");
    error.isCustom = true;
    error.httpStatus = 409;
    error.code = "ALREADY_DISABLED";
    throw error;
  }

  await marca.update({ flagHabilitado: false });
  await marca.destroy();

  return { mensaje: "Marca dada de baja" };
}