import { getAll, create, update, remove } from "../services/usuarioService.js";

export async function listarUsuarios(req, res, next) {
  try {
    const usuarios = await getAll();
    res.json(usuarios);
  } catch (err) {
    next(err); // ✅ delegás al middleware
  }
}

export async function crearUsuario(req, res, next) {
  try {
    const { user, rolId, password } = req.body;
    const nuevo = await create({ user, rolId, password });
    res.status(201).json(nuevo);
  } catch (err) {
    next(err);
  }
}


export async function editarUsuario(req, res, next) {
  try {
    const actualizado = await update(req.params.id, req.body);
    res.json(actualizado);
  } catch (err) {
    next(err);
  }
}

export async function eliminarUsuario(req, res, next) {
  try {
    const resultado = await remove(req.params.id);
    res.json(resultado);
  } catch (err) {
    next(err);
  }
}