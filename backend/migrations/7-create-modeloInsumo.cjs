"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("modelo_insumo", {
      modeloId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "modelos", key: "id" },
        onDelete: "CASCADE",
      },
      insumoId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "insumos", key: "id" },
        onDelete: "CASCADE",
      },
    });

    // Opcional: índice único para evitar duplicados
    await queryInterface.addIndex("modelo_insumo", ["modeloId", "insumoId"], {
      unique: true,
      name: "modelo_insumo_modelo_insumo_unique",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("modelo_insumo");
  },
};
