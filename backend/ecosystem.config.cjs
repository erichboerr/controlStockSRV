module.exports = {
  apps: [
    {
      name: "controlStock-backend",
      script: "./server.js",
      env: {
        NODE_ENV: "development"
      },
      env_production: {
        NODE_ENV: "production",
        DB_USER: "erich",
        DB_PASS: "Luci@_1949",
        DB_NAME: "controlstock",
        DB_HOST: "127.0.0.1",
        DB_PORT: "5432",
        DB_SYNC: "false",
        DB_SEED: "false",
        JWT_SECRET: "a3f8c2d1e4b5f6yctlalsksuddjeudhdffkfirrjr",
        BACKEND_URL: "http://intranet.local",
        FRONTEND_URL: "http://intranet.local"
      }
    }
  ]
};
