import Rol from "../models/Rol.js";

export async function getAllRolesForUser(usuario) {
  if (!usuario) {
    const error = new Error("Usuario no proporcionado");
    error.isCustom = true;
    error.httpStatus = 400;
    error.code = "MISSING_USER";
    throw error;
  }

  const rolUsuario = await Rol.findByPk(usuario.rolId);
  if (!rolUsuario) {
    const error = new Error("Rol del usuario no encontrado");
    error.isCustom = true;
    error.httpStatus = 404;
    error.code = "ROLE_NOT_FOUND";
    throw error;
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