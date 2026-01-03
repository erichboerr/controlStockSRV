import dotenv from "dotenv-flow";
dotenv.config(); // Carga automáticamente .env según NODE_ENV

import { ensureDatabaseExists } from "./config/db-check.js";
import sequelize from "./config/db.js";
import app from "./app.js";
import "./models/index.js";
import { cargarSeeds } from "./seeders/cargarSeeds.js";

const PORT = process.env.PORT || 5050;

async function startServer() {
  try {
    // Verificar que la base exista
    await ensureDatabaseExists();

    // Solo sincronizar en desarrollo si está habilitado
    if (process.env.DB_SYNC === "true") {
      await sequelize.sync({ force: true });
      console.log("🧬 Base sincronizada");
    }

    // Cargar seeds si está habilitado
    if (process.env.DB_SEED === "true") {
      await cargarSeeds();
      console.log("🌱 Seeders cargados");
    }

    app.listen(PORT, () => {
      console.log(`🚀 Servidor escuchando en puerto ${PORT} [${process.env.NODE_ENV}]`);
    });
  } catch (err) {
    console.error("❌ Error CRÍTICO:", err.message);
    process.exit(1);
  }
}

startServer();