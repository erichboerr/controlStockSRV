"use strict";
const { DataTypes } = require("sequelize");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("modelos", {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      modelo: { type: Sequelize.STRING, allowNull: false },
      marcaId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "marcas", key: "id" },
        onDelete: "CASCADE",
      },
      flagHabilitado: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
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
    await queryInterface.dropTable("modelos");
  },
};
