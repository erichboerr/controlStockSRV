import sequelize from "../config/db.js";
import models from "../models/index.js";
import { modelos } from "./data/modelos.data.js";

const { Modelo } = models;

export async function seed_modelos({ closeConnection = true } = {}) {
  try {
    await sequelize.authenticate();
    console.log("✅ Conectado a la base");

    await Modelo.bulkCreate(modelos, { ignoreDuplicates: true });
    await sequelize.query(
      "SELECT setval('modelos_id_seq', (SELECT MAX(id) FROM modelos))"
    );
    console.log("✅ Modelos cargados");
  } catch (err) {
    console.error("❌ Error en el seeder de modelos:", err);
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
  seed_modelos();
}

/* Lo corremos con: node seed_modelos.js */
