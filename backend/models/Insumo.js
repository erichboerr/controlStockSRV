import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Insumo = sequelize.define(
  "Insumo",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    insumo: {
      type: DataTypes.STRING,
      allowNull: false,
    }, 
    stock_minimo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 5
    },    
    flagHabilitado: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    tableName: "insumos",
    freezeTableName: true,
    timestamps: true,
    paranoid: true,
  }
);

export default Insumo;
