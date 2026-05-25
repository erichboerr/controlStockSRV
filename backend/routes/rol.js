import express from "express";
import { listarRoles } from "../controllers/rolController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();
router.get("/", authMiddleware, listarRoles);

export default router;
