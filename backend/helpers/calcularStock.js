import MovimientoInsumo from "../models/MovimientoInsumo.js";

export async function calcularStock(insumoId) {
  if (!insumoId) {
    const error = new Error("ID de insumo requerido");
    error.isCustom = true;
    error.httpStatus = 400;
    error.code = "MISSING_ID";
    throw error;
  }

  try {
    const ingresos = await MovimientoInsumo.sum("cantidad", {
      where: { insumoId, tipo: "ingreso" },
    });

    const egresos = await MovimientoInsumo.sum("cantidad", {
      where: { insumoId, tipo: "egreso" },
    });

    return (ingresos || 0) - (egresos || 0);
  } catch (err) {
    err.isCustom = true;
    err.httpStatus = 500;
    err.code = "DB_ERROR";
    throw err;
  }
}