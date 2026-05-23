import { authMiddleware } from "../middlewares/authMiddleware.js";
import express from "express";
import {
    egresarInsumo ,
} from "../controllers/egresosController.js";

const router = express.Router();

router.post("/",authMiddleware, egresarInsumo);


export default router;