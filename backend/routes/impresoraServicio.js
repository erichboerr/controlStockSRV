import { authMiddleware } from "../middlewares/authMiddleware.js";
import express from "express";
import { entregarImpresoraServicio, 
    retirarImpresoraServicio, 
    listarImpresorasActivasPorServicio, 
    getImpresorasPorServicio  } from "../controllers/impresoraServicioController.js";

const router = express.Router();

//Post entregar impresora a servicio
router.post( "/", authMiddleware, entregarImpresoraServicio);

//GET
router.get("/activas/:servicioId", authMiddleware, listarImpresorasActivasPorServicio);
router.get("/servicio/:servicioId", authMiddleware, getImpresorasPorServicio);


//PUT
router.put( "/retirar", authMiddleware, retirarImpresoraServicio);


export default router;
