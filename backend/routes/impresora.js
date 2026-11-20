// ============================================================================
// routes/impresora.js
// Rutas de /impresoras.
//
// Secciones:
//   1. Imports
//   2. Rutas existentes
//   3. Baja lógica (NUEVO): solo Root o Administrador
//
// ⚠️ Las rutas de baja lógica van ANTES de "/:id": si no, Express tomaría
//    "baja-logica" como si fuera un id.
// ============================================================================

// ---------------------------------------------------------------------------
// 1. Imports
// ---------------------------------------------------------------------------
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { verificarRootOAdmin } from "../middlewares/verificarRootOAdmin.js";
import express from "express";
import {
  listarImpresoras,
  buscarImpresoraPorMarcaYModelo,
  crearImpresora,
  editarImpresora,
  eliminarImpresora,
  previaBajaLogica,
  bajaLogicaImpresora,
} from "../controllers/impresoraController.js";

const router = express.Router();

// ---------------------------------------------------------------------------
// 2. Rutas existentes
// ---------------------------------------------------------------------------
//router.get( "/",authMiddleware, listarImpresoras);
router.get( "/", authMiddleware, buscarImpresoraPorMarcaYModelo);

router.post( "/", authMiddleware, crearImpresora);

// ---------------------------------------------------------------------------
// 3. Baja lógica (marca + modelo) — solo Root o Administrador
//    verificarRootOAdmin ya valida el token, no hace falta authMiddleware.
// ---------------------------------------------------------------------------
router.get( "/baja-logica/previa", verificarRootOAdmin, previaBajaLogica);
router.put( "/baja-logica", verificarRootOAdmin, bajaLogicaImpresora);

// Rutas con parámetro (siempre al final)
router.put("/:id",authMiddleware, editarImpresora);
router.delete( "/:id", authMiddleware, eliminarImpresora);

export default router;