import express from "express";
import {
    egresarInsumo ,
} from "../controllers/egresosController.js";

const router = express.Router();

router.post("/", egresarInsumo);


export default router;