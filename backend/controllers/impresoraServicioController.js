import {
  entregarImpresoraService,
  retirarImpresoraService,
  listarImpresorasActivasService,
  getImpresorasPorServicioService,
} from "../services/impresoraServicioService.js";

// Entregar impresora a un servicio
export async function entregarImpresoraServicio(req, res, next) {
  try {
    const { numeroSerie, servicioId } = req.body;
    const nuevaEntrega = await entregarImpresoraService({
      numeroSerie,
      servicioId,
    });
    res.status(201).json({ id: nuevaEntrega.id });
  } catch (err) {
    next(err);
  }
}

// Retirar impresora de un servicio
export async function retirarImpresoraServicio(req, res, next) {
  try {
    const { impresoraFisicaId, servicioId } = req.body;
    const retiro = await retirarImpresoraService({
      impresoraFisicaId,
      servicioId,
    });
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

export const getImpresorasPorServicio = async (req, res, next) => {
  const { servicioId } = req.params;

  // Validación básica
  if (!servicioId) {
    return res.status(400).json({ message: "El ID del servicio es requerido" });
  }

  try {
    // ✅ CORRECCIÓN AQUÍ: Llamamos a la función directamente
    const data = await getImpresorasPorServicioService(servicioId);

    if (!data || data.length === 0) {
      return res.status(404).json({
        message: "No se encontraron impresoras activas para este servicio",
      });
    }

    res.status(200).json(data);
  } catch (error) {
    // Pasamos el error al middleware de manejo de errores global
    next(error);
  }
};
