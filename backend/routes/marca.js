import { authMiddleware } from "../middlewares/authMiddleware.js";
import express from "express";
import {
  listarMarcas,
  crearMarca,
  editarMarca,
} from "../controllers/marcaController.js";

const router = express.Router();

router.get( "/", authMiddleware,listarMarcas);
router.post( "/", authMiddleware,crearMarca);
router.put( "/:id",authMiddleware, editarMarca);

export default router;
