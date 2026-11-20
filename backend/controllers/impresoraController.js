// ============================================================================
// controllers/impresoraController.js
// Recibe los pedidos HTTP de /impresoras y delega en impresoraService.
//
// Secciones:
//   1. Imports
//   2. Endpoints existentes (listar, buscar, crear, editar, eliminar)
//   3. Baja lógica de una impresora (NUEVO): previa + baja
// ============================================================================

// ---------------------------------------------------------------------------
// 1. Imports
// ---------------------------------------------------------------------------
import {
  getAll,
  obtenerImpresoraPorMarcaYModelo,
  create,
  update,
  remove,
  obtenerPreviaBajaLogica,
  darDeBajaLogica,
} from "../services/impresoraService.js";

// ---------------------------------------------------------------------------
// 2. Endpoints existentes (sin cambios)
// ---------------------------------------------------------------------------
export async function listarImpresoras(req, res, next) {
  try {
    const impresoras = await getAll();
    res.json(impresoras);
  } catch (err) {
    next(err);
  }
}

export async function buscarImpresoraPorMarcaYModelo(req, res, next) {
  try {
    const { marcaId, modeloId } = req.query;

    if (!marcaId || !modeloId) {
      const error = new Error("Faltan parámetros marcaId o modeloId");
      error.isCustom = true;
      error.httpStatus = 400;
      error.code = "MISSING_PARAMS";
      throw error;
    }

    const impresora = await obtenerImpresoraPorMarcaYModelo(marcaId, modeloId);

    if (impresora) {
      res.json([impresora]); // frontend espera array
    } else {
      res.json([]); // no encontrada
    }
  } catch (err) {
    next(err);
  }
}

export async function crearImpresora(req, res, next) {
  try {
    const { marcaId, modeloId } = req.body;
    const nuevo = await create({ marcaId, modeloId });
    res.status(201).json(nuevo);
  } catch (err) {
    next(err);
  }
}

export async function editarImpresora(req, res, next) {
  try {
    const actualizado = await update(req.params.id, req.body);
    res.json(actualizado);
  } catch (err) {
    next(err);
  }
}

export async function eliminarImpresora(req, res, next) {
  try {
    const resultado = await remove(req.params.id);
    res.json(resultado);
  } catch (err) {
    next(err);
  }
}

// ---------------------------------------------------------------------------
// 3. Baja lógica de una impresora (marca + modelo)
// ---------------------------------------------------------------------------

// GET /impresoras/baja-logica/previa?marcaId=..&modeloId=..
// Informa qué pasaría con la baja (servicios que la bloquean, unidades en
// depósito, insumos afectados, si la marca queda vacía). No modifica nada.
export async function previaBajaLogica(req, res, next) {
  try {
    const { marcaId, modeloId } = req.query;
    const previa = await obtenerPreviaBajaLogica(marcaId, modeloId);
    res.json(previa);
  } catch (err) {
    next(err);
  }
}

// PUT /impresoras/baja-logica   body: { marcaId, modeloId }
// Ejecuta la baja completa. Si hay servicios con impresoras de ese modelo
// responde 409 (code IMPRESORA_CON_SERVICIOS) con la lista en `data`.
export async function bajaLogicaImpresora(req, res, next) {
  try {
    const { marcaId, modeloId } = req.body;
    // req.user lo completa el middleware de roles (payload del token).
    const resultado = await darDeBajaLogica(
      { marcaId, modeloId },
      req.user?.usuario ?? null
    );
    res.json(resultado);
  } catch (err) {
    next(err);
  }
}