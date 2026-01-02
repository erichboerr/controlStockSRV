"use strict";
const { DataTypes } = require("sequelize");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("impresora_servicio", {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      impresoraFisicaId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "impresora_fisica", key: "id" },
        onDelete: "CASCADE",
      },
      servicioId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "servicios", key: "id" },
        onDelete: "CASCADE",
      },
      fechaEntrega: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      fechaRetiro: {
        type: Sequelize.DATE,
        allowNull: true,
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
    await queryInterface.dropTable("impresora_servicio");
  },
};
