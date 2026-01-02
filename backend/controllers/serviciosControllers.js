import { getAll, create, update, remove } from "../services/serviciosServices.js";

// Listar servicios
export async function listarServicios(req, res, next) {
  try {
    const servicios = await getAll();
    res.json(servicios);
  } catch (err) {
    next(err);
  }
}

// Crear servicio
export async function crearServicio(req, res, next) {
  try {
    const { servicio, ubicacion } = req.body;
    const nuevo = await create({ servicio, ubicacion });
    res.status(201).json(nuevo);
  } catch (err) {
    next(err);
  }
}

// Editar servicio
export async function editarServicio(req, res, next) {
  try {
    const actualizado = await update(req.params.id, req.body);
    res.json(actualizado);
  } catch (err) {
    next(err);
  }
}

// Eliminar servicio
export async function eliminarServicio(req, res, next) {
  try {
    const resultado = await remove(req.params.id);
    res.json(resultado);
  } catch (err) {
    next(err);
  }
}