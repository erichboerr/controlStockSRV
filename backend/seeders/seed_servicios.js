import sequelize from "../config/db.js";
import models from "../models/index.js";
import { servicios } from "./data/servicios.data.js";

const { Servicio } = models;

export async function seed_servicios({ closeConnection = true } = {}) {
  try {
    await sequelize.authenticate();
    console.log("✅ Conectado a la base");

    await Servicio.bulkCreate(servicios, { ignoreDuplicates: true });
    await sequelize.query(
      "SELECT setval('servicios_id_seq', (SELECT MAX(id) FROM servicios))"
    );
    console.log("✅ Servicios cargados");
  } catch (err) {
    console.error("❌ Error en el seeder de servicios:", err);
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
  seed_servicios();
}

/* Lo corremos con: node seed_servicios.js */
