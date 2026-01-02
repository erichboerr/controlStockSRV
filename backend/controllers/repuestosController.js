import {
  getAll,
  create,
  registrarIngresoRepuestos,
  registrarEgresoRepuestos,
  obtenerStockActual,
  obtenerStockRepuestos,
  getInsumosBajoStockRepuestos,
} from "../services/repuestosService.js";

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
  try {
    const { servicioId, items } = req.body;
    const movimientos = await registrarEgresoRepuestos(servicioId, items);
    res.status(201).json({ message: "Egreso registrado correctamente", movimientos });
  } catch (err) {
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