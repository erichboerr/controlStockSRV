import express from "express";
import {
  reporteStock,
  getMovimientosInsumosServicios,
  getMovimientosInsumos,
  getIngresosPorInsumo,
  getIngresosPorProveedor,
} from "../controllers/reportesController.js";

const router = express.Router();

router.get("/stock", reporteStock);
router.get("/movimientosInsumosServicios", getMovimientosInsumosServicios);
router.get("/movimientosInsumos", getMovimientosInsumos);
router.get("/ingresosPorInsumo", getIngresosPorInsumo);
router.get("/ingresosPorProveedor", getIngresosPorProveedor);


export default router;
