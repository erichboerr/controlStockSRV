import ImpresoraFisica from "../models/ImpresoraFisica.js";
import ImpresoraServicio from "../models/ImpresoraServicio.js";
import Impresora from "../models/Impresora.js";
import Marca from "../models/Marca.js";
import Modelo from "../models/Modelo.js";
import { Op } from "sequelize";


export async function entregarImpresoraService({ numeroSerie, servicioId }) {
  if (!numeroSerie?.trim() || !servicioId) {
    const error = new Error("Faltan datos obligatorios");
    error.isCustom = true;
    error.httpStatus = 400;
    error.code = "MISSING_DATA";
    throw error;
  }

  const impresoraFisica = await ImpresoraFisica.findOne({
    where: { numeroSerie: { [Op.iLike]: numeroSerie.trim() } },
  });

  if (!impresoraFisica) {
    const error = new Error("Impresora física no encontrada serie numero: " + numeroSerie.trim());
    error.isCustom = true;
    error.httpStatus = 404;
    error.code = "NOT_FOUND";
    throw error;
  }

  const entregaActiva = await ImpresoraServicio.findOne({
    where: { impresoraFisicaId: impresoraFisica.id, fechaRetiro: null },
  });

  if (entregaActiva) {
    const error = new Error("La impresora ya está entregada a un servicio activo");
    error.isCustom = true;
    error.httpStatus = 409;
    error.code = "ALREADY_DELIVERED";
    throw error;
  }

  return await ImpresoraServicio.create({
    impresoraFisicaId: impresoraFisica.id,
    servicioId,
    fechaEntrega: new Date(),
  });
}

export async function retirarImpresoraService({ impresoraFisicaId, servicioId }) {
  if (!impresoraFisicaId || !servicioId) {
    const error = new Error("Faltan datos obligatorios");
    error.isCustom = true;
    error.httpStatus = 400;
    error.code = "MISSING_DATA";
    throw error;
  }

  const entregaActiva = await ImpresoraServicio.findOne({
    where: { impresoraFisicaId, servicioId, fechaRetiro: null, flagHabilitado: true },
  });

  if (!entregaActiva) {
    const error = new Error("No se encontró entrega activa para esa impresora");
    error.isCustom = true;
    error.httpStatus = 404;
    error.code = "DELIVERY_NOT_FOUND";
    throw error;
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
    throw new Error("Error al obtener las impresoras del servicio: " + error.message);
  }
}