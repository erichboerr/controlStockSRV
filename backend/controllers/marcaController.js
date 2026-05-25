import { getAll, create, update, remove } from "../services/marcaService.js";

// Listar marcas
export async function listarMarcas(req, res, next) {
  try {
    const marcas = await getAll();
    res.json(marcas);
  } catch (err) {
    next(err);
  }
}

// Crear marca
export async function crearMarca(req, res, next) {
  try {
    const { marca } = req.body;
    const nuevo = await create(marca?.trim().toUpperCase());
    res.status(201).json(nuevo);
  } catch (err) {
    next(err);
  }
}

// Editar marca
export async function editarMarca(req, res, next) {
  try {
    const actualizado = await update(req.params.id, req.body);
    res.json(actualizado);
  } catch (err) {
    next(err);
  }
}

// Eliminar marca
export async function eliminarMarca(req, res, next) {
  try {
    const resultado = await remove(req.params.id);
    res.json(resultado);
  } catch (err) {
    next(err);
  }
}