import express from "express";
import {
  listarUsuarios,
  crearUsuario,
  editarUsuario,
  eliminarUsuario,
} from "../controllers/usuariosControllers.js";

const router = express.Router();

router.get("/", listarUsuarios);
router.post("/crearUsuario", crearUsuario);
router.put("/:id", editarUsuario);
router.delete("/:id", eliminarUsuario);

export default router;
