import { authMiddleware } from "../middlewares/authMiddleware.js";
import express from "express";
import {
  ListarImpresorasFisicas,
  IngresarImpresoraFisica,
  ListarSeriesDisponibles,
  darDeBajaImpresora,
  actualizarSerieImpresora,
} from "../controllers/impresoraFisicaController.js";


const router = express.Router();

router.get( "/",authMiddleware, ListarImpresorasFisicas);
router.get( "/series",authMiddleware, ListarSeriesDisponibles);


router.post( "/", authMiddleware,IngresarImpresoraFisica);

router.put( "/baja",authMiddleware, darDeBajaImpresora);
router.put( "/:id", authMiddleware,actualizarSerieImpresora);

export default router;