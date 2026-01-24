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
router.get("/", listarInsumos);
router.get("/modelo", listarInsumosPorModelo);
router.get("/stock-bajo", obtenerInsumosBajoStock);

router.post("/modelo/:id/insumos", asociarInsumosAModelo);

router.put("/:id/stock-minimo", actualizarStockMinimo);
router.put("/:id", editarInsumo);

// ✅ Nueva ruta N‑N
router.delete("/modelo/:modeloId/:insumoId", desasociarInsumoDeModelo);
router.delete("/:id", eliminarInsumo);

export default router;