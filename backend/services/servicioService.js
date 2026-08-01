import { createError } from '../utils/createError.js';
import Servicio from '../models/Servicio.js';
import ImpresoraFisica from '../models/ImpresoraFisica.js';
import Impresora from '../models/Impresora.js';
import ServicioImpresora from '../models/ImpresoraServicio.js';
import Marca from '../models/Marca.js';
import Modelo from '../models/Modelo.js';

export async function getAll() {
  return await Servicio.findAll({
    where: { flagHabilitado: true },
    order: [['servicio', 'ASC']],
  });
}

export async function getByModelo(modeloId) {
  return await Servicio.findAll({
    include: [
      {
        model: ServicioImpresora,
        as: 'impresoras',
        required: true,
        where: { fechaRetiro: null, flagHabilitado: true },
        include: [
          {
            model: ImpresoraFisica,
            as: 'impresoraFisica',
            required: true,
            where: { flagHabilitado: true, deletedAt: null },
            include: [
              {
                model: Impresora,
                as: 'impresora',
                required: true,
                include: [
                  {
                    model: Modelo,
                    as: 'modelo',
                    where: { id: modeloId },
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
    order: [['servicio', 'ASC']],
  });
}

export async function getImpresorasByServicio(servicioId) {
  return await ServicioImpresora.findAll({
    where: {
      servicioId,
      fechaRetiro: null,
      flagHabilitado: true,
    },
    include: [
      {
        model: ImpresoraFisica,
        as: 'impresoraFisica',
        required: true,
         where: { flagHabilitado: true, deletedAt: null },
        include: [
          {
            model: Impresora,
            as: 'impresora',
            required: true,
            include: [
              { model: Marca, as: 'marca', required: true },
              { model: Modelo, as: 'modelo', required: true },
            ],
          },
        ],
      },
    ],
  });
}

export async function create({ servicio, ubicacion }) {
  if (!servicio) {
    throw createError('El servicio es obligatorio', 400, 'MISSING_SERVICIO');
  }

  const existente = await Servicio.findOne({ where: { servicio } });
  if (existente) {
    if (existente.flagHabilitado) {
      throw createError('Este servicio ya existe en el sistema', 409, 'SERVICIO_EXISTS');
    }
    throw createError(
      'Ya existe un servicio con ese nombre, dado de baja',
      409,
      'EXISTS_DISABLED',
      { id: existente.id, nombre: existente.servicio, bajaEl: existente.updatedAt }
    );
  }

  try {
    return await Servicio.create({ servicio, ubicacion });
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      throw createError(
        'Este servicio ya existe en el sistema',
        409,
        'SERVICIO_EXISTS'
      );
    }
    throw createError('Error al crear servicio', 500, 'DB_ERROR');
  }
}

export async function reactivar(id) {
  const servicio = await Servicio.findByPk(id);
  if (!servicio) {
    throw createError('Servicio no encontrado', 404, 'NOT_FOUND');
  }
  if (servicio.flagHabilitado) {
    throw createError('El servicio ya está habilitado', 409, 'ALREADY_ENABLED');
  }
  await servicio.update({ flagHabilitado: true });
  return servicio;
}

export async function update(id, data) {
  const servicio = await Servicio.findByPk(id);
  if (!servicio) {
    throw createError('Servicio no encontrado', 404, 'NOT_FOUND');
  }

  servicio.servicio = data.servicio || servicio.servicio;
  servicio.ubicacion = data.ubicacion || servicio.ubicacion;

  await servicio.save();
  return servicio;
}

export async function remove(id) {
  const servicio = await Servicio.findByPk(id);
  if (!servicio) {
    throw createError('Servicio no encontrado', 404, 'NOT_FOUND');
  }

  if (!servicio.flagHabilitado) {
    throw createError(
      'El servicio ya está dado de baja',
      409,
      'ALREADY_DISABLED'
    );
  }

  await servicio.update({ flagHabilitado: false });
  return { mensaje: 'Servicio dado de baja' };
}
