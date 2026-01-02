import { calcularStock } from "../helpers/calcularStock.js";

// Verificar stock disponible
export async function verificarStockDisponible(req, res, next) {
  try {
    const { id } = req.params;
    if (!id || isNaN(id)) {
      const error = new Error("ID de insumo inválido");
      error.isCustom = true;
      error.httpStatus = 400;
      error.code = "INVALID_ID";
      throw error;
    }

    const stock = await calcularStock(id);
    res.json({ insumoId: id, stock });
  } catch (err) {
    next(err);
  }
}