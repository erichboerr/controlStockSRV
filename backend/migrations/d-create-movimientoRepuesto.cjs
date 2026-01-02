"use strict";
const { DataTypes } = require("sequelize");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("movimiento_repuesto", {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      tipo: {
        type: Sequelize.ENUM("ingreso", "egreso"),
        allowNull: false,
      },
      cantidad: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      fecha: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      repuestoId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "repuestos", key: "id" },
        onDelete: "CASCADE",
      },
      proveedorId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: "proveedores", key: "id" },
        onDelete: "SET NULL",
      },
      remito: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      servicioId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: "servicios", key: "id" },
        onDelete: "SET NULL",
      },
      flagHabilitado: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      deletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("movimiento_repuesto");
  },
};
