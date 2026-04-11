import Servicio from "../models/Servicio.js";
import ImpresoraFisica from "../models/ImpresoraFisica.js";
import Impresora from "../models/Impresora.js";
import ServicioImpresora from "../models/ImpresoraServicio.js";
import Marca from "../models/Marca.js";
import Modelo from "../models/Modelo.js";

export async function getAll() {
  return await Servicio.findAll({
    where: { flagHabilitado: true },
    order: [["servicio", "ASC"]],
  });
}

export async function getByModelo(modeloId) {
  return await Servicio.findAll({
    include: [
      {
        model: ServicioImpresora,
        as: "impresoras",
        required: true, // 👈 fuerza INNER JOIN
        include: [
          {
            model: ImpresoraFisica,
            as: "impresoraFisica",
            required: true,
            include: [
              {
                model: Impresora,
                as: "impresora",
                required: true,
                include: [
                  {
                    model: Modelo,
                    as: "modelo",
                    where: { id: modeloId }, // 👈 filtro aplicado
                    required: true,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
    where: { flagHabilitado: true },
    order: [["servicio", "ASC"]],
  });
}

export async function getImpresorasByServicio(servicioId) {
  return await ServicioImpresora.findAll({
    where: { servicioId },
    include: [
      {
        model: ImpresoraFisica,
        as: "impresoraFisica",   // coincide con index.js
        required: true,
        include: [
          {
            model: Impresora,
            as: "impresora",     // coincide con index.js
            required: true,
            include: [
              { model: Marca, as: "marca", required: true },
              { model: Modelo, as: "modelo", required: true },
            ],
          },
        ],
      },
    ],
  });
}



// Crear nuevo
export async function create({ servicio, ubicacion }) {
  if (!servicio) {
    const error = new Error("El servicio es obligatorio");
    error.isCustom = true;
    error.httpStatus = 400;
    error.code = "MISSING_SERVICIO";
    throw error;
  }

  try {
    return await Servicio.create({ servicio, ubicacion });
  } catch (err) {
    if (err.name === "Este servicio ya existe en el sistema") {
      err.isCustom = true;
      err.httpStatus = 409;
      err.code = "SERVICIO_EXISTS";
    } else {
      err.isCustom = true;
      err.httpStatus = 500;
      err.code = "DB_ERROR";
    }
    throw err;
  }
}

// Actualizar
export async function update(id, data) {
  const servicio = await Servicio.findByPk(id);
  if (!servicio) {
    const error = new Error("Servicio no encontrado");
    error.isCustom = true;
    error.httpStatus = 404;
    error.code = "NOT_FOUND";
    throw error;
  }

  servicio.servicio = data.servicio || servicio.servicio;
  servicio.ubicacion = data.ubicacion || servicio.ubicacion;

  await servicio.save();
  return servicio;
}

// Eliminar
export async function remove(id) {
  const servicio = await Servicio.findByPk(id);
  if (!servicio) {
    const error = new Error("Servicio no encontrado");
    error.isCustom = true;
    error.httpStatus = 404;
    error.code = "NOT_FOUND";
    throw error;
  }

  if (!servicio.flagHabilitado) {
    const error = new Error("El servicio ya está dado de baja");
    error.isCustom = true;
    error.httpStatus = 409;
    error.code = "ALREADY_DISABLED";
    throw error;
  }

  await servicio.update({ flagHabilitado: false });
  await servicio.destroy(); // soft delete

  return { mensaje: "Servicio dado de baja" };
}