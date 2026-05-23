import { getAllRolesForUser } from "../services/rolesService.js";

// Listar roles del usuario
export async function listarRoles(req, res, next) {
  try {
    const usuario = req.user;
    const roles = await getAllRolesForUser(usuario);
    res.json(roles);
  } catch (err) {
    next(err);
  }
}