// ============================================================================
// services/impresoraService.js
// Lógica de negocio de la impresora "lógica" (el par marca + modelo).
//
// Secciones:
//   1. Imports
//   2. CRUD existente (getAll, buscar, create, update, remove)
//   3. Baja lógica de una impresora (NUEVO):
//        - analizarBajaLogica      → revisa qué pasaría (no modifica nada)
//        - obtenerPreviaBajaLogica → versión pública del análisis (para la pantalla)
//        - darDeBajaLogica         → hace la baja completa en una transacción
// ============================================================================

// ---------------------------------------------------------------------------
// 1. Imports
// ---------------------------------------------------------------------------
import { Op, QueryTypes } from "sequelize";
import sequelize from "../config/db.js";
import { createError } from "../utils/createError.js";
import logger from "../utils/logger.js";
import Impresora from "../models/Impresora.js";
import ImpresoraFisica from "../models/ImpresoraFisica.js";
import Insumo from "../models/Insumo.js";
import Marca from "../models/Marca.js";
import Modelo from "../models/Modelo.js";
// Reutilizamos la MISMA consulta que usa Listados → "Servicios por modelo de
// impresora", así el bloqueo de la baja y el listado nunca se contradicen.
import { getByModelo } from "./servicioService.js";

// ---------------------------------------------------------------------------
// 2. CRUD existente (sin cambios)
// ---------------------------------------------------------------------------
export async function getAll() {
  return await Impresora.findAll({
    where: { flagHabilitado: true },
    order: [["impresora", "ASC"]],
  });
}

export async function obtenerImpresoraPorMarcaYModelo(marcaId, modeloId) {
  return await Impresora.findOne({
    where: {
      marcaId: parseInt(marcaId),
      modeloId: parseInt(modeloId),
    },
  });
}

export async function create({ marcaId, modeloId }) {
  if (!marcaId || typeof marcaId !== "number") {
    throw createError("marcaId inválido", 400, "INVALID_MARCA");
  }
  if (!modeloId || typeof modeloId !== "number") {
    throw createError("modeloId inválido", 400, "INVALID_MODELO");
  }

  try {
    return await Impresora.create({ marcaId, modeloId });
  } catch (err) {
    if (err.name === "SequelizeUniqueConstraintError") {
      throw createError("Esta impresora ya existe en el sistema", 409, "IMPRESORA_EXISTS");
    }
    throw createError("Error al crear impresora", 500, "DB_ERROR");
  }
}

export async function update(id, data) {
  const impresora = await Impresora.findByPk(id);
  if (!impresora) {
    throw createError("Impresora no encontrada", 404, "NOT_FOUND");
  }

  impresora.impresora = data.impresora || impresora.impresora;
  await impresora.save();
  return impresora;
}

export async function remove(id) {
  const impresora = await Impresora.findByPk(id);
  if (!impresora) {
    throw createError("Impresora no encontrada", 404, "NOT_FOUND");
  }

  if (!impresora.flagHabilitado) {
    throw createError("La impresora ya está dada de baja", 409, "ALREADY_DISABLED");
  }

  await impresora.update({ flagHabilitado: false });
  return { mensaje: "Impresora dada de baja" };
}

// ---------------------------------------------------------------------------
// 3. Baja lógica de una impresora (marca + modelo)
// ---------------------------------------------------------------------------

// Insumos que SOLO usa este modelo, con su stock actual.
//  - "Exclusivo" = ningún otro modelo HABILITADO lo tiene asociado
//    (mismo criterio que ya usa "desasociar insumo de modelo").
//  - El stock se calcula igual que helpers/calcularStock.js:
//    ingresos - egresos, ignorando movimientos borrados.
const SQL_INSUMOS_EXCLUSIVOS = `
  SELECT
    i.id,
    i.insumo,
    COALESCE((
      SELECT SUM(CASE WHEN m.tipo = 'ingreso' THEN m.cantidad ELSE -m.cantidad END)
      FROM movimiento_insumo m
      WHERE m."insumoId" = i.id
        AND m."deletedAt" IS NULL
    ), 0)::int AS stock
  FROM insumos i
  JOIN modelo_insumo mi ON mi."insumoId" = i.id
  WHERE mi."modeloId" = :modeloId
    AND i."flagHabilitado" = true
    AND i."deletedAt" IS NULL
    AND NOT EXISTS (
      SELECT 1
      FROM modelo_insumo otro
      JOIN modelos mo ON mo.id = otro."modeloId"
      WHERE otro."insumoId" = i.id
        AND otro."modeloId" <> :modeloId
        AND mo."flagHabilitado" = true
        AND mo."deletedAt" IS NULL
    )
  ORDER BY i.insumo
`;

// Revisa qué pasaría si se diera de baja este modelo. NO modifica nada.
//  - Si se le pasa una transacción, bloquea la fila del modelo y de su marca
//    (FOR UPDATE) para que dos bajas simultáneas se ejecuten una detrás de
//    la otra y el cálculo de "la marca quedó sin modelos" sea correcto.
//  - Si hay servicios con impresoras de este modelo, corta ahí y devuelve
//    solo esa lista (el resto del análisis no hace falta para bloquear).
async function analizarBajaLogica(marcaId, modeloId, transaction) {
  const marcaIdNum = Number.parseInt(marcaId, 10);
  const modeloIdNum = Number.parseInt(modeloId, 10);

  if (!Number.isInteger(marcaIdNum) || !Number.isInteger(modeloIdNum)) {
    throw createError(
      "Faltan parámetros marcaId o modeloId",
      400,
      "MISSING_PARAMS"
    );
  }

  // El modelo tiene que existir, estar habilitado y pertenecer a esa marca.
  const modelo = await Modelo.findOne({
    where: { id: modeloIdNum, marcaId: marcaIdNum, flagHabilitado: true },
    include: [
      { model: Marca, as: "marca", required: true, attributes: ["id", "marca"] },
    ],
    transaction,
    ...(transaction ? { lock: transaction.LOCK.UPDATE } : {}),
  });
  if (!modelo) {
    throw createError(
      "El modelo no existe o ya está dado de baja",
      404,
      "MODELO_NOT_FOUND"
    );
  }

  const analisis = {
    modelo,
    impresora: null,
    servicios: [],
    unidadesEnDeposito: 0,
    insumos: [],
    marcaQuedaVacia: false,
  };

  // 3.1 Servicios con impresoras de este modelo asignadas y activas
  //     (mismo criterio que Listados → Servicios por modelo de impresora).
  const filas = await getByModelo(modeloIdNum);
  analisis.servicios = filas.map((s) => ({
    id: s.id,
    servicio: s.servicio,
    cantidad: s.impresoras.length,
  }));
  if (analisis.servicios.length > 0) return analisis;

  // 3.2 Impresora lógica (marca + modelo) y sus unidades físicas habilitadas.
  //     Como no hay servicios con impresoras activas, todas las habilitadas
  //     están en depósito.
  analisis.impresora = await Impresora.findOne({
    where: { marcaId: marcaIdNum, modeloId: modeloIdNum },
    transaction,
  });
  if (analisis.impresora) {
    analisis.unidadesEnDeposito = await ImpresoraFisica.count({
      where: { impresoraId: analisis.impresora.id, flagHabilitado: true },
      transaction,
    });
  }

  // 3.3 Insumos exclusivos de este modelo (los que se darían de baja).
  analisis.insumos = await sequelize.query(SQL_INSUMOS_EXCLUSIVOS, {
    replacements: { modeloId: modeloIdNum },
    type: QueryTypes.SELECT,
    transaction,
  });

  // 3.4 ¿La marca queda sin otros modelos habilitados?
  const otrosModelos = await Modelo.count({
    where: {
      marcaId: marcaIdNum,
      flagHabilitado: true,
      id: { [Op.ne]: modeloIdNum },
    },
    transaction,
  });
  analisis.marcaQuedaVacia = otrosModelos === 0;

  return analisis;
}

// Versión pública del análisis: es lo que consume la pantalla ANTES de
// confirmar. Solo devuelve los datos necesarios.
export async function obtenerPreviaBajaLogica(marcaId, modeloId) {
  const a = await analizarBajaLogica(marcaId, modeloId);

  return {
    marca: a.modelo.marca.marca,
    modelo: a.modelo.modelo,
    puedeDarseDeBaja: a.servicios.length === 0,
    servicios: a.servicios, // [{ id, servicio, cantidad }]
    unidadesEnDeposito: a.unidadesEnDeposito,
    insumos: a.insumos, // [{ id, insumo, stock }] que se darían de baja
    marcaQuedaVacia: a.marcaQuedaVacia,
  };
}

// Baja lógica completa, todo o nada (una sola transacción):
//   1. Unidades físicas en depósito  → baja con fecha
//   2. Insumos exclusivos del modelo → baja soft
//   3. Impresora lógica (marca+modelo) → baja soft
//   4. Modelo                         → baja soft
//   5. Marca (solo si quedó sin modelos habilitados) → baja soft
// Si todavía hay servicios con impresoras de este modelo, no cambia nada y
// responde 409 con la lista de servicios.
export async function darDeBajaLogica({ marcaId, modeloId }, usuario = null) {
  const t = await sequelize.transaction();

  try {
    // Se vuelve a analizar DENTRO de la transacción: no confiamos en lo que
    // vio la pantalla, porque pudo haber cambiado desde entonces.
    const a = await analizarBajaLogica(marcaId, modeloId, t);

    if (a.servicios.length > 0) {
      throw createError(
        "No se puede dar de baja: hay impresoras de este modelo asignadas a servicios",
        409,
        "IMPRESORA_CON_SERVICIOS",
        { servicios: a.servicios }
      );
    }

    const ahora = new Date();

    // 1) Unidades físicas en depósito
    let unidadesDadasDeBaja = 0;
    if (a.impresora) {
      const [cantidad] = await ImpresoraFisica.update(
        { flagHabilitado: false, fechaBaja: ahora },
        {
          where: { impresoraId: a.impresora.id, flagHabilitado: true },
          transaction: t,
        }
      );
      unidadesDadasDeBaja = cantidad;
    }

    // 2) Insumos exclusivos del modelo (las filas de modelo_insumo se
    //    conservan, para poder reactivar el modelo en el futuro).
    const idsInsumos = a.insumos.map((i) => i.id);
    if (idsInsumos.length > 0) {
      await Insumo.update(
        { flagHabilitado: false },
        { where: { id: idsInsumos }, transaction: t }
      );
    }

    // 3) Impresora lógica (si existe la fila marca+modelo)
    if (a.impresora) {
      await a.impresora.update({ flagHabilitado: false }, { transaction: t });
    }

    // 4) Modelo
    await a.modelo.update({ flagHabilitado: false }, { transaction: t });

    // 5) Marca, solo si ya no le quedan modelos habilitados
    if (a.marcaQuedaVacia) {
      await Marca.update(
        { flagHabilitado: false },
        { where: { id: a.modelo.marcaId }, transaction: t }
      );
    }

    await t.commit();

    const resultado = {
      marca: a.modelo.marca.marca,
      modelo: a.modelo.modelo,
      marcaDadaDeBaja: a.marcaQuedaVacia,
      insumosDadosDeBaja: idsInsumos.length,
      unidadesDadasDeBaja,
    };

    // Registro de auditoría: quién dio de baja qué.
    logger.info({
      message: `Baja lógica de impresora: ${resultado.marca} ${resultado.modelo}`,
      controller: "/impresoras",
      action: "baja-logica",
      route: "/impresoras/baja-logica",
      usuario,
      ...resultado,
      insumos: a.insumos.map((i) => i.insumo),
    });

    return resultado;
  } catch (err) {
    if (!t.finished) await t.rollback();
    if (err.isCustom) throw err;

    logger.error({
      message: err.message,
      stack: err.stack,
      controller: "/impresoras",
      action: "baja-logica",
      route: "/impresoras/baja-logica",
    });
    throw createError(
      "Error al dar de baja la impresora",
      500,
      "DB_ERROR"
    );
  }
}