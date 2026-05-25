import { authMiddleware } from "../middlewares/authMiddleware.js";
import express from "express";
import {
    registrarIngreso ,
} from "../controllers/ingresoController.js";

const router = express.Router();

router.post( "/",authMiddleware, registrarIngreso);

export default router;