import { createError } from "../utils/createError.js";
import Insumo from "../models/Insumo.js";
import Modelo from "../models/Modelo.js";
import ModeloInsumo from "../models/ModeloInsumo.js";
import sequelize from "../config/db.js";

export async function getAll() {
  return await Insumo.findAll({
    where: { flagHabilitado: true },
    order: [["insumo", "ASC"]],
  });
}

export async function getByModelo(modeloId) {
  const modelo = await Modelo.findByPk(modeloId, {
    include: { model: Insumo, as: "insumos" },
  });
  return modelo ? modelo.insumos : [];
}

export async function createOrAssociate(modeloId, insumos, stock_minimo) {
  if (!modeloId || !Array.isArray(insumos)) {
    throw createError("Datos incompletos para asociar insumos", 400, "MISSING_DATA");
  }

  const resultados = [];
  for (const nombre of insumos) {
    const normalizado = nombre.trim().toUpperCase();

    let insumo = await Insumo.findOne({ where: { insumo: normalizado } });
    if (!insumo) {
      insumo = await Insumo.create({
        insumo: normalizado,
        stock_minimo: stock_minimo ?? 5,
      });
    } else if (!insumo.flagHabilitado) {
      // El insumo existe pero estaba dado de baja: al volver a cargarlo
      // (típicamente en una lista junto con otros) lo reactivamos directo,
      // sin pedir confirmación por cada uno como en Marca/Proveedor/Servicio.
      await insumo.update({ flagHabilitado: true });
    }

    const existe = await ModeloInsumo.findOne({
      where: { modeloId, insumoId: insumo.id },
    });
    if (!existe) {
      await ModeloInsumo.create({ modeloId, insumoId: insumo.id });
    }

    resultados.push(insumo);
  }
  return resultados;
}

export async function removeAssociation(modeloId, insumoId) {
  const relacion = await ModeloInsumo.findOne({ where: { modeloId, insumoId } });
  if (!relacion) {
    throw createError("La relación modelo-insumo no existe", 404, "RELATION_NOT_FOUND");
  }

  await relacion.destroy();

  const sigueAsociado = await ModeloInsumo.findOne({ where: { insumoId } });
  if (!sigueAsociado) {
    const insumo = await Insumo.findByPk(insumoId);
    if (insumo) {
      await insumo.update({ flagHabilitado: false });
      return { mensaje: "Insumo desasociado y eliminado porque no tenía más modelos asociados" };
    }
  }
  return { mensaje: "Insumo desasociado del modelo" };
}

export async function updateStockMinimo(id, stock_minimo) {
  const insumo = await Insumo.findByPk(id);
  if (!insumo) {
    throw createError("Insumo no encontrado", 404, "NOT_FOUND");
  }

  insumo.stock_minimo = stock_minimo;
  await insumo.save();
  return insumo;
}

export async function remove(id) {
  const insumo = await Insumo.findByPk(id);
  if (!insumo) {
    throw createError("Insumo no encontrado", 404, "NOT_FOUND");
  }

  if (!insumo.flagHabilitado) {
    throw createError("El insumo ya está dado de baja", 409, "ALREADY_DISABLED");
  }

  await insumo.update({ flagHabilitado: false });
  return { mensaje: "Insumo dado de baja" };
}

export async function update(id, data) {
  const insumo = await Insumo.findByPk(id);
  if (!insumo) {
    throw createError("Insumo no encontrado", 404, "NOT_FOUND");
  }

  if (!data.insumo?.trim()) {
    throw createError("Nombre de insumo inválido", 400, "INVALID_INPUT");
  }

  insumo.insumo = data.insumo;
  await insumo.save();
  return insumo;
}

export async function getInsumosBajoStock({ marcaId, modeloId, insumoId } = {}) {
  const condiciones = [];
  const replacements = {};

  if (marcaId) {
    condiciones.push(`ma.id = :marcaId`);
    replacements.marcaId = parseInt(marcaId, 10);
  }
  if (modeloId) {
    condiciones.push(`mo.id = :modeloId`);
    replacements.modeloId = parseInt(modeloId, 10);
  }
  if (insumoId) {
    condiciones.push(`i.id = :insumoId`);
    replacements.insumoId = parseInt(insumoId, 10);
  }

  const filtroExtra = condiciones.length ? `AND ${condiciones.join(" AND ")}` : "";

  const query = `
    WITH stock_calculado AS (
      SELECT
        "insumoId",
        SUM(cantidad * CASE WHEN tipo = 'ingreso' THEN 1 ELSE -1 END) AS stock_actual
      FROM movimiento_insumo
      GROUP BY "insumoId"
    )
    SELECT
      i.id AS "insumoId",
      i.insumo AS insumo,
      mo.id AS "modeloId",
      mo.modelo AS modelo,
      ma.id AS "marcaId",
      ma.marca AS marca,
      COALESCE(sc.stock_actual, 0) AS stock_actual,
      i.stock_minimo
    FROM insumos i
    LEFT JOIN modelo_insumo mi ON mi."insumoId" = i.id
    LEFT JOIN modelos mo ON mo.id = mi."modeloId"
    LEFT JOIN marcas ma ON ma.id = mo."marcaId"
    LEFT JOIN stock_calculado sc ON sc."insumoId" = i.id
    WHERE i."flagHabilitado" = true
      AND COALESCE(sc.stock_actual, 0) < i.stock_minimo
      ${filtroExtra}
    ORDER BY ma.marca NULLS LAST, mo.modelo NULLS LAST, i.insumo;`;

  return await sequelize.query(query, {
    replacements,
    type: sequelize.QueryTypes.SELECT,
  });
}