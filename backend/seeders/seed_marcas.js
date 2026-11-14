import sequelize from "../config/db.js";
import models from "../models/index.js";
import { marcas } from "./data/marcas.data.js";

const { Marca } = models;

export async function seed_marcas({ closeConnection = true } = {}) {
  try {
    await sequelize.authenticate();
    console.log("✅ Conectado a la base");

    await Marca.bulkCreate(marcas, { ignoreDuplicates: true });
    await sequelize.query(
      "SELECT setval('marcas_id_seq', (SELECT MAX(id) FROM marcas))"
    );
    console.log("✅ Marcas cargadas");
  } catch (err) {
    console.error("❌ Error en el seeder de marcas:", err);
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
  seed_marcas();
}

/* Lo corremos con: node seed_marcas.js */
