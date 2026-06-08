import { createError } from "../utils/createError.js";
import Rol from "../models/Rol.js";

export async function getAllRolesForUser(usuario) {
  if (!usuario) {
    throw createError("Usuario no proporcionado", 400, "MISSING_USER");
  }

  const rolUsuario = await Rol.findByPk(usuario.rolId);
  if (!rolUsuario) {
    throw createError("Rol del usuario no encontrado", 404, "ROLE_NOT_FOUND");
  }

  if (rolUsuario.rol === "ROOT" || rolUsuario.systemRole) {
    return await Rol.findAll({
      where: { flagHabilitado: true },
      order: [["id", "ASC"]],
    });
  }

  return await Rol.findAll({
    where: { flagHabilitado: true, systemRole: false },
    order: [["id", "ASC"]],
  });
}