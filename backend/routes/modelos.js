import { authMiddleware } from "../middlewares/authMiddleware.js";
import express from "express";
import {
  listarModelos,
  listarModelMarca,
  crearModelo,
  editarModelo,
  eliminarModelo,
} from "../controllers/modelosController.js";

const router = express.Router();

router.get( "/",authMiddleware, listarModelos);
router.get( "/porMarca",authMiddleware, listarModelMarca);

router.post( "/",authMiddleware, crearModelo);

router.put( "/:id",authMiddleware, editarModelo);

router.delete( "/:id",authMiddleware, eliminarModelo);

export default router;
