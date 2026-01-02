import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Proveedor = sequelize.define(
  "proveedores",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    proveedor: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
        len: [3, 100],
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    telefono: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
        len: [6, 20],
      },
    },
    flagHabilitado: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    tableName: "proveedores",
    freezeTableName: true,
    timestamps: true,
    paranoid: true,
  }
);

export default Proveedor;