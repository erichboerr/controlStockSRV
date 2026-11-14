import Joi from "joi";

// Un ítem de egreso/ingreso: id de la entidad (insumo o repuesto) + cantidad
// entera positiva. La validación manual que agregamos antes en los
// controllers/services queda como defensa en profundidad; esta es la
// validación de "primera línea" a nivel ruta.
const itemInsumo = Joi.object({
  insumoId: Joi.number().integer().positive().required(),
  cantidad: Joi.number().integer().positive().required(),
});

const itemRepuesto = Joi.object({
  repuestoId: Joi.number().integer().positive().required(),
  cantidad: Joi.number().integer().positive().required(),
});

export const egresoInsumoSchema = Joi.object({
  servicioId: Joi.number().integer().positive().required(),
  items: Joi.array().items(itemInsumo).min(1).required(),
});

export const ingresoInsumoSchema = Joi.object({
  proveedorId: Joi.number().integer().positive().required(),
  remito: Joi.string().trim().min(1).max(100).required(),
  items: Joi.array().items(itemInsumo).min(1).required(),
});

export const egresoRepuestoSchema = Joi.object({
  servicioId: Joi.number().integer().positive().required(),
  items: Joi.array().items(itemRepuesto).min(1).required(),
});

export const ingresoRepuestoSchema = Joi.object({
  proveedorId: Joi.number().integer().positive().required(),
  remito: Joi.string().trim().min(1).max(100).required(),
  items: Joi.array().items(itemRepuesto).min(1).required(),
});

export const crearUsuarioSchema = Joi.object({
  user: Joi.string().trim().min(3).max(50).required(),
  password: Joi.string().min(6).max(100).required(),
  rolId: Joi.number().integer().positive().required(),
});

export const reactivarUsuarioSchema = Joi.object({
  password: Joi.string().min(6).max(100).required(),
  rolId: Joi.number().integer().positive().required(),
});
