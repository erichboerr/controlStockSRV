import express from "express";
import { verificarStockDisponible, } from "../controllers/stockController.js";

const router = express.Router();

router.get("/:id", verificarStockDisponible);

export default router;