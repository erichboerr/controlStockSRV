import express from "express";
import {
  listarServicios,
  listarServiciosPorModelo,
  listarImpresorasPorServicio,
  crearServicio,
  editarServicio,
  eliminarServicio,
} from "../controllers/serviciosControllers.js";

const router = express.Router();

router.get("/", listarServicios);
router.get("/por-modelo/:modeloId", listarServiciosPorModelo);
router.get("/:servicioId/impresoras", listarImpresorasPorServicio);
router.post("/", crearServicio);
router.put("/:id", editarServicio);
router.delete("/:id", eliminarServicio);

export default router;
