import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
const Servicio = sequelize.define(
  "servicios",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    servicio: { type: DataTypes.STRING, allowNull: false, unique: true },
    flagHabilitado: { type: DataTypes.BOOLEAN, defaultValue: true },
  },
  {
    tableName: "servicios",
    freezeTableName: true,
    timestamps: true,
    paranoid: true,
  }
);
export default Servicio;
