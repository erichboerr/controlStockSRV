import { createError } from "../utils/createError.js";
import Proveedor from "../models/Proveedor.js";

export async function getAll() {
  return await Proveedor.findAll({
    where: { flagHabilitado: true },
    order: [["proveedor", "ASC"]],
  });
}

export async function create({ proveedor, telefono, email }) {
  if (!proveedor) {
    throw createError("El nombre del proveedor es obligatorio", 400, "MISSING_NAME");
  }

  try {
    return await Proveedor.create({ proveedor, telefono, email });
  } catch (err) {
    if (err.name === "El proveedor ya existe en el sistema") {
      throw createError("El proveedor ya existe en el sistema", 409, "PROVEEDOR_EXISTS");
    }
    throw createError("Error al crear proveedor", 500, "DB_ERROR");
  }
}

export async function update(id, data) {
  const proveedor = await Proveedor.findByPk(id);
  if (!proveedor) {
    throw createError("Proveedor no encontrado", 404, "NOT_FOUND");
  }

  proveedor.proveedor = data.proveedor || proveedor.proveedor;
  proveedor.telefono = data.telefono || proveedor.telefono;
  proveedor.email = data.email || proveedor.email;

  await proveedor.save();
  return proveedor;
}

export async function remove(id) {
  const proveedor = await Proveedor.findByPk(id);
  if (!proveedor) {
    throw createError("Proveedor no encontrado", 404, "NOT_FOUND");
  }

  if (!proveedor.flagHabilitado) {
    throw createError("El proveedor ya está dado de baja", 409, "ALREADY_DISABLED");
  }

  await proveedor.update({ flagHabilitado: false });
  return { mensaje: "Proveedor dado de baja" };
}