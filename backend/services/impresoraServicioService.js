import { createError } from "../utils/createError.js";
import ImpresoraFisica from "../models/ImpresoraFisica.js";
import ImpresoraServicio from "../models/ImpresoraServicio.js";
import Impresora from "../models/Impresora.js";
import Marca from "../models/Marca.js";
import Modelo from "../models/Modelo.js";
import { Op } from "sequelize";

export async function entregarImpresoraService({ numeroSerie, servicioId }) {
  if (!numeroSerie?.trim() || !servicioId) {
    throw createError("Faltan datos obligatorios", 400, "MISSING_DATA");
  }

  const impresoraFisica = await ImpresoraFisica.findOne({
    where: { numeroSerie: { [Op.iLike]: numeroSerie.trim() } },
  });

  if (!impresoraFisica) {
    throw createError("Impresora física no encontrada serie numero: " + numeroSerie.trim(), 404, "NOT_FOUND");
  }

  const entregaActiva = await ImpresoraServicio.findOne({
    where: { impresoraFisicaId: impresoraFisica.id, fechaRetiro: null },
  });

  if (entregaActiva) {
    throw createError("La impresora ya está entregada a un servicio activo", 409, "ALREADY_DELIVERED");
  }

  return await ImpresoraServicio.create({
    impresoraFisicaId: impresoraFisica.id,
    servicioId,
    fechaEntrega: new Date(),
  });
}

export async function retirarImpresoraService({ impresoraFisicaId, servicioId }) {
  if (!impresoraFisicaId || !servicioId) {
    throw createError("Faltan datos obligatorios", 400, "MISSING_DATA");
  }

  const entregaActiva = await ImpresoraServicio.findOne({
    where: { impresoraFisicaId, servicioId, fechaRetiro: null, flagHabilitado: true },
  });

  if (!entregaActiva) {
    throw createError("No se encontró entrega activa para esa impresora", 404, "DELIVERY_NOT_FOUND");
  }

  entregaActiva.fechaRetiro = new Date();
  entregaActiva.flagHabilitado = false;
  await entregaActiva.save();

  return entregaActiva;
}

export async function listarImpresorasActivasService(servicioId) {
  return await ImpresoraServicio.findAll({
    where: { servicioId, fechaRetiro: null },
    include: [
      {
        model: ImpresoraFisica,
        as: "impresoraFisica",
        include: [
          {
            model: Impresora,
            as: "impresora",
            include: [
              { model: Marca, as: "marca" },
              { model: Modelo, as: "modelo" },
            ],
          },
        ],
      },
    ],
  });
}

export async function getImpresorasPorServicioService(servicioId) {
  try {
    const impresorasEntregadas = await ImpresoraServicio.findAll({
      where: {
        servicioId,
        fechaRetiro: null,
        flagHabilitado: true,
      },
      include: [
        {
          model: ImpresoraFisica,
          as: "impresoraFisica",
          include: [
            {
              model: Impresora,
              as: "impresora",
              include: [
                { model: Marca, as: "marca" },
                { model: Modelo, as: "modelo" },
              ],
            },
          ],
        },
      ],
    });

    return impresorasEntregadas;
  } catch (error) {
    throw createError("Error al obtener las impresoras del servicio", 500, "DB_ERROR");
  }
}