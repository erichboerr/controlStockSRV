module.exports = {
  apps: [
    {
      name: "controlStock-backend",
      script: "./server.js",
      instances: 1, // o "max" si querés cluster mode
      exec_mode: "fork", // o "cluster" si usás varias instancias
      env: {
        NODE_ENV: "development",
        PORT: 3000,
        DB_NAME: "controlstock_dev",
        DB_USER: "erich",
        DB_PASS: "dev_password",
        DB_SYNC: "true",
        DB_SEED: "true"
      },
      env_production: {
        NODE_ENV: "production",
        PORT: 3000,
        DB_NAME: "controlstock",
        DB_USER: "erich",
        DB_PASS: "Locuras438",
        DB_HOST: "127.0.0.1",
        DB_PORT: 5432,
        DB_SYNC: "false",
        DB_SEED: "false",
        JWT_SECRET: "3f9d8a7c-2b1e-4c6a-9d2f-8a1b2c3d4e5f",
        BACKEND_URL: "http://intranet.local",
        FRONTEND_URL: "http://intranet.local"
      }
    }
  ]
};
