import { authMiddleware } from "../middlewares/authMiddleware.js";
import { validate } from "../middlewares/validate.js";
import { ingresoInsumoSchema } from "../validators/schemas.js";
import express from "express";
import {
    registrarIngreso ,
} from "../controllers/ingresoController.js";

const router = express.Router();

router.post( "/",authMiddleware, validate(ingresoInsumoSchema), registrarIngreso);

export default router;
