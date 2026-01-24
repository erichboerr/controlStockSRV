"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("servicios", {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
      servicio: { type: Sequelize.STRING, allowNull: false, unique: true },
      flagHabilitado: { type: Sequelize.BOOLEAN, defaultValue: true },
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
      await queryInterface.dropTable("servicios");
    },
};
