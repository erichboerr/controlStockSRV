import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const ImpresoraServicio = sequelize.define(
  "ImpresoraServicio",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    impresoraFisicaId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    servicioId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    fechaEntrega: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    fechaRetiro: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    flagHabilitado: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    tableName: "impresora_servicio",
    freezeTableName: true,
    timestamps: true,
    paranoid: true,
  }
);

export default ImpresoraServicio;
