import sequelize from "../config/db.js"; // Importas tu instancia de conexión
import { egresarInsumoService } from "../services/egresoService.js";
import { calcularStock } from "../helpers/calcularStock.js";
import { createError } from "../utils/createError.js";

export async function egresarInsumo(req, res, next) {
    // Iniciamos la transacción
    const t = await sequelize.transaction();

    try {
        const { servicioId, items } = req.body;

        if (!servicioId || !items?.length) {
            throw createError("Datos incompletos", 400, "MISSING_DATA");
        }

        for (const item of items) {
            // Pasamos la transacción al helper para que lea el stock real en este momento
            const stockActual = await calcularStock(item.insumoId, { transaction: t });

            if (item.cantidad > stockActual) {
                throw createError(`Stock insuficiente para ${item.insumoId}`, 409, "INSUFFICIENT_STOCK");
            }
        }

        // Pasamos la transacción al servicio para que el bulkCreate sea parte de ella
        await egresarInsumoService({ servicioId, items }, { transaction: t });

        // Si todo salió bien, guardamos los cambios definitivamente
        await t.commit();

        return res.json({ success: true, message: "Egreso registrado correctamente" });

    } catch (err) {
        // Si algo falló, deshacemos cualquier cambio en la base de datos
        await t.rollback();
        next(err);
    }
}

