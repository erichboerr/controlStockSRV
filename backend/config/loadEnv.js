import dotenvFlow from "dotenv-flow";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// dotenv-flow.config() sin "path" resuelve los .env relativo a
// process.cwd(). Este archivo vive en backend/config/, así que
// path.resolve(__dirname, "..") siempre apunta a backend/ (donde están
// .env, .env.production, etc.) sin importar desde qué carpeta se haya
// lanzado el proceso.
//
// Esto es justo lo que rompía los seeders individuales: cada uno se
// pensó para correr como "node seed_marcas.js" parado DENTRO de
// seeders/ (ver el comentario al final de cada archivo). Con
// dotenv.config() a secas, nunca encontraba el .env de backend/ y las
// variables DB_* quedaban undefined -> Sequelize fallaba al conectar.
dotenvFlow.config({ path: path.resolve(__dirname, "..") });
