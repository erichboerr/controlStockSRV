import { createError } from '../utils/createError.js';
import Marca from '../models/Marca.js';

export async function getAll() {
  return await Marca.findAll({
    where: { flagHabilitado: true },
    order: [['marca', 'ASC']],
  });
}

export async function create(marca) {
  if (!marca || typeof marca !== 'string') {
    throw createError('Marca inválida', 400, 'INVALID_MARCA');
  }

  try {
    return await Marca.create({ marca });
  } catch (err) {
    // Fallback por condición de carrera (dos altas simultáneas del mismo
    // nombre entre el findOne y el create).
    if (err.name === 'SequelizeUniqueConstraintError') {
      throw createError(
        'Esta marca ya existe en el sistema',
        409,
        'MARCA_EXISTS'
      );
    }
    throw createError('Error al crear marca', 500, 'DB_ERROR');
  }
}

export async function update(id, data) {
  const marca = await Marca.findByPk(id);
  if (!marca) {
    throw createError('Marca no encontrada', 404, 'NOT_FOUND');
  }

  marca.marca = data.marca || marca.marca;
  await marca.save();
  return marca;
}
