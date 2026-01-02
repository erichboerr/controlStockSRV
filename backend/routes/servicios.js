import express from "express";
import {
  listarServicios,
  crearServicio,
  editarServicio,
  eliminarServicio,
} from "../controllers/serviciosControllers.js";

const router = express.Router();

router.get("/", listarServicios);
router.post("/", crearServicio);
router.put("/:id", editarServicio);
router.delete("/:id", eliminarServicio);

export default router;
