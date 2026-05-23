import { createError } from "../utils/createError.js";
import Repuesto from "../models/Repuesto.js";
import MovimientoRepuesto from "../models/MovimientoRepuesto.js";
import sequelize from "../config/db.js";

export async function getAll() {
  return await Repuesto.findAll({
    where: { flagHabilitado: true },
    order: [["repuesto", "ASC"]],
  });
}

export async function obtenerStockActual(repuestoId) {
  const ingresos = await MovimientoRepuesto.sum("cantidad", {
    where: { repuestoId, tipo: "ingreso" },
  });
  const egresos = await MovimientoRepuesto.sum("cantidad", {
    where: { repuestoId, tipo: "egreso" },
  });
  return (ingresos || 0) - (egresos || 0);
}

export async function create(repuesto, stock_minimo = 3) {
  if (!repuesto || typeof repuesto !== "string") {
    const error = new Error("Repuesto inválido");
    error.isCustom = true;
    error.httpStatus = 400;
    error.code = "INVALID_REPUESTO";
    throw error;
  }

  try {
    return await Repuesto.create({ repuesto, stock_minimo });
  } catch (err) {
    if (err.name === "SequelizeUniqueConstraintError") {
      err.isCustom = true;
      err.httpStatus = 409;
      err.code = "REPUESTO_EXISTS";
    } else {
      err.isCustom = true;
      err.httpStatus = 500;
      err.code = "DB_ERROR";
    }
    throw err;
  }
}

export async function registrarIngresoRepuestos(proveedorId, remito, items) {
  if (!Array.isArray(items) || items.length === 0) {
    const error = new Error("Items inválidos");
    error.isCustom = true;
    error.httpStatus = 400;
    error.code = "INVALID_ITEMS";
    throw error;
  }

  const movimientosData = items.map((it) => {
    if (!it.repuestoId || !it.cantidad) {
      const error = new Error("Item incompleto");
      error.isCustom = true;
      error.httpStatus = 400;
      error.code = "INVALID_ITEM";
      throw error;
    }
    return {
      tipo: "ingreso",
      cantidad: it.cantidad,
      fecha: new Date(),
      repuestoId: it.repuestoId,
      proveedorId,
      remito,
    };
  });

  return await MovimientoRepuesto.bulkCreate(movimientosData);
}

export async function registrarEgresoRepuestos(servicioId, items) {
  if (!Array.isArray(items) || items.length === 0) {
    const error = new Error("Items inválidos");
    error.isCustom = true;
    error.httpStatus = 400;
    error.code = "INVALID_ITEMS";
    throw error;
  }

  const movimientosData = items.map((it) => {
    if (!it.repuestoId || !it.cantidad) {
      const error = new Error("Item incompleto");
      error.isCustom = true;
      error.httpStatus = 400;
      error.code = "INVALID_ITEM";
      throw error;
    }
    return {
      tipo: "egreso",
      cantidad: it.cantidad,
      fecha: new Date(),
      repuestoId: it.repuestoId,
      servicioId,
    };
  });

  return await MovimientoRepuesto.bulkCreate(movimientosData);
}

export async function obtenerStockRepuestos() {
  return await Repuesto.findAll({
    attributes: [
      "id",
      "repuesto",
      [
        sequelize.literal(
          `COALESCE(SUM(CASE WHEN "movimientosRepuestos"."proveedorId" IS NOT NULL THEN "movimientosRepuestos".cantidad ELSE 0 END), 0)`
        ),
        "ingresos",
      ],
      [
        sequelize.literal(
          `COALESCE(SUM(CASE WHEN "movimientosRepuestos"."servicioId" IS NOT NULL THEN "movimientosRepuestos".cantidad ELSE 0 END), 0)`
        ),
        "egresos",
      ],
      [
        sequelize.literal(
          `COALESCE(SUM(CASE WHEN "movimientosRepuestos"."proveedorId" IS NOT NULL THEN "movimientosRepuestos".cantidad WHEN "movimientosRepuestos"."servicioId" IS NOT NULL THEN -"movimientosRepuestos".cantidad ELSE 0 END), 0)`
        ),
        "stock",
      ],
    ],
    include: [
      {
        model: MovimientoRepuesto,
        as: "movimientosRepuestos",
        attributes: [],
        required: false,
        where: { deletedAt: null },
      },
    ],
    where: { flagHabilitado: true, deletedAt: null },
    group: ["Repuesto.id"],
    order: [["repuesto", "ASC"]],
  });
}

export async function getInsumosBajoStockRepuestos() {
  const query = `
    WITH stock_calculado AS (
      SELECT "repuestoId", SUM(cantidad * CASE WHEN tipo = 'ingreso' THEN 1 ELSE -1 END) AS stock_actual
      FROM movimiento_repuesto
      GROUP BY "repuestoId"
    )
    SELECT i.id, i.repuesto AS nombre, COALESCE(m.stock_actual, 0) AS stock_actual, i.stock_minimo
    FROM repuestos i
    LEFT JOIN stock_calculado AS m ON m."repuestoId" = i.id
    WHERE i."flagHabilitado" = true
      AND COALESCE(m.stock_actual, 0) < i.stock_minimo
    ORDER BY i.repuesto`;

  return await sequelize.query(query, { type: sequelize.QueryTypes.SELECT });
}

