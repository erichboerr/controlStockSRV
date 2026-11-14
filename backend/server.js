import './config/loadEnv.js';

import { ensureDatabaseExists } from './config/db-check.js';
import sequelize from './config/db.js';
import app from './app.js';
import './models/index.js';
import { cargarSeeds } from './seeders/cargarSeeds.js';
import { seed_inicial } from './seeders/seed_inicial.js';
import { seed_usuarios } from './seeders/seed_usuarios.js';
import { seed_proveedores } from './seeders/seed_proveedores.js';
import { seed_servicios } from './seeders/seed_servicios.js';
import { seed_marcas } from './seeders/seed_marcas.js';
import { seed_modelos } from './seeders/seed_modelos.js';
import { seed_insumos } from './seeders/seed_insumos.js';
import { seed_modelosInsumos } from './seeders/seed_modelosInsumos.js';
import { seed_impresoras } from './seeders/seed_impresoras.js';
import { seed_impresorasFisicas } from './seeders/seed_impresorasFisicas.js';
import { seed_impresoraServicio } from './seeders/seed_impresoraServicio.js';
import { seed_repuestos } from './seeders/seed_repuestos.js';

const PORT = process.env.PORT || 5050;

/*console.log("NODE_ENV =", process.env.NODE_ENV);
console.log("DB_SEED =", process.env.DB_SEED);
console.log("DB_SYNC =", process.env.DB_SYNC);*/

// Mapeo nombre de tabla -> función seeder, para poder elegir por env var
// (SEED_TABLE). Antes este mapa estaba armado pero nunca se usaba en
// ningún lado: no había forma real de correr "un solo seeder" desde acá.
const seedersPorTabla = {
  usuarios: seed_usuarios,
  proveedores: seed_proveedores,
  servicios: seed_servicios,
  marcas: seed_marcas,
  modelos: seed_modelos,
  insumos: seed_insumos,
  modelosInsumos: seed_modelosInsumos,
  impresoras: seed_impresoras,
  impresorasFisicas: seed_impresorasFisicas,
  impresoraServicio: seed_impresoraServicio,
  repuestos: seed_repuestos,
};

async function ejecutarSeeders() {
  const tabla = process.env.SEED_TABLE;

  //correr  SEED_TABLE=<nombre_tabla> DB_SEED=true npm run dev

  if (tabla) {
    const seeder = seedersPorTabla[tabla];
    if (!seeder) {
      throw new Error(
        `SEED_TABLE="${tabla}" no es válido. Opciones: ${Object.keys(seedersPorTabla).join(", ")}`
      );
    }
    console.log(`🌱 Ejecutando seeder individual: ${tabla}...`);
    await seeder({ closeConnection: false });
    console.log(`🌱 Seeder de "${tabla}" cargado`);
    return;
  }

  console.log("🌱 Ejecutando seeders...");
  await cargarSeeds();
  await seed_inicial({ closeConnection: false });
  console.log("🌱 Seeders cargados");
}

async function startServer() {
  try {
    // Verificar que la base exista
    await ensureDatabaseExists();

    // Autenticar conexión
    await sequelize.authenticate();
    console.log('✅ Conexión establecida con la base de datos');

    // Sincronizar si está habilitado (recrea las tablas, ¡ojo en producción!)
    if (String(process.env.DB_SYNC).toLowerCase() === 'true') {
      await sequelize.sync({ force: true });
      console.log('🧬 Base sincronizada');
    }

    // Cargar seeds si está habilitado. Con SEED_TABLE=<nombre> se puede
    // sembrar una sola tabla (ver seedersPorTabla más arriba) en vez de
    // correr todo el paquete completo.
    if (String(process.env.DB_SEED).toLowerCase() === "true") {
      await ejecutarSeeders();
    }

    // Levantar servidor
    const server = app.listen(PORT, () => {
      console.log(
        `🚀 Servidor escuchando en puerto ${PORT} [${process.env.NODE_ENV}]`
      );
    });

    // Manejar cierre ordenado. PM2 puede mandar SIGINT o SIGTERM según la
    // plataforma/config (y un `pm2 stop`/`pm2 restart`/deploy con systemd
    // suele mandar SIGTERM), así que atendemos los dos por las dudas -
    // antes solo se manejaba SIGINT.
    const apagar = async (señal) => {
      console.log(`🛑 Señal ${señal} recibida, cerrando de forma ordenada...`);
      server.close(async () => {
        await sequelize.close();
        process.exit(0);
      });
      // Si algo se cuelga cerrando conexiones HTTP abiertas, no dejamos
      // el proceso colgado para siempre: forzamos la salida.
      setTimeout(() => process.exit(1), 10_000).unref();
    };
    process.on('SIGINT', () => apagar('SIGINT'));
    process.on('SIGTERM', () => apagar('SIGTERM'));
  } catch (err) {
    console.error('❌ Error CRÍTICO:', err.message);
    process.exit(1);
  }
}

startServer();
