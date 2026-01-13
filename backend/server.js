import dotenv from "dotenv-flow";
dotenv.config();

import { ensureDatabaseExists } from "./config/db-check.js";
import sequelize from "./config/db.js";
import app from "./app.js";
import "./models/index.js";
import { cargarSeeds } from "./seeders/cargarSeeds.js";
import { seed_inicial } from "./seeders/seed_inicial.js";

const PORT = process.env.PORT || 5050;

console.log("NODE_ENV =", process.env.NODE_ENV);
console.log("DB_SEED =", process.env.DB_SEED);
console.log("DB_SYNC =", process.env.DB_SYNC);

async function startServer() {
  try {
    // Verificar que la base exista
    await ensureDatabaseExists();

    // Solo sincronizar en desarrollo si está habilitado
    if (String(process.env.DB_SYNC).toLowerCase() === "true") {
      await sequelize.sync({ force: true });
      console.log("🧬 Base sincronizada");
    }

    //await cargarSeeds(); // Cargar seeds básicas
    //await seed_inicial(); // Cargar datos iniciales

    // Cargar seeds si está habilitado
    if (String(process.env.DB_SEED).toLowerCase() === "true") {
      console.log("🌱 Ejecutando seeders...");
      await cargarSeeds();
      await seed_inicial();
      console.log("🌱 Seeders cargados");
    }

    app.listen(PORT, () => {
      console.log(
        `🚀 Servidor escuchando en puerto ${PORT} [${process.env.NODE_ENV}]`
      );
    });
  } catch (err) {
    console.error("❌ Error CRÍTICO:", err.message);
    process.exit(1);
  }
}


startServer();
