import { authMiddleware } from "../middlewares/authMiddleware.js";
import express from "express";
import {
  listarImpresoras,
  buscarImpresoraPorMarcaYModelo,
  crearImpresora,
  editarImpresora,
  eliminarImpresora,
} from "../controllers/impresoraController.js";

const router = express.Router();

//router.get( "/",authMiddleware, listarImpresoras);
router.get( "/", authMiddleware, buscarImpresoraPorMarcaYModelo);

router.post( "/", authMiddleware, crearImpresora);
router.put("/:id",authMiddleware, editarImpresora);
router.delete( "/:id",authMiddleware, eliminarImpresora);

export default router;