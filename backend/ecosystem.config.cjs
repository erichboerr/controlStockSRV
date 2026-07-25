module.exports = {
  apps: [
    {
      name: "controlStock-backend",
      script: "./server.js",
      env: {
        NODE_ENV: "development"
      },
      env_production: {
        NODE_ENV: "production"
      }
    }
  ]
};
