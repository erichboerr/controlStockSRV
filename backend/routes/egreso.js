import { authMiddleware } from "../middlewares/authMiddleware.js";
import { validate } from "../middlewares/validate.js";
import { egresoInsumoSchema } from "../validators/schemas.js";
import express from "express";
import {
    egresarInsumo ,
} from "../controllers/egresoController.js";

const router = express.Router();

router.post("/", authMiddleware, validate(egresoInsumoSchema), egresarInsumo);


export default router;
