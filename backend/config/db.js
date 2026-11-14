import { Sequelize } from 'sequelize';
import './loadEnv.js';

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,    
    port: process.env.DB_PORT,
    dialect: 'postgres',
    timezone: "-03:00",
    logging: false,
  }
);

export default sequelize;

