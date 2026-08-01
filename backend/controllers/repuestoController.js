import sequelize from "../config/db.js";
import { createError } from "../utils/createError.js";
import {
  getAll,
  create,
  registrarIngresoRepuestos,
  registrarEgresoRepuestos,
  obtenerStockActual,
  obtenerStockRepuestos,
  getInsumosBajoStockRepuestos,
  bloquearRepuesto,
} from "../services/repuestoService.js";

// Listar repuestos
export async function ListarRepuestos(req, res, next) {
  try {
    const repuestos = await getAll();
    res.json(repuestos);
  } catch (err) {
    next(err);
  }
}

// Stock actual de un repuesto
export async function StockActual(req, res, next) {
  try {
    const { id } = req.params;
    if (!id) {
      const error = new Error("ID de repuesto requerido");
      error.isCustom = true;
      error.httpStatus = 400;
      error.code = "MISSING_ID";
      throw error;
    }
    const stock = await obtenerStockActual(id);
    res.json({ repuestoId: id, stock });
  } catch (err) {
    next(err);
  }
}

// Crear repuesto
export async function AgregarRepuesto(req, res, next) {
  try {
    const { repuesto, stock_minimo } = req.body;
    const minimo = stock_minimo == null ? 3 : Number(stock_minimo);
    const nuevo = await create(repuesto?.trim().toUpperCase(), minimo);
    res.status(201).json(nuevo);
  } catch (err) {
    next(err);
  }
}

// Registrar ingreso
export async function IngresoRepuesto(req, res, next) {
  try {
    const { proveedorId, remito, items } = req.body;
    const movimientos = await registrarIngresoRepuestos(proveedorId, remito, items);
    res.status(201).json({ message: "Ingreso registrado correctamente", movimientos });
  } catch (err) {
    next(err);
  }
}

// Registrar egreso
export async function EgresoRepuesto(req, res, next) {
  const t = await sequelize.transaction();

  try {
    const { servicioId, items } = req.body;

    if (!servicioId || !items?.length) {
      throw createError("Datos incompletos", 400, "MISSING_DATA");
    }

    for (const item of items) {
      if (!item.repuestoId || !Number.isInteger(item.cantidad) || item.cantidad <= 0) {
        throw createError(
          "Item inválido: repuestoId y cantidad (entero mayor a 0) son obligatorios",
          400,
          "INVALID_ITEM"
        );
      }
    }

    // Agrupamos por repuestoId antes de validar el stock: si el mismo
    // repuesto aparece en más de un renglón del mismo request, hay que
    // chequear la suma total pedida y no cada renglón por separado (si
    // no, dos renglones podían "pasar" cada uno contra el mismo stock
    // todavía no descontado y terminar dejando stock negativo).
    const cantidadPorRepuesto = new Map();
    for (const item of items) {
      cantidadPorRepuesto.set(
        item.repuestoId,
        (cantidadPorRepuesto.get(item.repuestoId) || 0) + item.cantidad
      );
    }

    for (const [repuestoId, cantidadTotal] of cantidadPorRepuesto) {
      // Bloqueamos este repuesto hasta el commit/rollback para que un
      // egreso concurrente del mismo repuesto no lea un stock desactualizado.
      await bloquearRepuesto(repuestoId, t);

      const stockActual = await obtenerStockActual(repuestoId, { transaction: t });

      if (cantidadTotal > stockActual) {
        throw createError(
          `Stock insuficiente para el repuesto ${repuestoId}`,
          409,
          "INSUFFICIENT_STOCK"
        );
      }
    }

    const movimientos = await registrarEgresoRepuestos(servicioId, items, { transaction: t });

    await t.commit();

    res.status(201).json({ message: "Egreso registrado correctamente", movimientos });
  } catch (err) {
    await t.rollback();
    next(err);
  }
}

// Reporte de stock
export async function ReporteStockRepuestos(req, res, next) {
  try {
    const data = await obtenerStockRepuestos();
    res.json(data);
  } catch (err) {
    next(err);
  }
}

// Insumos bajo stock
export async function obtenerInsumosBajoStockRepuestos(req, res, next) {
  try {
    const data = await getInsumosBajoStockRepuestos();
    res.json(data);
  } catch (err) {
    next(err);
  }
}