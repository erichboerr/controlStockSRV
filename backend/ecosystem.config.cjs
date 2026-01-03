module.exports = {
  apps: [
    {
      name: "controlStock-backend",
      script: "./server.js",
      env: {
        NODE_ENV: "development",
        PORT: 3000,
        DB_NAME: "controlstock_dev",
        DB_USER: "erich",
        DB_PASS: "dev_password"
      },
      env_production: {
        NODE_ENV: "production",
        PORT: 3000,
        DB_NAME: "controlstock",
        DB_USER: "erich",
        DB_PASS: "Locuras438",
        DB_SYNC: "false",
        DB_SEED: "false"
      }

    }
  ]
};