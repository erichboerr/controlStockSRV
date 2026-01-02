import {
  getAll,
  create,
  obtenerSeriesDisponibles,
  darDeBajaImpresoraService,
} from "../services/impresoraFisicaService.js";
/************************************************** */

export async function ListarImpresorasFisicas(req, res, next) {
  try {
    const impresoras = await getAll();
    res.json(impresoras);
  } catch (err) {
    next(err);
  }
}

export async function IngresarImpresoraFisica(req, res, next) {
  try {
    const { proveedorId, numeroSerie, remito, impresoraId } = req.body;
    const nueva = await create({ proveedorId, numeroSerie, remito, impresoraId });
    res.status(201).json({ id: nueva.id });
  } catch (err) {
    next(err);
  }
}

export async function ListarSeriesDisponibles(req, res, next) {
  try {
    const { marcaId, modeloId } = req.query;
    const series = await obtenerSeriesDisponibles({ marcaId, modeloId });
    res.json({ series });
  } catch (err) {
    next(err);
  }
}

export async function darDeBajaImpresora(req, res, next) {
  try {
    const { impresoraFisicaId } = req.body;
    const baja = await darDeBajaImpresoraService(impresoraFisicaId);
    res.status(200).json({ id: baja.id, fechaBaja: baja.fechaBaja });
  } catch (err) {
    next(err);
  }
}