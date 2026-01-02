"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("impresoras", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      marcaId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "marcas", key: "id" },
        onDelete: "CASCADE",
      },
      modeloId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "modelos", key: "id" },
        onDelete: "CASCADE",
      },
      flagHabilitado: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      deletedAt: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    });

    await queryInterface.addIndex("impresoras", ["marcaId", "modeloId"], {
      unique: true,
      name: "impresoras_marca_modelo_unique",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("impresoras");
  },
};
