import sequelize from "../config/db.js";
import models from "../models/index.js";
import { proveedores } from "./data/proveedores.data.js";

const { Proveedor } = models;

export async function seed_proveedores({ closeConnection = true } = {}) {
  try {
    await sequelize.authenticate();
    console.log("✅ Conectado a la base");

    await Proveedor.bulkCreate(proveedores, { ignoreDuplicates: true });
    await sequelize.query(
      "SELECT setval('proveedores_id_seq', (SELECT MAX(id) FROM proveedores))"
    );
    console.log("✅ Proveedores cargados");
  } catch (err) {
    console.error("❌ Error en el seeder de proveedores:", err);
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
  seed_proveedores();
}

/* Lo corremos con: node seed_proveedores.js */
