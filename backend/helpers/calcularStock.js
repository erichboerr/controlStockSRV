import MovimientoInsumo from "../models/MovimientoInsumo.js";
import sequelize from "../config/db.js";

// Namespace para los advisory locks de insumos (ver bloquearInsumo).
// Se usa un segundo "classId" para no chocar con los locks de repuestos,
// que usan su propio namespace en repuestoService.js.
const LOCK_CLASS_INSUMO = 1;

// Toma un advisory lock transaccional de Postgres sobre este insumoId.
// Mientras la transacción no haga commit/rollback, cualquier otra
// transacción que pida el mismo lock queda esperando. Esto evita que dos
// egresos simultáneos del mismo insumo lean el mismo stock "viejo" antes
// de que ninguno haya confirmado su descuento (condición de carrera).
// Se libera solo automáticamente al terminar la transacción.
export async function bloquearInsumo(insumoId, transaction) {
  await sequelize.query("SELECT pg_advisory_xact_lock(:clase, :id)", {
    replacements: { clase: LOCK_CLASS_INSUMO, id: Number(insumoId) },
    transaction,
  });
}

export async function calcularStock(insumoId, options = {}) {
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
      ...options,
    });

    const egresos = await MovimientoInsumo.sum("cantidad", {
      where: { insumoId, tipo: "egreso" },
      ...options,
    });

    return (ingresos || 0) - (egresos || 0);
  } catch (err) {
    err.isCustom = true;
    err.httpStatus = 500;
    err.code = "DB_ERROR";
    throw err;
  }
}
