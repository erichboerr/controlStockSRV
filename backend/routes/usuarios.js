import { authMiddleware } from "../middlewares/authMiddleware.js";
import express from "express";
import {
  listarUsuarios,
  crearUsuario,
  editarUsuario,
  eliminarUsuario,
} from "../controllers/usuariosControllers.js";

const router = express.Router();

router.get( "/",authMiddleware, listarUsuarios);
router.post( "/crearUsuario",authMiddleware, crearUsuario);
router.put( "/:id",authMiddleware, editarUsuario);
router.delete( "/:id",authMiddleware, eliminarUsuario);

export default router;
