import { getAll, getAllMarca, create, update, remove } from "../services/modeloService.js";

// Listar todos los modelos
export async function listarModelos(req, res, next) {
  try {
    const modelos = await getAll();
    res.json(modelos);
  } catch (err) {
    next(err);
  }
}

// Listar modelos por marca
export async function listarModelMarca(req, res, next) {
  try {
    const { idMarca } = req.query;
    if (!idMarca) {
      const error = new Error("idMarca es obligatorio");
      error.isCustom = true;
      error.httpStatus = 400;
      error.code = "MISSING_IDMARCA";
      throw error;
    }
    const modelos = await getAllMarca({ idMarca });
    res.json(modelos);
  } catch (err) {
    next(err);
  }
}

// Crear modelo
export async function crearModelo(req, res, next) {
  try {
    const { modelo, marcaId } = req.body;
    const marcaIdNum = parseInt(marcaId, 10);
    const nuevo = await create(modelo.trim().toUpperCase(), marcaIdNum);
    res.status(201).json(nuevo);
  } catch (err) {
    next(err);
  }
}

// Editar modelo
export async function editarModelo(req, res, next) {
  try {
    const actualizado = await update(req.params.id, req.body);
    res.json(actualizado);
  } catch (err) {
    next(err);
  }
}

// Eliminar modelo
export async function eliminarModelo(req, res, next) {
  try {
    const resultado = await remove(req.params.id);
    res.json(resultado);
  } catch (err) {
    next(err);
  }
}