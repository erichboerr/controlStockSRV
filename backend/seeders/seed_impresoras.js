import sequelize from "../config/db.js";
import models from "../models/index.js";
import { impresoras } from "./data/impresoras.data.js";

const { Impresora } = models;

export async function seed_impresoras({ closeConnection = true } = {}) {
  try {
    await sequelize.authenticate();
    console.log("✅ Conectado a la base");

    await Impresora.bulkCreate(impresoras, { ignoreDuplicates: true });
    await sequelize.query(
      "SELECT setval('impresoras_id_seq', (SELECT MAX(id) FROM impresoras))"
    );
    console.log("✅ Impresoras cargadas");
  } catch (err) {
    console.error("❌ Error en el seeder de impresoras:", err);
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
  seed_impresoras();
}

/* Lo corremos con: node seed_impresoras.js */
