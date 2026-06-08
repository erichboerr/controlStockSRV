import {
  getAll,
  getByModelo,
  createOrAssociate,
  remove,
  update,
  removeAssociation,
  getInsumosBajoStock,
  updateStockMinimo,
} from "../services/insumoService.js";

// Listar insumos
export async function listarInsumos(req, res, next) {
  try {
    const insumos = await getAll();
    res.json(insumos);
  } catch (err) {
    next(err);
  }
}

// Listar insumos por modelo
export async function listarInsumosPorModelo(req, res, next) {
  try {
    const { modeloId } = req.query;
    const insumos = await getByModelo(modeloId);
    res.json(insumos);
  } catch (err) {
    next(err);
  }
}

// Asociar insumos a modelo
export async function asociarInsumosAModelo(req, res, next) {
  try {
    const modeloId = parseInt(req.params.id);
    const { insumos, stock_minimo } = req.body;
    const resultado = await createOrAssociate(modeloId, insumos, stock_minimo);
    res.json(resultado);
  } catch (err) {
    next(err);
  }
}

// Desasociar insumo de modelo
export async function desasociarInsumoDeModelo(req, res, next) {
  try {
    const { modeloId, insumoId } = req.params;
    const resultado = await removeAssociation(modeloId, insumoId);
    res.json(resultado);
  } catch (err) {
    next(err);
  }
}

// Editar insumo
export async function editarInsumo(req, res, next) {
  try {
    const { insumo } = req.body;
    const actualizado = await update(req.params.id, { insumo });
    res.json(actualizado);
  } catch (err) {
    next(err);
  }
}


// Actualizar stock mínimo
export async function actualizarStockMinimo(req, res, next) {
  try {
    const id = parseInt(req.params.id);
    const { stock_minimo } = req.body;

    if (isNaN(stock_minimo) || stock_minimo < 0) {
      const error = new Error("Stock mínimo inválido");
      error.isCustom = true;
      error.httpStatus = 400;
      error.code = "INVALID_STOCK_MINIMO";
      throw error;
    }

    const actualizado = await updateStockMinimo(id, stock_minimo);
    res.json(actualizado);
  } catch (err) {
    next(err);
  }
}

// Eliminar insumo
export async function eliminarInsumo(req, res, next) {
  try {
    const resultado = await remove(req.params.id);
    res.json(resultado);
  } catch (err) {
    next(err);
  }
}

// Obtener insumos bajo stock
export async function obtenerInsumosBajoStock(req, res, next) {
  try {
    const data = await getInsumosBajoStock();
    res.json(data);
  } catch (err) {
    next(err);
  }
}
