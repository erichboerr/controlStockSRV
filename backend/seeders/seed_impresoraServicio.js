import sequelize from "../config/db.js";
import models from "../models/index.js";
import { impresoraServicio } from "./data/impresoraServicio.data.js";

const { ImpresoraServicio } = models;

// Requiere que "servicios" y "impresora_fisica" ya tengan cargados los
// servicioId / impresoraFisicaId que referencia este archivo. Si vas a
// correr esto solo, asegurate de haber corrido antes seed_servicios.js
// y seed_impresorasFisicas.js.
export async function seed_impresoraServicio({ closeConnection = true } = {}) {
  try {
    await sequelize.authenticate();
    console.log("✅ Conectado a la base");

    await ImpresoraServicio.bulkCreate(impresoraServicio, {
      ignoreDuplicates: true,
    });
    await sequelize.query(
      "SELECT setval(pg_get_serial_sequence('impresora_servicio','id'), (SELECT MAX(id) FROM impresora_servicio));"
    );
    console.log("✅ Impresoras asignadas a servicios cargadas");
  } catch (err) {
    console.error("❌ Error en el seeder de impresora servicio:", err);
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
  seed_impresoraServicio();
}

/* Lo corremos con: node seed_impresoraServicio.js */
