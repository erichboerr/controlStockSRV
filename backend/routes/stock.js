import { authMiddleware } from "../middlewares/authMiddleware.js";
import express from "express";
import { verificarStockDisponible, } from "../controllers/stockController.js";

const router = express.Router();

router.get( "/:id",authMiddleware, verificarStockDisponible);

export default router;