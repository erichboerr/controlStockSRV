import { authMiddleware } from "../middlewares/authMiddleware.js";
import express from "express";
import {
  listarMarcas,
  crearMarca,
  editarMarca,
  eliminarMarca,
} from "../controllers/marcasController.js";

const router = express.Router();

router.get( "/", authMiddleware,listarMarcas);
router.post( "/", authMiddleware,crearMarca);
router.put( "/:id",authMiddleware, editarMarca);
router.delete( "/:id",authMiddleware, eliminarMarca);

export default router;
