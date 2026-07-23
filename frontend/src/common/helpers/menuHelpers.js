// Categorías visibles por rol
export function getMenuByRol(rolId) {
  const baseMenu = {
    1: [
      "Usuarios",
      "Servicios",
      "Proveedores",
      "Impresoras",
      "Marcas",
      "Modelos",
      "Insumos",
      "Ingresos",
      "Egresos",
      "Reportes",
      "Sistema",
    ], // Root
    2: [
      "Proveedores",
      "Servicios",
      "Impresoras",
      "Ingresos",
      "Egresos",
      "Reportes",
      "Sistema",
    ], // Admin
    3: [
      "Proveedores",
      "Servicios",
      "Impresoras",
      "Insumos",
      "Ingresos",
      "Egresos",
      "Reportes",
    ], // Administrativo
    4: ["Servicios", "Impresoras", "Insumos"], // Técnico
  };
  return baseMenu[rolId] || [];
}

// Subacciones permitidas por categoría y rol
const permisos = {
  Usuarios: {
    1: ["Agregar", "Editar", "Resetear", "Eliminar"],
    2: ["Agregar", "Editar", "Resetear", "Eliminar"],
    3: [],
    4: [],
  },
  Proveedores: {
    1: ["Agregar", "Editar", "Eliminar"],
    2: ["Agregar", "Editar"],
    3: [],
    4: [],
  },
  Servicios: {
    1: ["Agregar", "Editar", "Eliminar"],
    2: ["Agregar", "Editar"],
    3: ["Agregar", "Editar"],
    4: ["Agregar"],
  },
  Impresoras: {
    1: ["Agregar", "Ingresar", "Entregar", "Retirar", "Baja"],
    2: ["Agregar", "Ingresar", "Entregar", "Retirar", "Baja"],
    3: ["Agregar", "Ingresar", "Entregar", "Retirar", "Baja"],
    4: ["Agregar", "Ingresar", "Entregar", "Retirar", "Baja"],
  },
  Marcas: {
    1: ["Agregar", "Editar"],
    2: [],
    3: [],
    4: [],
  },
  Modelos: {
    1: ["Agregar", "Editar"],
    2: [],
    3: [],
    4: [],
  },
  Insumos: {
    1: ["Agregar", "Editar", "Eliminar", "Ajustar"],
    2: [],
    3: [],
    4: [],
  },
  Ingresos: {
    1: ["Ingresar"],
    2: ["Ingresar"],
    3: ["Ingresar"],
    4: ["Ingresar"],
  },
  Egresos: {
    1: ["Entregar"],
    2: ["Entregar"],
    3: ["Entregar"],
    4: ["Entregar"],
  },
  Reportes: {
    1: ["Stock", "Exportar"],
    2: ["Generar"],
    3: [],
    4: [],
  },
  Sistema: {
    1: ["Restaurar"],
    2: ["Restaurar"],
    3: [],
    4: [],
  },
};

// Íconos por subacción
const iconos = {
  Agregar: "bi-plus-circle text-primary",
  Editar: "bi-pencil-square text-warning",
  Entregar: "bi-box-arrow-in-right text-secondary",
  Ingresar: "bi-box-arrow-in-right text-secondary",
  Retirar: "bi-box-arrow-in-left text-secondary",
  Asignar: "bi-check-circle text-success",
  Desasignar: "bi-x-circle text-danger",
  Eliminar: "bi-trash text-danger",
  Baja: "bi-trash text-danger",
  Nuevo: "bi-file-earmark-plus",
  Historial: "bi-clock-history",
  Configurar: "bi-gear",
  Estado: "bi-hdd-network",
  Generar: "bi-bar-chart",
  Exportar: "bi-box-arrow-up-right",
  Resetear: "bi-key",
  Restaurar: "bi-database-down",
  AgregarImpresora: "bi-printer",
  IngresarImpresora: "bi-printer",
  EntregarImpresora: "bi-printer",
  RetirarImpresora: "bi-printer",
  BajaImpresora: "bi-printer",
};

// Subacciones con íconos
export function getNavbarItemsWithIcons(categoria, rolId) {
  const items = permisos[categoria]?.[rolId] || [];
  return items.map((sub) => ({
    nombre: sub,
    icono: iconos[sub] || "bi-dot",
  }));
}

export function getRutaPorAccion(categoria, accion) {
  const mapa = {
    Usuarios: {
      Agregar: "AltaUsuario",
      Editar: "EditarUsuario",
      Resetear: "ActualizarPassword",
      Eliminar: "BajaUsuario",
    },
    Proveedores: {
      Agregar: "AgregarProveedor",
      Editar: "EditarProveedor",
      Eliminar: "EliminarProveedor",
    },
    Servicios: {
      Agregar: "AgregarServicio",
      Editar: "EditarServicio",
      Eliminar: "EliminarServicio",
      Nuevo: "AgregarServicio",
      Historial: "EditarServicio",
    },
    Impresoras: {
      Agregar: "AgregarImpresora",
      Ingresar: "IngresarImpresora",
      Entregar: "EntregarImpresora",
      Retirar: "RetirarImpresora",
      Baja: "BajaImpresora",
    },
    Marcas: {
      Agregar: "AgregarMarca",
      Editar: "EditarMarca",
      Eliminar: "EliminarMarca",
    },
    Modelos: {
      Agregar: "AgregarModelo",
      Editar: "EditarModelo",
      Eliminar: "EliminarModelo",
    },
    Insumos: {
      Agregar: "AgregarInsumo",
      Editar: "EditarInsumo",
      Eliminar: "EliminarInsumo",
    },
    Ingresos: {
      Ingresar: "IngresoInsumos",
    },
    Egresos: {
      Entregar: "EgresoInusmos",
    },

    Sistema: {
      Restaurar: "RestaurarBackup",
    },

    // Podés seguir agregando categorías
  };

  return `/${mapa[categoria]?.[accion] || ""}`;
}
