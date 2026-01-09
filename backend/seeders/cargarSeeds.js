import models from "../models/index.js";
import { hashPassword } from "../helpers/hashPassword.js";

const { Rol, Usuario } = models;

export const cargarSeeds = async () => {
  try {
    const ahora = new Date();

    // 🧱 Roles
    const roles = [
      { rol: "ROOT", systemRole: true },
      { rol: "ADMINISTRADOR", systemRole: false },
      { rol: "ADMINISTRATIVO", systemRole: false },
      { rol: "TECNICO", systemRole: false },
    ];

    for (const r of roles) {
      await Rol.findOrCreate({
        where: { rol: r.rol },
        defaults: {
          flagHabilitado: true,
          systemRole: r.systemRole || false,
          createdAt: ahora,
          updatedAt: ahora,
        },
      });
    }
    console.log("✅ Roles cargados");

    // 🧑‍💻 Usuarios
    const usuarios = [
      { user: "Root", password: "Root123", rol: "ROOT" },
      {
        user: "Administrador",
        password: "Administrador",
        rol: "ADMINISTRADOR",
      },
    ];

    for (const u of usuarios) {
      const rol = await Rol.findOne({ where: { rol: u.rol } });
      if (!rol) throw new Error(`Rol no encontrado: ${u.rol}`);

      const [usuario, creado] = await Usuario.findOrCreate({
        where: { user: u.user },
        defaults: {
          password: await hashPassword(u.password),
          rolId: rol.id,
          flagHabilitado: true,
          createdAt: ahora,
          updatedAt: ahora,
        },
      });
    }
    console.log("✅ Usuarios cargados");
   
  } catch (error) {
    console.error("❌ Error al cargar seeds:", error.message);
  }
};

