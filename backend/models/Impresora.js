import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Impresora = sequelize.define(
  "Impresora",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    marcaId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    modeloId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    flagHabilitado: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    tableName: "impresoras",
    freezeTableName: true,
    timestamps: true,
    paranoid: true,
    indexes: [
      {
        unique: true,
        fields: ["marcaId", "modeloId"],
      },
    ],
  }
);

export default Impresora;
