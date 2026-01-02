import { egresarInsumoService } from "../services/egresosService.js";
import { calcularStock } from "../helpers/calcularStock.js";

export async function egresarInsumo(req, res, next) {
  try {
    const { servicioId, items } = req.body;

    // ✅ Validación inicial
    if (!servicioId || !items?.length) {
      const error = new Error("Datos incompletos");
      error.isCustom = true;
      error.httpStatus = 400;
      error.code = "MISSING_DATA";
      throw error;
    }

    // ✅ Validación defensiva por item
    for (const item of items) {
      if (!item.insumoId || !item.cantidad) {
        const error = new Error(
          `Item inválido: insumoId=${item.insumoId}, cantidad=${item.cantidad}`
        );
        error.isCustom = true;
        error.httpStatus = 400;
        error.code = "INVALID_ITEM";
        throw error;
      }

      const stockActual = await calcularStock(item.insumoId);

      if (item.cantidad > stockActual) {
        const error = new Error(
          `Stock insuficiente para el insumo ${item.insumoId}. Disponible: ${stockActual}`
        );
        error.isCustom = true;
        error.httpStatus = 409; // Conflict
        error.code = "INSUFFICIENT_STOCK";
        throw error;
      }
    }

    // ✅ Registrar egreso
    await egresarInsumoService({ servicioId, items });

    return res.json({
      success: true,
      message: "Egreso registrado correctamente",
    });
  } catch (err) {
    next(err); // ✅ delegás al middleware
  }
}