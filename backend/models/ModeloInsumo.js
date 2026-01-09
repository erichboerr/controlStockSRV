// models/ModeloInsumo.js
import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const ModeloInsumo = sequelize.define(
  "ModeloInsumo",
  {
    modeloId: { type: DataTypes.INTEGER, allowNull: false },
    insumoId: { type: DataTypes.INTEGER, allowNull: false },
  },
  {
    tableName: "modelo_insumo",
    freezeTableName: true,
    timestamps: false,
  }
);

export default ModeloInsumo;