"use strict";
const { DataTypes } = require("sequelize");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("servicios", {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      servicio: { type: Sequelize.STRING, allowNull: false, unique: true },
      flagHabilitado: { type: Sequelize.BOOLEAN, defaultValue: true },
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
    await queryInterface.dropTable("servicios");
  },
};
