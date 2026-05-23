import { authMiddleware } from "../middlewares/authMiddleware.js";
import express from "express";
import {
  reporteStock,
  getMovimientosInsumosServicios,
  getMovimientosInsumos,
  getIngresosPorInsumo,
  getIngresosPorProveedor,
} from "../controllers/reportesController.js";

const router = express.Router();

router.get( "/stock",authMiddleware, reporteStock);
router.get( "/movimientosInsumosServicios",authMiddleware, getMovimientosInsumosServicios);
router.get( "/movimientosInsumos",authMiddleware, getMovimientosInsumos);
router.get( "/ingresosPorInsumo",authMiddleware, getIngresosPorInsumo);
router.get( "/ingresosPorProveedor",authMiddleware, getIngresosPorProveedor);


export default router;
