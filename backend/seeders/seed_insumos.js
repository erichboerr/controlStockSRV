import sequelize from "../config/db.js";
import models from "../models/index.js";
import { insumos } from "./data/insumos.data.js";

const { Insumo } = models;

export async function seed_insumos({ closeConnection = true } = {}) {
  try {
    await sequelize.authenticate();
    console.log("✅ Conectado a la base");

    await Insumo.bulkCreate(insumos, { ignoreDuplicates: true });
    await sequelize.query(
      "SELECT setval('insumos_id_seq', (SELECT MAX(id) FROM insumos))"
    );
    console.log("✅ Insumos cargados");
  } catch (err) {
    console.error("❌ Error en el seeder de insumos:", err);
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
  seed_insumos();
}

/* Lo corremos con: node seed_insumos.js */
