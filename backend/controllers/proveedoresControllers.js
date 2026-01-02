import { getAll, create, update, remove } from "../services/proveedoresServices.js";

// Listar proveedores
export async function listarProveedores(req, res, next) {
  try {
    const proveedores = await getAll();
    res.json(proveedores);
  } catch (err) {
    next(err);
  }
}

// Crear proveedor
export async function crearProveedor(req, res, next) {
  try {
    const { proveedor, email, telefono } = req.body;
    const nuevo = await create({ proveedor, email, telefono });
    res.status(201).json(nuevo);
  } catch (err) {
    next(err);
  }
}

// Editar proveedor
export async function editarProveedor(req, res, next) {
  try {
    const actualizado = await update(req.params.id, req.body);
    res.json(actualizado);
  } catch (err) {
    next(err);
  }
}

// Eliminar proveedor
export async function eliminarProveedor(req, res, next) {
  try {
    const resultado = await remove(req.params.id);
    res.json(resultado);
  } catch (err) {
    next(err);
  }
}