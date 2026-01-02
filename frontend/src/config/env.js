export const isDev = import.meta.env.MODE === "development";
export const isProd = import.meta.env.MODE === "production";

export const frontendUrl = import.meta.env.VITE_FRONTEND_URL;

export const backendUrlAuth = import.meta.env.VITE_AUTH_URL;
export const backendUrlProveedores = import.meta.env.VITE_PROVEEDORES_URL;
export const backendUrlServicios = import.meta.env.VITE_SERVICIOS_URL;
export const backendUrlUsuarios = import.meta.env.VITE_USUARIOS_URL;
export const backendUrlRoles = import.meta.env.VITE_ROLES_URL;
export const backendUrlMarcas = import.meta.env.VITE_MARCA_URL;
export const backendUrlModelos = import.meta.env.VITE_MODELO_URL;
export const backendUrlInsumos = import.meta.env.VITE_INSUMO_URL;
export const backendUrlImpresoras = import.meta.env.VITE_IMPRESORAS_URL;
export const backendUrlImpresorasFisicas = import.meta.env.VITE_IMPRESORAS_FISICAS_URL;
export const backendUrlImpresorasServicio = import.meta.env.VITE_IMPRESORAS_SERVICIO_URL;
export const backendUrlIngresosInsumos = import.meta.env.VITE_INGRESOS_URL;
export const backendUrlEgresosInsumos = import.meta.env.VITE_EGRESOS_URL;
export const backendUrlStock = import.meta.env.VITE_STOCK_URL;
export const backendUrlReportes = import.meta.env.VITE_REPORTES_URL;
export const backendUrlRepuestos = import.meta.env.VITE_REPUESTOS_URL;
export const backendUrlLogs = import.meta.env.VITE_LOGS_URL;


// Endpoints REST
export const authUrl = `${backendUrlAuth}/auth`;
export const proveedoresUrl = `${backendUrlProveedores}/proveedores`;
export const serviciosUrl = `${backendUrlServicios}/servicios`;
export const usuariosUrl = `${backendUrlUsuarios}/usuarios`;
export const rolesUrl = `${backendUrlRoles}/roles`;
export const marcaUrl = `${backendUrlMarcas}/marcas`;
export const modeloUrl = `${backendUrlModelos}/modelos`;
export const insumoUrl = `${backendUrlInsumos}/insumos`;
export const impresoraUrl = `${backendUrlImpresoras}/impresoras`; // Endpoint para impresoras objeto
export const impresoraFisicaUrl = `${backendUrlImpresorasFisicas}/impresorasFisicas`; // Endpoint para impresoras físicas entregadas por el proveedor
export const impresorasServicioUrl = `${backendUrlImpresorasServicio}/impresorasServicio`; // Endpoint para la entrega de impresoras físicas a servicios
export const ingresoUrl = `${backendUrlIngresosInsumos}/ingresos`;
export const egresoUrl = `${backendUrlEgresosInsumos}/egresos`;
export const stockUrl = `${backendUrlStock}/stock`;
export const reportesUrl = `${backendUrlReportes}/reportes`;
export const repuestosUrl = `${backendUrlRepuestos}/repuestos`;
export const logsUrl = `${backendUrlLogs}/logs`;

