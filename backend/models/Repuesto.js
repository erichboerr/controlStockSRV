import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Repuesto = sequelize.define(
  "Repuesto",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    repuesto: {
      type: DataTypes.STRING,
      allowNull: false,
    }, 
    stock_minimo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 3
    },    
    flagHabilitado: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    tableName: "repuestos",
    freezeTableName: true,
    timestamps: true,
    paranoid: true,
  }
);

export default Repuesto;
