import { authMiddleware } from "../middlewares/authMiddleware.js";
// routes/repuestosRoutes.js
import express from "express";
import {
  ListarRepuestos,
  AgregarRepuesto,
  IngresoRepuesto,
  EgresoRepuesto,
  StockActual,
  ReporteStockRepuestos,
  obtenerInsumosBajoStockRepuestos
} from "../controllers/repuestoController.js";

const router = express.Router();


router.get( "/stock-bajo-repuestos",authMiddleware, obtenerInsumosBajoStockRepuestos);

// 📌 Listar todos los repuestos habilitados
router.get( "/",authMiddleware, ListarRepuestos);

// 📌 Listar stock
router.get( "/StockRepuestos",authMiddleware, ReporteStockRepuestos);

// 📌 Obtener stock actual de un repuesto por ID
router.get( "/:id",authMiddleware, StockActual);


// 📌 Crear un nuevo repuesto
router.post( "/nuevo",authMiddleware, AgregarRepuesto);

// 📌 Registrar ingreso de repuestos desde proveedor
router.post( "/ingreso",authMiddleware, IngresoRepuesto);

// 📌 Registrar egreso de repuestos hacia servicio
router.post( "/egreso",authMiddleware, EgresoRepuesto);

export default router;