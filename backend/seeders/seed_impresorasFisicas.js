import sequelize from "../config/db.js";
import models from "../models/index.js";
import { impresoraFisica } from "./data/impresorasFisicas.data.js";

const { ImpresoraFisica } = models;

// Requiere que la tabla "impresoras" (marca+modelo) ya tenga cargados
// los impresoraId que referencia este archivo. Si vas a correr esto
// solo, asegurate de haber corrido antes seed_impresoras.js.
export async function seed_impresorasFisicas({ closeConnection = true } = {}) {
  try {
    await sequelize.authenticate();
    console.log("✅ Conectado a la base");

    await ImpresoraFisica.bulkCreate(impresoraFisica, {
      ignoreDuplicates: true,
    });
    await sequelize.query(
      "SELECT setval(pg_get_serial_sequence('impresora_Fisica','id'), (SELECT MAX(id) FROM impresora_Fisica));"
    );
    console.log("✅ Impresoras físicas cargadas");
  } catch (err) {
    console.error("❌ Error en el seeder de impresoras físicas:", err);
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
  seed_impresorasFisicas();
}

/* Lo corremos con: node seed_impresorasFisicas.js */
