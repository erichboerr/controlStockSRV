import MovimientoInsumo from "../models/MovimientoInsumo.js";

export async function registrarIngresoService({ proveedorId, remito, items }) {
  if (!proveedorId || !remito || !items?.length) {
    const error = new Error("Datos incompletos");
    error.isCustom = true;
    error.httpStatus = 400;
    error.code = "MISSING_DATA";
    throw error;
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
    err.isCustom = true;
    err.httpStatus = 500;
    err.code = "DB_ERROR";
    throw err;
  }
}

export async function registrarEgresoService({ servicioId, items }) {
  if (!servicioId || !items?.length) {
    const error = new Error("Datos incompletos");
    error.isCustom = true;
    error.httpStatus = 400;
    error.code = "MISSING_DATA";
    throw error;
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
    err.isCustom = true;
    err.httpStatus = 500;
    err.code = "DB_ERROR";
    throw err;
  }
}