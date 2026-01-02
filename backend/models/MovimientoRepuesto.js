import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

  const MovimientoRepuesto = sequelize.define(
    "MovimientoRepuesto",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      tipo: {
        type: DataTypes.ENUM("ingreso", "egreso"),
        allowNull: false,
      },
      cantidad: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: { min: 1 },
      },
      fecha: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      repuestoId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      proveedorId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      remito: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      servicioId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      flagHabilitado: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      tableName: "movimiento_repuesto",
      freezeTableName: true,
      timestamps: true,
      paranoid: true,
    }
  );

 export default MovimientoRepuesto;