import { ROLES } from "./roles.js";

/**
 * Fuente única de verdad para el menú lateral (Sidebar).
 *
 * Cómo agregar una opción nueva:
 *   1. Buscar el grupo (section) donde corresponde, o crear uno nuevo.
 *   2. Agregar un item: { label, route }.
 *   3. Si el item es solo para ciertos roles, agregar roles: [ROLES.ROOT, ...].
 *
 * Reglas de visibilidad:
 *   - roles ausente en un GRUPO  -> el grupo lo ven todos los roles autenticados.
 *   - roles ausente en un ITEM   -> el item hereda la visibilidad de su grupo.
 *   - roles presente (grupo o item) -> solo lo ven los roles listados.
 *
 * "section" agrupa visualmente los bloques bajo un mismo título (el <h3> del Sidebar).
 * Dejar section: null para el bloque principal (sin título arriba).
 */
export const MENU_CONFIG = [
  // ───────────────────────── Bloque principal ─────────────────────────
  {
    key: "usuarios",
    label: "Usuarios",
    icon: "bi-person-square",
    section: null,
    roles: [ROLES.ROOT],
    items: [
      { label: "Alta Usuario", route: "/AltaUsuario" },
      { label: "Editar Usuario", route: "/EditarUsuario" },
      { label: "Resetear contraseña", route: "/ActualizarPassword" },
      { label: "Eliminar Usuario", route: "/BajaUsuario" },
    ],
  },
  {
    key: "proveedores",
    label: "Proveedores",
    icon: "bi-truck",
    section: null,
    items: [
      { label: "Alta Proveedor", route: "/AgregarProveedor" },
      { label: "Editar Proveedor", route: "/EditarProveedor" },
      { label: "Baja Proveedor", route: "/EliminarProveedor" },
    ],
  },
  {
    key: "servicios",
    label: "Servicios",
    icon: "bi-shop",
    section: null,
    items: [
      { label: "Alta Servicio", route: "/AgregarServicio" },
      { label: "Editar Servicio", route: "/EditarServicio" },
      { label: "Baja Servicio", route: "/EliminarServicio" },
    ],
  },

  // ───────────────────── Impresoras e Insumos ─────────────────────
  {
    key: "impresoras",
    label: "Impresoras",
    icon: "bi-printer",
    section: "Impresoras e Insumos",
    items: [
      { label: "Crear Impresora", route: "/AgregarImpresora" },
      { label: "Ingreso Impresora", route: "/IngresarImpresora" },
      { label: "Entregar Impresora", route: "/EntregarImpresora" },
      { label: "Retirar Impresora", route: "/RetirarImpresora" },
      { label: "Baja Impresora", route: "/BajaImpresora" },
      { label: "Actualizar Serie", route: "/cambioSerieImpresora" },
    ],
  },
  {
    key: "marca",
    label: "Marca",
    icon: "bi-bookmark-plus",
    section: "Impresoras e Insumos",
    roles: [ROLES.ROOT],
    items: [
      { label: "Agregar Marca", route: "/AgregarMarca" },
      { label: "Editar Marca", route: "/EditarMarca" },
    ],
  },
  {
    key: "modelos",
    label: "Modelos",
    icon: "bi-file-diff",
    section: "Impresoras e Insumos",
    roles: [ROLES.ROOT],
    items: [
      { label: "Agregar Modelo", route: "/AgregarModelo" },
      { label: "Editar Modelo", route: "/EditarModelo" },
    ],
  },
  {
    key: "insumos",
    label: "Insumos",
    icon: "bi-droplet",
    section: "Impresoras e Insumos",
    roles: [ROLES.ROOT, ROLES.ADMIN],
    items: [
      { label: "Agregar Insumo", route: "/AgregarInsumo", roles: [ROLES.ROOT] },
      { label: "Editar Insumo", route: "/EditarInsumo", roles: [ROLES.ROOT] },
      { label: "Eliminar Insumo", route: "/EliminarInsumo", roles: [ROLES.ROOT] },
      { label: "Modificar Stock mínimo", route: "/ModificarStockMinimo" },
    ],
  },
  {
    key: "ingresosEgresos",
    label: "Ingresos y Egresos",
    icon: "bi-box",
    section: "Impresoras e Insumos",
    items: [
      { label: "Ingreso de insumos", route: "/IngresoInsumos" },
      { label: "Entrega de insumos", route: "/EgresoInsumos" },
      { label: "Ajuste de insumos", route: "/AjusteInsumos" },
    ],
  },
  {
    key: "reportes",
    label: "Reportes",
    icon: "bi-clipboard-data",
    section: "Impresoras e Insumos",
    items: [
      { label: "Stock", route: "/ReporteStock" },
      { label: "Movimiento por Servicios", route: "/ReporteMovimientosServicio" },
      { label: "Movimiento por Insumos", route: "/ReporteMovInsumos" },
      { label: "Ingreso por Proveedor", route: "/ReporteIngresosPorProveedor" },
      { label: "Ingreso por Insumos", route: "/ReporteIngresosPorInsumo" },
    ],
  },
  {
    key: "listados",
    label: "Listados",
    icon: "bi-journal-text",
    section: "Impresoras e Insumos",
    items: [
      { label: "Listar Impresoras en servicios", route: "/ListarImpresorasPorServicio" },
      { label: "Listar Servicios que tienen impresoras", route: "/ListarServiciosPorImpresora" },
    ],
  },

  // ───────────────────────── Productos Varios ─────────────────────────
  {
    key: "repuestos",
    label: "Repuestos",
    icon: "bi-pc-display",
    section: "Productos Varios",
    items: [
      { label: "Crear Repuesto", route: "/AgregarRepuesto" },
      { label: "Ingreso Repuesto", route: "/IngresoRepuesto" },
      { label: "Entregar Repuesto", route: "/EgresoRepuesto" },
      { label: "Ajuste Repuestos", route: "/AjusteRepuestos" },
    ],
  },
  {
    key: "reportesRepuestos",
    label: "Reportes de Repuestos",
    icon: "bi-journal-text",
    section: "Productos Varios",
    items: [{ label: "Stock Repuestos", route: "/StockRepuestos" }],
  },
  {
    key: "sistema",
    label: "Sistema",
    icon: "bi-database-down",
    section: "Productos Varios",
    roles: [ROLES.ROOT, ROLES.ADMIN],
    items: [
      { label: "Hacer Backup", route: "/HacerBackup" },
      { label: "Restaurar Backup", route: "/RestaurarBackup" },
    ],
  },
  {
    key: "logsSistema",
    label: "Logs del Sistema",
    icon: "bi-clipboard-data",
    section: "Productos Varios",
    roles: [ROLES.ROOT],
    items: [{ label: "Mostrar Logs", route: "/logs" }],
  },
];

/**
 * Devuelve, para un rol dado, los grupos visibles junto con sus items filtrados.
 * Un grupo con items vacíos tras el filtro no se devuelve.
 */
export function getMenuForRole(idRol) {
  return MENU_CONFIG.map((grupo) => {
    const grupoVisible = !grupo.roles || grupo.roles.includes(idRol);
    if (!grupoVisible) return null;

    const items = grupo.items.filter(
      (item) => !item.roles || item.roles.includes(idRol)
    );
    if (items.length === 0) return null;

    return { ...grupo, items };
  }).filter(Boolean);
}
