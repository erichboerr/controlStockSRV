import express from "express";
import {
  listarImpresoras,
  buscarImpresoraPorMarcaYModelo,
  crearImpresora,
  editarImpresora,
  eliminarImpresora,
} from "../controllers/impresorasController.js";

const router = express.Router();

//router.get("/", listarImpresoras);
router.get("/", buscarImpresoraPorMarcaYModelo);

router.post("/", crearImpresora);
router.put("/:id", editarImpresora);
router.delete("/:id", eliminarImpresora);

export default router;