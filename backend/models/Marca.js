import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Marca = sequelize.define(
  "Marca",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    marca: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    flagHabilitado: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    tableName: "marcas",
    freezeTableName: true,
    timestamps: true,
    paranoid: true,
  }
);

export default Marca;
