import { authMiddleware } from "../middlewares/authMiddleware.js";
import express from "express";
import {
  listarProveedores,
  crearProveedor,
  editarProveedor,
  eliminarProveedor,
  reactivarProveedor,
} from "../controllers/proveedorController.js";

const router = express.Router();

router.get( "/",authMiddleware, listarProveedores);
router.post( "/",authMiddleware, crearProveedor);
router.put( "/:id",authMiddleware, editarProveedor);
router.patch( "/:id/reactivar",authMiddleware, reactivarProveedor);
router.delete( "/:id",authMiddleware, eliminarProveedor);

export default router;
