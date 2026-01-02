import {
  obtenerStock,
  RepoMovInsumosServicioService,
  RepoMovimientosInsumosService,
  RepoIngresosPorInsumoService,
  RepoIngresosPorProveedorService,
} from "../services/reportesService.js";

// Reporte de stock
export async function reporteStock(req, res, next) {
  try {
    const data = await obtenerStock();
    res.json(data);
  } catch (err) {
    next(err);
  }
}

// Movimientos de insumos por servicio
export async function getMovimientosInsumosServicios(req, res, next) {
  try {
    const { desde, hasta, servicio } = req.query;
    const movimientos = await RepoMovInsumosServicioService({ desde, hasta, servicio });
    res.json(movimientos);
  } catch (err) {
    next(err);
  }
}

// Movimientos de insumos
export async function getMovimientosInsumos(req, res, next) {
  try {
    const { desde, hasta, insumo } = req.query;
    const ingresos = await RepoMovimientosInsumosService({ desde, hasta, insumo });
    res.json(ingresos);
  } catch (err) {
    next(err);
  }
}

// Ingresos por insumo
export async function getIngresosPorInsumo(req, res, next) {
  try {
    const { desde, hasta, insumo } = req.query;
    const ingresos = await RepoIngresosPorInsumoService({ desde, hasta, insumo });
    res.json(ingresos);
  } catch (err) {
    next(err);
  }
}

// Ingresos por proveedor
export async function getIngresosPorProveedor(req, res, next) {
  try {
    const { desde, hasta, proveedor } = req.query;
    const ingresos = await RepoIngresosPorProveedorService({ desde, hasta, proveedor });
    res.json(ingresos);
  } catch (err) {
    next(err);
  }
}
