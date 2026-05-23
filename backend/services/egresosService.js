import { createError } from "../utils/createError.js";
import MovimientoInsumo from "../models/MovimientoInsumo.js";

export async function egresarInsumoService({ servicioId, items }) {
  const movimientos = items.map((it) => ({
    tipo: "egreso",
    cantidad: it.cantidad,
    fecha: new Date(),
    insumoId: it.insumoId,
    servicioId,
    proveedorId: null,
  }));

  try {
    await MovimientoInsumo.bulkCreate(movimientos);
  } catch (error) {
    throw createError("Error al registrar egreso", 500, "DB_ERROR");
  }
}