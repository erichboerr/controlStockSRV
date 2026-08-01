import { createError } from "../utils/createError.js";
import MovimientoInsumo from "../models/MovimientoInsumo.js";

// egresoService.js
export async function egresarInsumoService({ servicioId, items }, options = {}) {
  const movimientos = items.map((it) => ({
    tipo: "egreso",
    cantidad: it.cantidad,
    fecha: new Date(),
    insumoId: it.insumoId,
    servicioId,
    proveedorId: null,
  }));

  try {
    // validate:true es necesario: por default, bulkCreate de Sequelize NO
    // corre las validaciones definidas en el modelo (como el min:1 de
    // cantidad en MovimientoInsumo), así que sin esto se podían colar
    // cantidades inválidas directo a la base.
    await MovimientoInsumo.bulkCreate(movimientos, { ...options, validate: true });
  } catch (error) {
    if (error?.name === "SequelizeValidationError") {
      throw createError("Datos de egreso inválidos", 400, "INVALID_ITEM");
    }
    throw createError("Error al registrar egreso", 500, "DB_ERROR");
  }
}