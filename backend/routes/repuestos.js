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
} from "../controllers/repuestosController.js";

const router = express.Router();


router.get("/stock-bajo-repuestos", obtenerInsumosBajoStockRepuestos);

// 📌 Listar todos los repuestos habilitados
router.get("/", ListarRepuestos);

// 📌 Listar stock
router.get("/StockRepuestos", ReporteStockRepuestos);

// 📌 Obtener stock actual de un repuesto por ID
router.get("/:id", StockActual);


// 📌 Crear un nuevo repuesto
router.post("/nuevo", AgregarRepuesto);

// 📌 Registrar ingreso de repuestos desde proveedor
router.post("/ingreso", IngresoRepuesto);

// 📌 Registrar egreso de repuestos hacia servicio
router.post("/egreso", EgresoRepuesto);

export default router;