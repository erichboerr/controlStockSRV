import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Modelo = sequelize.define(
  "Modelo",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    modelo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    marcaId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    flagHabilitado: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    tableName: "modelos", // fuerza minúscula
    freezeTableName: true, // evita pluralización automática
    timestamps: true,
    paranoid: true,
    indexes: [
      {
        unique: true,
        fields: ["modelo", "marcaId"],
      },
    ],
  }
);

export default Modelo;
