import { authMiddleware } from "../middlewares/authMiddleware.js";
import { verificarRoot } from "../middlewares/verificarRoot.js";
import { validate } from "../middlewares/validate.js";
import { crearUsuarioSchema, reactivarUsuarioSchema } from "../validators/schemas.js";
import express from "express";
import {
  listarUsuarios,
  crearUsuario,
  editarUsuario,
  eliminarUsuario,
  reactivarUsuario,
} from "../controllers/usuarioController.js";

const router = express.Router();

// La gestión de usuarios (alta, edición, baja y listado) es exclusiva
// del rol ROOT. En el frontend estas pantallas ya están restringidas con
// RoleGuard, pero eso no alcanza: cualquier usuario autenticado podía
// llamar a estos endpoints directamente y auto-asignarse rolId=1 (ROOT),
// crear usuarios, o dar de baja a otros. Por eso se agrega verificarRoot
// también acá, que es donde realmente se hace cumplir el control de acceso.
router.get("/", authMiddleware, verificarRoot, listarUsuarios);
router.post("/crearUsuario", authMiddleware, verificarRoot, validate(crearUsuarioSchema), crearUsuario);
router.put("/:id", authMiddleware, verificarRoot, editarUsuario);
router.patch("/:id/reactivar", authMiddleware, verificarRoot, validate(reactivarUsuarioSchema), reactivarUsuario);
router.delete("/:id", authMiddleware, verificarRoot, eliminarUsuario);

export default router;
