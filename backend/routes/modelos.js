import express from "express";
import {
  listarModelos,
  listarModelMarca,
  crearModelo,
  editarModelo,
  eliminarModelo,
} from "../controllers/modelosController.js";

const router = express.Router();

router.get("/", listarModelos);
router.get("/porMarca", listarModelMarca);

router.post("/", crearModelo);

router.put("/:id", editarModelo);

router.delete("/:id", eliminarModelo);

export default router;
