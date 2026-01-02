import models from "../models/index.js";
import { hashPassword } from "../helpers/hashPassword.js";

const { Rol, Usuario, Proveedor, Servicio } = models;

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
      {
        user: "Administrativo",
        password: "Administrativo",
        rol: "ADMINISTRATIVO",
      },
      { user: "Tecnico", password: "Tecnico", rol: "TECNICO" },
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

    // 🏢 Proveedores
// Primer proveedor: Ajuste
const proveedorAjuste = {
  proveedor: "AJUSTE",
  email: "ajuste@system.local",
  telefono: "00000000",
};

await Proveedor.findOrCreate({
  where: { email: proveedorAjuste.email },
  defaults: {
    ...proveedorAjuste,
    flagHabilitado: false,
    createdAt: ahora,
    updatedAt: ahora,
  },
});

// Segundo proveedor: PRINT AR S.R.L.
const proveedor = {
  proveedor: "PRINT AR S.R.L.",
  email: "info@printar.com.ar",
  telefono: "47340734",
};

await Proveedor.findOrCreate({
  where: { email: proveedor.email },
  defaults: {
    ...proveedor,
    flagHabilitado: true,
    createdAt: ahora,
    updatedAt: ahora,
  },
});

console.log("✅ Proveedores cargados");


    // 🛠️ Servicios    
    const servicioAjuste = { servicio: "AJUSTE" };
    await Servicio.findOrCreate({
      where: { servicio: servicioAjuste.servicio },
      defaults: {
        flagHabilitado: false,
        createdAt: ahora,
        updatedAt: ahora,
      },
    });
    const servicio = { servicio: "SOPORTE TECNICO" };
    await Servicio.findOrCreate({
      where: { servicio: servicio.servicio },
      defaults: {
        flagHabilitado: true,
        createdAt: ahora,
        updatedAt: ahora,
      },
    });
    console.log("✅ Servicios cargados");
  } catch (error) {
    console.error("❌ Error al cargar seeds:", error.message);
  }
};

