import sequelize from "../config/db.js"; // Importas tu instancia de conexión
import { egresarInsumoService } from "../services/egresoService.js";
import { calcularStock, bloquearInsumo } from "../helpers/calcularStock.js";
import { createError } from "../utils/createError.js";

export async function egresarInsumo(req, res, next) {
    // Iniciamos la transacción
    const t = await sequelize.transaction();

    try {
        const { servicioId, items } = req.body;

        if (!servicioId || !items?.length) {
            throw createError("Datos incompletos", 400, "MISSING_DATA");
        }

        // Validamos cada item: insumoId presente y cantidad numérica > 0.
        // Sin esto se podía cargar un egreso con cantidad 0, negativa o no
        // numérica, corrompiendo el cálculo de stock (el bulkCreate no
        // corre las validaciones del modelo salvo que se le pida explícitamente).
        for (const item of items) {
            if (!item.insumoId || !Number.isInteger(item.cantidad) || item.cantidad <= 0) {
                throw createError(
                    `Item inválido: insumoId y cantidad (entero mayor a 0) son obligatorios`,
                    400,
                    "INVALID_ITEM"
                );
            }
        }

        // Agrupamos por insumoId: si el mismo insumo viene repetido en dos
        // renglones del mismo request, hay que validar el stock contra la
        // suma total pedida, no contra cada renglón por separado (si no,
        // dos renglones de 5 con stock=5 pasaban la validación cada uno
        // por separado y el egreso terminaba dejando el stock en negativo).
        const cantidadPorInsumo = new Map();
        for (const item of items) {
            cantidadPorInsumo.set(
                item.insumoId,
                (cantidadPorInsumo.get(item.insumoId) || 0) + item.cantidad
            );
        }

        for (const [insumoId, cantidadTotal] of cantidadPorInsumo) {
            // Bloqueamos este insumo hasta que termine la transacción, para
            // que un egreso concurrente del mismo insumo no pueda leer el
            // stock "viejo" antes de que este commitee o haga rollback.
            await bloquearInsumo(insumoId, t);

            const stockActual = await calcularStock(insumoId, { transaction: t });

            if (cantidadTotal > stockActual) {
                throw createError(`Stock insuficiente para el insumo ${insumoId}`, 409, "INSUFFICIENT_STOCK");
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
