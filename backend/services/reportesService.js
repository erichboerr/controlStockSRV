import { createError } from "../utils/createError.js";
import { Sequelize } from "sequelize";
import Insumo from "../models/Insumo.js";
import MovimientoInsumo from "../models/MovimientoInsumo.js";
import Servicio from "../models/Servicio.js";
import Proveedor from "../models/Proveedor.js";

export async function obtenerStock() {
  try {
    return await Insumo.findAll({
      attributes: [
        "id",
        "insumo",
        [
          Sequelize.literal(
            `COALESCE(SUM(CASE WHEN "movimientos"."proveedorId" IS NOT NULL THEN "movimientos".cantidad ELSE 0 END), 0)`
          ),
          "ingresos",
        ],
        [
          Sequelize.literal(
            `COALESCE(SUM(CASE WHEN "movimientos"."servicioId" IS NOT NULL THEN "movimientos".cantidad ELSE 0 END), 0)`
          ),
          "egresos",
        ],
        [
          Sequelize.literal(
            `COALESCE(SUM(CASE WHEN "movimientos"."proveedorId" IS NOT NULL THEN "movimientos".cantidad WHEN "movimientos"."servicioId" IS NOT NULL THEN -"movimientos".cantidad ELSE 0 END), 0)`
          ),
          "stock",
        ],
      ],
      include: [
        {
          association: "movimientos",
          attributes: [],
          required: false,
          where: { deletedAt: null },
        },
      ],
      where: { flagHabilitado: true, deletedAt: null },
      group: ["Insumo.id"],
      order: [["insumo", "ASC"]],
    });
  } catch (err) {
    throw createError("Error al obtener stock", 500, "DB_ERROR");
  }
}

export async function RepoMovInsumosServicioService({ desde, hasta, servicio }) {
  if (!desde || !hasta || !servicio) {
    throw createError("Parámetros obligatorios faltantes", 400, "MISSING_PARAMS");
  }

  return await MovimientoInsumo.findAll({
    where: {
      servicioId: servicio,
      fecha: {
        [Sequelize.Op.between]: [
          new Date(`${desde}T00:00:00-03:00`),
          new Date(`${hasta}T23:59:59-03:00`),
        ],
      },
      flagHabilitado: true,
    },
    include: [
      { model: Insumo, as: "insumo", attributes: ["insumo"] },
      { model: Servicio, as: "servicio", attributes: ["servicio"] },
    ],
    order: [["fecha", "ASC"]],
  });
}

export async function RepoMovimientosInsumosService({ desde, hasta, insumo }) {
  if (!desde || !hasta || !insumo) {
    throw createError("Parámetros obligatorios faltantes", 400, "MISSING_PARAMS");
  }

  return await MovimientoInsumo.findAll({
    where: {
      insumoId: insumo,
      fecha: {
        [Sequelize.Op.between]: [
          new Date(`${desde}T00:00:00-03:00`),
          new Date(`${hasta}T23:59:59-03:00`),
        ],
      },
      flagHabilitado: true,
    },
    include: [
      { model: Insumo, as: "insumo", attributes: ["insumo"] },
      { model: Servicio, as: "servicio", attributes: ["servicio"] },
      { model: Proveedor, as: "proveedorInsumos", attributes: ["proveedor"] },
    ],
    order: [["fecha", "ASC"]],
  });
}

export async function RepoIngresosPorInsumoService({ desde, hasta, insumo }) {
  if (!desde || !hasta || !insumo) {
    throw createError("Parámetros obligatorios faltantes", 400, "MISSING_PARAMS");
  }

  return await MovimientoInsumo.findAll({
    where: {
      insumoId: insumo,
      tipo: "ingreso",
      fecha: {
        [Sequelize.Op.between]: [
          new Date(`${desde}T00:00:00-03:00`),
          new Date(`${hasta}T23:59:59-03:00`),
        ],
      },
      flagHabilitado: true,
    },
    include: [
      { model: Insumo, as: "insumo", attributes: ["insumo"] },
      { model: Proveedor, as: "proveedorInsumos", attributes: ["proveedor"] },
    ],
    order: [["fecha", "ASC"]],
  });
}

export async function RepoIngresosPorProveedorService({ desde, hasta, proveedor }) {
  if (!desde || !hasta || !proveedor) {
    throw createError("Parámetros obligatorios faltantes", 400, "MISSING_PARAMS");
  }

  return await MovimientoInsumo.findAll({
    where: {
      proveedorId: proveedor,
      tipo: "ingreso",
      fecha: {
        [Sequelize.Op.between]: [
          new Date(`${desde}T00:00:00-03:00`),
          new Date(`${hasta}T23:59:59-03:00`),
        ],
      },
      flagHabilitado: true,
    },
    include: [
      { model: Insumo, as: "insumo", attributes: ["insumo"] },
      { model: Proveedor, as: "proveedorInsumos", attributes: ["proveedor"] },
    ],
    order: [["fecha", "ASC"]],
  });
}