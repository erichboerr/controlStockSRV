import sequelize from "../config/db.js";
import models from "../models/index.js";

import { marcas } from "./data/marcas.data.js";
import { modelos } from "./data/modelos.data.js";
import { insumos } from "./data/insumos.data.js";
import { modelosInsumos } from "./data/modelosInsumos.data.js";
import { proveedores } from "./data/proveedores.data.js";
import { servicios } from "./data/servicios.data.js";
import { impresoras } from "./data/impresoras.data.js";
import { impresoraFisica } from "./data/impresorasFisicas.data.js";
import { impresoraServicio } from "./data/impresoraServicio.data.js";
import { Repuestos } from "./data/repuestos.data.js";

const {
  Marca,
  Modelo,
  Insumo,
  ModeloInsumo,
  Servicio,
  Proveedor,
  Impresora,
  ImpresoraFisica,
  ImpresoraServicio,
  Repuesto,
} = models;

// closeConnection=false cuando se llama desde server.js al arrancar: la
// conexión de sequelize es compartida con el resto de la app, así que acá
// NO hay que cerrarla (antes se cerraba siempre, sin importar quién
// llamaba, y el servidor se quedaba sin conexión a la base segundos
// después de arrancar).
export async function seed_inicial({ closeConnection = true } = {}) {
  try {
    await sequelize.authenticate();
    console.log("✅ Conectado a la base");

    await Proveedor.bulkCreate(proveedores, { ignoreDuplicates: true });
    await sequelize.query(
      "SELECT setval('proveedores_id_seq', (SELECT MAX(id) FROM proveedores))"
    );
    console.log("✅ Proveedores cargados");

    await Servicio.bulkCreate(servicios, { ignoreDuplicates: true });
    await sequelize.query(
      "SELECT setval('servicios_id_seq', (SELECT MAX(id) FROM servicios))"
    );
    console.log("✅ Servicios cargados");

    await Marca.bulkCreate(marcas, { ignoreDuplicates: true });
    await sequelize.query(
      "SELECT setval('marcas_id_seq', (SELECT MAX(id) FROM marcas))"
    );
    console.log("✅ Marcas cargadas");

    await Modelo.bulkCreate(modelos, { ignoreDuplicates: true });
    await sequelize.query(
      "SELECT setval('modelos_id_seq', (SELECT MAX(id) FROM modelos))"
    );
    console.log("✅ Modelos cargados");

    await Insumo.bulkCreate(insumos, { ignoreDuplicates: true });
    await sequelize.query(
      "SELECT setval('insumos_id_seq', (SELECT MAX(id) FROM insumos))"
    );
    console.log("✅ insumos cargados");

    await ModeloInsumo.bulkCreate(modelosInsumos, { ignoreDuplicates: true });
    console.log("✅ modelos insumos cargados");

    await Impresora.bulkCreate(impresoras, { ignoreDuplicates: true });
    await sequelize.query(
      "SELECT setval('impresoras_id_seq', (SELECT MAX(id) FROM impresoras))"
    );
    console.log("✅ Impresoras cargadas");

    await ImpresoraFisica.bulkCreate(impresoraFisica, {
      ignoreDuplicates: true,
    });
    await sequelize.query(
      "SELECT setval(pg_get_serial_sequence('impresora_Fisica','id'), (SELECT MAX(id) FROM impresora_Fisica));"
    );
    console.log("✅ Impresoras físicas cargadas");

    await ImpresoraServicio.bulkCreate(impresoraServicio, {
      ignoreDuplicates: true,
    });
    await sequelize.query(
      "SELECT setval(pg_get_serial_sequence('impresora_servicio','id'), (SELECT MAX(id) FROM impresora_servicio));"
    );
    console.log("✅ Impresoras asignadas a servicios (excel)");

    await Repuesto.bulkCreate(Repuestos, {
      ignoreDuplicates: true,
    });
    await sequelize.query(
      "SELECT setval(pg_get_serial_sequence('repuestos','id'), (SELECT MAX(id) FROM repuestos));"
    );
    console.log("✅ Repuestos cargados");
  } catch (err) {
    console.error("❌ Error en el seeder:", err);
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
  seed_inicial();
}

/* Lo corremos con: node seed_inicial.js */
