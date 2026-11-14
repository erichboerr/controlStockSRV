import sequelize from "../config/db.js";
import models from "../models/index.js";
import { modelosInsumos } from "./data/modelosInsumos.data.js";

const { ModeloInsumo } = models;

export async function seed_modelosInsumos({ closeConnection = true } = {}) {
  try {
    await sequelize.authenticate();
    console.log("✅ Conectado a la base");

    // Nota: modelo_insumo no tiene setval en el seeder original (seed_inicial.js),
    // se mantiene el mismo comportamiento acá.
    await ModeloInsumo.bulkCreate(modelosInsumos, { ignoreDuplicates: true });
    console.log("✅ Modelos insumos cargados");
  } catch (err) {
    console.error("❌ Error en el seeder de modelos insumos:", err);
    throw err;
  } finally {
    if (closeConnection) {
      await sequelize.close();
    }
  }
}

const esEjecucionDirecta =
  process.argv[1] && import.meta.url === `file://${process.argv[1]}`;
if (esEjecucionDirecta) {
  seed_modelosInsumos();
}

/* Lo corremos con: node seed_modelosInsumos.js */
