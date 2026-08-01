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

  const existente = await Proveedor.findOne({ where: { proveedor } });
  if (existente) {
    if (existente.flagHabilitado) {
      throw createError("Ya existe un proveedor con ese nombre", 409, "PROVEEDOR_EXISTS");
    }
    throw createError(
      "Ya existe un proveedor con ese nombre, dado de baja",
      409,
      "EXISTS_DISABLED",
      { id: existente.id, nombre: existente.proveedor, bajaEl: existente.updatedAt }
    );
  }

  try {
    return await Proveedor.create({ proveedor, telefono, email });
  } catch (err) {
    if (err.name === "SequelizeUniqueConstraintError") {
      // proveedor, email y teléfono son todos únicos: identificamos cuál
      // fue el que chocó para no decir siempre "el proveedor ya existe"
      // cuando en realidad el duplicado era el teléfono o el email.
      const campo = err.errors?.[0]?.path;
      const mensajes = {
        proveedor: "Ya existe un proveedor con ese nombre",
        telefono: "Ya existe un proveedor con ese teléfono",
        email: "Ya existe un proveedor con ese email",
      };
      throw createError(mensajes[campo] || "El proveedor ya existe en el sistema", 409, "PROVEEDOR_EXISTS");
    }
    throw createError("Error al crear proveedor", 500, "DB_ERROR");
  }
}

export async function reactivar(id) {
  const proveedor = await Proveedor.findByPk(id);
  if (!proveedor) {
    throw createError("Proveedor no encontrado", 404, "NOT_FOUND");
  }
  if (proveedor.flagHabilitado) {
    throw createError("El proveedor ya está habilitado", 409, "ALREADY_ENABLED");
  }
  await proveedor.update({ flagHabilitado: true });
  return proveedor;
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