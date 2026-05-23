module.exports = {
  apps: [
    {
      name: "controlStock-backend",
      script: "./server.js",
      instances: 1,
      exec_mode: "fork",
      env: {
        NODE_ENV: "development",
        PORT: 3000,
        DB_NAME: "controlstock_dev",
        DB_USER: "erich",
        DB_PASS: "",
        DB_SYNC: "true",
        DB_SEED: "true"
      },
      env_production: {
        NODE_ENV: "production",
        PORT: 3000,
        DB_NAME: "controlstock",
        DB_USER: "erich",
        DB_PASS: "",
        DB_HOST: "127.0.0.1",
        DB_PORT: 5432,
        DB_SYNC: "false",
        DB_SEED: "false",
        JWT_SECRET: "",
        BACKEND_URL: "http://intranet.local",
        FRONTEND_URL: "http://intranet.local"
      }
    }
  ]
};