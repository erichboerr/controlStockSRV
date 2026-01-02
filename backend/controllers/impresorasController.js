import {
  getAll,
  obtenerImpresoraPorMarcaYModelo,
  create,
  update,
  remove,
} from "../services/impresorasService.js";

export async function listarImpresoras(req, res, next) {
  try {
    const impresoras = await getAll();
    res.json(impresoras);
  } catch (err) {
    next(err);
  }
}

export async function buscarImpresoraPorMarcaYModelo(req, res, next) {
  try {
    const { marcaId, modeloId } = req.query;

    if (!marcaId || !modeloId) {
      const error = new Error("Faltan parámetros marcaId o modeloId");
      error.isCustom = true;
      error.httpStatus = 400;
      error.code = "MISSING_PARAMS";
      throw error;
    }

    const impresora = await obtenerImpresoraPorMarcaYModelo(marcaId, modeloId);

    if (impresora) {
      res.json([impresora]); // frontend espera array
    } else {
      res.json([]); // no encontrada
    }
  } catch (err) {
    next(err);
  }
}

export async function crearImpresora(req, res, next) {
  try {
    const { marcaId, modeloId } = req.body;
    const nuevo = await create({ marcaId, modeloId });
    res.status(201).json(nuevo);
  } catch (err) {
    next(err);
  }
}

export async function editarImpresora(req, res, next) {
  try {
    const actualizado = await update(req.params.id, req.body);
    res.json(actualizado);
  } catch (err) {
    next(err);
  }
}

export async function eliminarImpresora(req, res, next) {
  try {
    const resultado = await remove(req.params.id);
    res.json(resultado);
  } catch (err) {
    next(err);
  }
}