import { authMiddleware } from "../middlewares/authMiddleware.js";
import express from "express";
import {
  listarServicios,
  listarServiciosPorModelo,
  listarImpresorasPorServicio,
  crearServicio,
  editarServicio,
  eliminarServicio,
} from "../controllers/servicioController.js";

const router = express.Router();

router.get( "/",authMiddleware, listarServicios);
router.get( "/por-modelo/:modeloId",authMiddleware, listarServiciosPorModelo);
router.get( "/:servicioId/impresoras",authMiddleware, listarImpresorasPorServicio);
router.post( "/",authMiddleware, crearServicio);
router.put( "/:id",authMiddleware, editarServicio);
router.delete( "/:id",authMiddleware, eliminarServicio);

export default router;
