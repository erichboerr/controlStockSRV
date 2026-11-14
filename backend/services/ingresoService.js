import { createError } from "../utils/createError.js";
import MovimientoInsumo from "../models/MovimientoInsumo.js";

export async function registrarIngresoService({ proveedorId, remito, items }) {
  if (!proveedorId || !remito || !items?.length) {
    throw createError("Datos incompletos", 400, "MISSING_DATA");
  }

  // Mismo criterio que en el egreso: insumoId presente y cantidad entera > 0.
  for (const it of items) {
    if (!it.insumoId || !Number.isInteger(it.cantidad) || it.cantidad <= 0) {
      throw createError(
        `Item inválido: insumoId y cantidad (entero mayor a 0) son obligatorios`,
        400,
        "INVALID_ITEM"
      );
    }
  }

  const movimientos = items.map(it => ({
    tipo: "ingreso",
    cantidad: it.cantidad,
    fecha: new Date(),
    insumoId: it.insumoId,
    remito,
    proveedorId,
    servicioId: null,
  }));

  try {
    // validate:true: bulkCreate no corre las validaciones del modelo por
    // default (ver detalle en egresoService.js).
    return await MovimientoInsumo.bulkCreate(movimientos, { validate: true });
  } catch (err) {
    if (err?.name === "SequelizeValidationError") {
      throw createError("Datos de ingreso inválidos", 400, "INVALID_ITEM");
    }
    throw createError("Error al registrar ingreso", 500, "DB_ERROR");
  }
}
