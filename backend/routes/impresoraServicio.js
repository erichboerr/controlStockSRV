import express from "express";
import { entregarImpresoraServicio, retirarImpresoraServicio, listarImpresorasActivasPorServicio  } from "../controllers/impresoraServicioController.js";

const router = express.Router();

//Post entregar impresora a servicio
router.post("/", entregarImpresoraServicio);

//GET
router.get("/activas/:servicioId", (req, res, next) => {
  //console.log("Entró a /activas con servicioId:", req.params.servicioId);
  next();
}, listarImpresorasActivasPorServicio);


//PUT
router.put("/retirar", retirarImpresoraServicio);





export default router;
