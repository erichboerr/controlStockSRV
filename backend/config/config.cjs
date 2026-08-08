const path = require("path");
const dotenvFlow = require("dotenv-flow");

// Antes usaba require("dotenv").config(), que solo lee .env (nunca
// .env.production). Como sequelize-cli (migraciones/seeds por CLI) carga
// este archivo, correr "npx sequelize-cli db:migrate" en producción podía
// terminar usando credenciales equivocadas -o directamente sin definir-
// según qué hubiera en el .env "de desarrollo". Usamos dotenv-flow acá
// también, anclado a esta carpeta (backend/), igual que en loadEnv.js.
dotenvFlow.config({ path: path.resolve(__dirname, "..") });

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT || "postgres",
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "postgres",
  },
};
