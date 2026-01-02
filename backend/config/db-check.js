import { Client } from "pg";
import dotenv from "dotenv";
dotenv.config();

export async function ensureDatabaseExists() {
  const { DB_HOST, DB_PORT, DB_USER, DB_PASS, DB_NAME } = process.env;

  if (typeof DB_PASS !== "string" || !DB_PASS.trim()) {
    throw new Error("DB_PASS inválido o no definido");
  }

  const client = new Client({
    user: DB_USER,
    host: DB_HOST,
    database: "postgres",
    password: DB_PASS,
    port: parseInt(DB_PORT),
  });

  try {
    await client.connect();
    console.log(`✅ Conectado a la DB 'postgres' para verificación.`);

    const res = await client.query(
      `SELECT 1 FROM pg_database WHERE datname = '${DB_NAME}'`
    );

    if (res.rows.length === 0) {
      console.log(`⚠️ La base '${DB_NAME}' no existe. Creándola...`);
      await client.query(`CREATE DATABASE "${DB_NAME}"`);
      console.log(`✨ Base '${DB_NAME}' creada con éxito.`);
    } else {
      console.log(`✅ Base '${DB_NAME}' ya existe.`);
    }
  } catch (error) {
    console.error("❌ Error al verificar/crear la base:", error.message);
    throw new Error("Fallo crítico al preparar la base de datos.");
  } finally {
    await client.end();
  }
}
