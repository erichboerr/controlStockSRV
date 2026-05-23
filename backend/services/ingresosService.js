import { createError } from "../utils/createError.js";
import MovimientoInsumo from "../models/MovimientoInsumo.js";

export async function registrarIngresoService({ proveedorId, remito, items }) {
  if (!proveedorId || !remito || !items?.length) {
    throw createError("Datos incompletos", 400, "MISSING_DATA");
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
    return await MovimientoInsumo.bulkCreate(movimientos);
  } catch (err) {
    throw createError("Error al registrar ingreso", 500, "DB_ERROR");
  }
}

export async function registrarEgresoService({ servicioId, items }) {
  if (!servicioId || !items?.length) {
    throw createError("Datos incompletos", 400, "MISSING_DATA");
  }

  const movimientos = items.map(it => ({
    tipo: "egreso",
    cantidad: it.cantidad,
    fecha: new Date(),
    insumoId: it.insumoId,
    servicioId,
  }));

  try {
    return await MovimientoInsumo.bulkCreate(movimientos);
  } catch (err) {
    throw createError("Error al registrar egreso", 500, "DB_ERROR");
  }
}