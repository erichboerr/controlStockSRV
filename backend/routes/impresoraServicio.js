import express from "express";
import { entregarImpresoraServicio, retirarImpresoraServicio, listarImpresorasActivasPorServicio, getImpresorasPorServicio  } from "../controllers/impresoraServicioController.js";

const router = express.Router();

//Post entregar impresora a servicio
router.post("/", entregarImpresoraServicio);

//GET
router.get("/activas/:servicioId", (req, res, next) => {
  next();
}, listarImpresorasActivasPorServicio);
router.get("/servicio/:servicioId", getImpresorasPorServicio);


//PUT
router.put("/retirar", retirarImpresoraServicio);


export default router;
