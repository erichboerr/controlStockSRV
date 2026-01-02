import express from "express";
import {
  listarMarcas,
  crearMarca,
  editarMarca,
  eliminarMarca,
} from "../controllers/marcasController.js";

const router = express.Router();

router.get("/", listarMarcas);
router.post("/", crearMarca);
router.put("/:id", editarMarca);
router.delete("/:id", eliminarMarca);

export default router;
