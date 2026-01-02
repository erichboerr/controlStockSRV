import {
  entregarImpresoraService,
  retirarImpresoraService,
  listarImpresorasActivasService,
} from "../services/impresoraServicioService.js";

// Entregar impresora a un servicio
export async function entregarImpresoraServicio(req, res, next) {
  try {
    const { numeroSerie, servicioId } = req.body;
    const nuevaEntrega = await entregarImpresoraService({ numeroSerie, servicioId });
    res.status(201).json({ id: nuevaEntrega.id });
  } catch (err) {
    next(err);
  }
}

// Retirar impresora de un servicio
export async function retirarImpresoraServicio(req, res, next) {
  try {
    const { impresoraFisicaId, servicioId } = req.body;
    const retiro = await retirarImpresoraService({ impresoraFisicaId, servicioId });
    res.status(200).json({ id: retiro.id, fechaRetiro: retiro.fechaRetiro });
  } catch (err) {
    next(err);
  }
}

// Listar impresoras activas por servicio
export async function listarImpresorasActivasPorServicio(req, res, next) {
  try {
    const activas = await listarImpresorasActivasService(req.params.servicioId);
    res.json(activas);
  } catch (err) {
    next(err);
  }
}