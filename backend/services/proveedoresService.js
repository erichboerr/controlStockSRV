import { createError } from "../utils/createError.js";
import Proveedor from "../models/Proveedor.js";

export async function getAll() {
  return await Proveedor.findAll({
    where: { flagHabilitado: true },
    order: [["proveedor", "ASC"]],
  });
}

// Crear nuevo
export async function create({ proveedor, telefono, email }) {
  if (!proveedor) {
    const error = new Error("El nombre del proveedor es obligatorio");
    error.isCustom = true;
    error.httpStatus = 400;
    error.code = "MISSING_NAME";
    throw error;
  }

  try {
    return await Proveedor.create({ proveedor, telefono, email });
  } catch (err) {
    if (err.name === "El proveedor ya existe en el sistema") {
      err.isCustom = true;
      err.httpStatus = 409;
      err.code = "PROVEEDOR_EXISTS";
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
  const proveedor = await Proveedor.findByPk(id);
  if (!proveedor) {
    const error = new Error("Proveedor no encontrado");
    error.isCustom = true;
    error.httpStatus = 404;
    error.code = "NOT_FOUND";
    throw error;
  }

  proveedor.proveedor = data.proveedor || proveedor.proveedor;
  proveedor.telefono = data.telefono || proveedor.telefono;
  proveedor.email = data.email || proveedor.email;

  await proveedor.save();
  return proveedor;
}

// Eliminar
export async function remove(id) {
  const proveedor = await Proveedor.findByPk(id);
  if (!proveedor) {
    const error = new Error("Proveedor no encontrado");
    error.isCustom = true;
    error.httpStatus = 404;
    error.code = "NOT_FOUND";
    throw error;
  }

  if (!proveedor.flagHabilitado) {
    const error = new Error("El proveedor ya está dado de baja");
    error.isCustom = true;
    error.httpStatus = 409;
    error.code = "ALREADY_DISABLED";
    throw error;
  }

  await proveedor.update({ flagHabilitado: false });
  await proveedor.destroy(); // soft delete

  return { mensaje: "Proveedor dado de baja" };
}