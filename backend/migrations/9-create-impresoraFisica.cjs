"use strict";
const { DataTypes } = require("sequelize");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("impresora_fisica", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      numeroSerie: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      remito: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      fechaEntrega: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      proveedorId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "proveedores", key: "id" },
        onDelete: "CASCADE",
      },
      impresoraId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "impresoras", key: "id" },
        onDelete: "CASCADE",
      },
      flagHabilitado: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      fechaBaja: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      deletedAt: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("impresora_fisica");
  },
};
