import {
  getAll,
  create,
  obtenerSeriesDisponibles,
  darDeBajaImpresoraService,
  updateSerie,
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
    const nueva = await create({
      proveedorId,
      numeroSerie,
      remito,
      impresoraId,
    });
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

export const actualizarSerieImpresora = async (req, res, next) => {
  const { id } = req.params; 
  // Asegúrate de que el nombre coincida con lo que envías en el body del hook
  const { nuevoNumeroSerie } = req.body; 

  if (!nuevoNumeroSerie) {
    return res.status(400).json({ error: "El nuevo número de serie es requerido" });
  }

  try {
    const impresora = await updateSerie(id, nuevoNumeroSerie);

    res.status(200).json({
      message: "✅ Serie actualizada correctamente",
      impresora,
    });
  } catch (error) {
    // Si Sequelize lanza error de unicidad (serie duplicada)
    if (error.name === 'SequelizeUniqueConstraintError') {
       return res.status(409).json({ error: "Ese número de serie ya está registrado en el sistema" });
    }
    
    if (error.isCustom) {
      return res.status(error.httpStatus).json({ error: error.message });
    }
    next(error);
  }
};

