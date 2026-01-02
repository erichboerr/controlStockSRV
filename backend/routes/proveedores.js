import express from "express";
import {
  listarProveedores,
  crearProveedor,
  editarProveedor,
  eliminarProveedor,
} from "../controllers/proveedoresControllers.js";

const router = express.Router();

router.get("/", listarProveedores);
router.post("/", crearProveedor);
router.put("/:id", editarProveedor);
router.delete("/:id", eliminarProveedor);

export default router;
