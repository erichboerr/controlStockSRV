import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const ImpresoraFisica = sequelize.define(
  "ImpresoraFisica",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    numeroSerie: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    remito: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    proveedorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    impresoraId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    flagHabilitado: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    fechaBaja: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: "impresora_fisica",
    freezeTableName: true,
    timestamps: true,
    paranoid: true,
  }
);

export default ImpresoraFisica;
