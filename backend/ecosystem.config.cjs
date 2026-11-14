const path = require("path");

module.exports = {
  apps: [
    {
      name: "controlStock-backend",
      script: "./server.js",
      // Ancla el cwd de PM2 a esta misma carpeta (backend/), sin importar
      // desde dónde se haya corrido "pm2 start ecosystem.config.cjs".
      // Junto con loadEnv.js (que ancla la carga de .env de la misma
      // forma), esto saca cualquier dependencia del directorio desde el
      // que se lance el proceso.
      cwd: __dirname,
      env: {
        NODE_ENV: "development",
      },
      env_production: {
        // Solo NODE_ENV acá: el resto de las variables (DB_*, JWT_SECRET,
        // BACKEND_URL, FRONTEND_URL) las toma server.js de .env.production
        // vía dotenv-flow (ver config/loadEnv.js). Antes estaban
        // hardcodeadas acá mismo, en texto plano, en un archivo que NO
        // está en .gitignore -> si este archivo se llegara a commitear,
        // la contraseña real de la base y el JWT_SECRET de producción
        // quedarían expuestos en el historial de git para siempre.
        NODE_ENV: "production",
      },
      // Logs propios de PM2 (stdout/stderr del proceso), separados de los
      // logs de la app (backend/logs/combined.log, con rotación propia).
      out_file: path.join(__dirname, "logs", "pm2-out.log"),
      error_file: path.join(__dirname, "logs", "pm2-error.log"),
      time: true,
      // No reiniciar en loop infinito si el proceso se cae apenas arranca
      // (por ejemplo, por una migración pendiente o la base caída).
      max_restarts: 10,
      min_uptime: "10s",
      // Si por algún motivo el proceso empieza a pérder memoria sin
      // control, que se reinicie solo antes de tumbar el servidor entero.
      max_memory_restart: "300M",
      watch: false,
    },
  ],
};
