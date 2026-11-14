import sequelize from "../config/db.js";
import models from "../models/index.js";
import { Repuestos } from "./data/repuestos.data.js";

const { Repuesto } = models;

export async function seed_repuestos({ closeConnection = true } = {}) {
  try {
    await sequelize.authenticate();
    console.log("✅ Conectado a la base");

    await Repuesto.bulkCreate(Repuestos, { ignoreDuplicates: true });
    await sequelize.query(
      "SELECT setval(pg_get_serial_sequence('repuestos','id'), (SELECT MAX(id) FROM repuestos));"
    );
    console.log("✅ Repuestos cargados");
  } catch (err) {
    console.error("❌ Error en el seeder de repuestos:", err);
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
  seed_repuestos();
}

/* Lo corremos con: node seed_repuestos.js */
