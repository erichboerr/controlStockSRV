import express from "express";
import {
  ListarImpresorasFisicas,
  IngresarImpresoraFisica,
  ListarSeriesDisponibles,
  darDeBajaImpresora,
  actualizarSerieImpresora,
} from "../controllers/impresoraFisicaController.js";


const router = express.Router();

router.get("/", ListarImpresorasFisicas);
router.get("/series", ListarSeriesDisponibles);


router.post("/", IngresarImpresoraFisica);

router.put("/baja", darDeBajaImpresora);
router.put("/:id", actualizarSerieImpresora);

export default router;