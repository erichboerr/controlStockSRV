import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Rol = sequelize.define("roles", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  rol: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  flagHabilitado: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  systemRole: {               
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
}, {
  tableName: "roles",
  freezeTableName: true,
  timestamps: true,
  paranoid: true,
});

export default Rol;
