import { authMiddleware } from "../middlewares/authMiddleware.js";
import express from "express";
import {
  listarInsumos,
  listarInsumosPorModelo,
  asociarInsumosAModelo,
  desasociarInsumoDeModelo,
  editarInsumo,
  eliminarInsumo,
  obtenerInsumosBajoStock,
  actualizarStockMinimo,
} from "../controllers/insumosController.js";

const router = express.Router();

//GET
router.get( "/",authMiddleware,  listarInsumos);
router.get( "/modelo",authMiddleware,  listarInsumosPorModelo);
router.get( "/stock-bajo",authMiddleware,  obtenerInsumosBajoStock);

router.post( "/modelo/:id/insumos",authMiddleware,  asociarInsumosAModelo);

router.put( "/:id/stock-minimo",authMiddleware,  actualizarStockMinimo);
router.put( "/:id",authMiddleware,  editarInsumo);

// ✅ Nueva ruta N‑N
router.delete( "/modelo/:modeloId/:insumoId",authMiddleware,  desasociarInsumoDeModelo);
router.delete( "/:id", authMiddleware, eliminarInsumo);

export default router;