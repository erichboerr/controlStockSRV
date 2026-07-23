import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { verificarRootOAdmin } from "../middlewares/verificarRootOAdmin.js";
import { ListarBackups, RestaurarBackup, CrearBackup } from "../controllers/backupController.js";

const router = express.Router();

router.get("/listar", authMiddleware, verificarRootOAdmin, ListarBackups);
router.post("/crear", authMiddleware, verificarRootOAdmin, CrearBackup);
router.post("/restaurar", authMiddleware, verificarRootOAdmin, RestaurarBackup);

export default router;
