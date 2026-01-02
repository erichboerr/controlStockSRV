import express from "express";
import {
    registrarIngreso ,
} from "../controllers/ingresosController.js";

const router = express.Router();

router.post("/", registrarIngreso);

export default router;