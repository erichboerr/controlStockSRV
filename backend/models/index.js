import sequelize from "../config/db.js";

// Modelos base
import Rol from "./Rol.js";
import Usuario from "./Usuario.js";
import Proveedor from "./Proveedor.js";
import Servicio from "./Servicio.js";

// Jerarquía impresoras
import Marca from "./Marca.js";
import Modelo from "./Modelo.js";
import Insumo from "./Insumo.js";
import ModeloInsumo from "./ModeloInsumo.js";
import Impresora from "./Impresora.js";

// Unidades físicas y servicios
import ImpresoraFisica from "./ImpresoraFisica.js";
import ServicioImpresora from "./ImpresoraServicio.js";

// Movimiento de insumos
import MovimientoInsumo from "./MovimientoInsumo.js";

//Movimiento de Repuestos
import MovimientoRepuesto from "./MovimientoRepuesto.js";
import Repuesto from "./Repuesto.js";


// =========================
// ✅ Asociaciones base
// =========================
Rol.hasMany(Usuario, { foreignKey: "rolId", as: "usuarios" });
Usuario.belongsTo(Rol, { foreignKey: "rolId", as: "rol" });


// =========================
// ✅ Jerarquía impresoras
// =========================

// Marca → Modelos
Marca.hasMany(Modelo, { foreignKey: "marcaId", as: "modelos" });
Modelo.belongsTo(Marca, { foreignKey: "marcaId", as: "marca" });

// ✅ Modelo ↔ Insumo (N‑N)
Modelo.belongsToMany(Insumo, {
  through: ModeloInsumo,
  foreignKey: "modeloId",
  as: "insumos",
});

Insumo.belongsToMany(Modelo, {
  through: ModeloInsumo,
  foreignKey: "insumoId",
  as: "modelos",
});

// Impresora lógica
Modelo.hasOne(Impresora, { foreignKey: "modeloId", as: "impresora" });
Impresora.belongsTo(Marca, { foreignKey: "marcaId", as: "marca" });
Impresora.belongsTo(Modelo, { foreignKey: "modeloId", as: "modelo" });


// =========================
// ✅ Impresora física (unidad real)
// =========================
ImpresoraFisica.belongsTo(Proveedor, { foreignKey: "proveedorId", as: "proveedor" });
ImpresoraFisica.belongsTo(Impresora, { foreignKey: "impresoraId", as: "impresora" });

ImpresoraFisica.hasMany(ServicioImpresora, {
  foreignKey: "impresoraFisicaId",
  as: "servicios",
});

Servicio.hasMany(ServicioImpresora, {
  foreignKey: "servicioId",
  as: "impresoras",
});

ServicioImpresora.belongsTo(Servicio, {
  foreignKey: "servicioId",
  as: "servicio",
});

ServicioImpresora.belongsTo(ImpresoraFisica, {
  foreignKey: "impresoraFisicaId",
  as: "impresoraFisica",
});


// =========================
// ✅ Movimiento de insumos
// =========================
Insumo.hasMany(MovimientoInsumo, {
  foreignKey: "insumoId",
  as: "movimientos",
});
MovimientoInsumo.belongsTo(Insumo, {
  foreignKey: "insumoId",
  as: "insumo",
});

Proveedor.hasMany(MovimientoInsumo, {
  foreignKey: "proveedorId",
  as: "ingresosInsumos",
});
MovimientoInsumo.belongsTo(Proveedor, {
  foreignKey: "proveedorId",
  as: "proveedorInsumos",
});

Servicio.hasMany(MovimientoInsumo, {
  foreignKey: "servicioId",
  as: "egresosInsumos",
});
MovimientoInsumo.belongsTo(Servicio, {
  foreignKey: "servicioId",
  as: "servicio",
});

// =========================
// ✅ Movimiento de repuestos
// =========================
Repuesto.hasMany(MovimientoRepuesto, {
  foreignKey: "repuestoId",
  as: "movimientosRepuestos",
});
MovimientoRepuesto.belongsTo(Repuesto, {
  foreignKey: "repuestoId",
  as: "repuesto",
});

Proveedor.hasMany(MovimientoRepuesto, {
  foreignKey: "proveedorId",
  as: "ingresosRepuestos",
});
MovimientoInsumo.belongsTo(Proveedor, {
  foreignKey: "proveedorId",
  as: "proveedorRepuestos",
});

Servicio.hasMany(MovimientoRepuesto, {
  foreignKey: "servicioId",
  as: "egresosRepuestos",
});
MovimientoInsumo.belongsTo(Servicio, {
  foreignKey: "servicioId",
  as: "servicioRepuesto",
});
// =========================
// ✅ Export final
// =========================
export default {
  Rol,
  Usuario,
  Proveedor,
  Servicio,
  Marca,
  Modelo,
  Insumo,
  ModeloInsumo,
  Impresora,
  ImpresoraFisica,
  ServicioImpresora,
  MovimientoInsumo,
  Repuesto,
  MovimientoRepuesto,
};