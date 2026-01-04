import sequelize from "../config/db.js";
import models from "../models/index.js";

const { Marca, Modelo } = models;


export async function seed_inicial() {
  const marcas = [
    { marca: "HP" },
    { marca: "XEROX" },
    { marca: "BROTHER" },
    { marca: "LEXMARK" },
    { marca: "KYOCERA" },
    { marca: "SAMSUNG" },
    { marca: "RICOH" },
  ];

  const modelos = [
    { modelo: "1102W", marcaId: 1 },
    { modelo: "1606DN", marcaId: 1 },
    { modelo: "2205N", marcaId: 1 },
    { modelo: "5L/6L/6100/3150", marcaId: 1 },
    { modelo: "1010/12/15/20/22", marcaId: 1 },
    { modelo: "M401 PRO", marcaId: 1 },
    { modelo: "201DN", marcaId: 1 },
    { modelo: "P1005/P1006", marcaId: 1 },
    { modelo: "PHASER 3225/3260", marcaId: 2 },
    { modelo: "WorkCentre 6505DN", marcaId: 2 },
    { modelo: "WorkCentre 3615", marcaId: 2 },
    { modelo: "PHASER 4600DN", marcaId: 2 },
    { modelo: "3550", marcaId: 2 },
    { modelo: "5225/5230", marcaId: 2 },
    { modelo: "HL-1100/DCP1617NW", marcaId: 3 },
    { modelo: "HL-2200", marcaId: 3 },
    { modelo: "HL-5350DN", marcaId: 3 },
    { modelo: "E250DN/E350DN", marcaId: 4 },
    { modelo: "1320", marcaId: 1 },
    { modelo: "ECOSYS P3055DN", marcaId: 5 },
    { modelo: "M521DN", marcaId: 1 },
    { modelo: "P2055DN", marcaId: 1 },
    { modelo: "WorkCentre 6515DN", marcaId: 2 },
    { modelo: "SL-M4072FD", marcaId: 6 },
    { modelo: "ECOSYS M5521CDW", marcaId: 5 },
    { modelo: "ML2525", marcaId: 3 },
    { modelo: "P1505", marcaId: 1 },
    { modelo: "LASERJET M12W", marcaId: 1 },
    { modelo: "ECOSYS P2235DN", marcaId: 5 },
    { modelo: "E260DN", marcaId: 3 },
    { modelo: "PHASER 3260", marcaId: 2 },
    { modelo: "SP3710DN", marcaId: 7 },
    { modelo: "B210/B215", marcaId: 2 },
    { modelo: "HL-1200", marcaId: 3 },
    { modelo: "P800", marcaId: 7 },
    { modelo: "M320F", marcaId: 7 },
    { modelo: "P311", marcaId: 7 },
    { modelo: "3345", marcaId: 2 },
    { modelo: "LASER 107W", marcaId: 1 },
    { modelo: "B230", marcaId: 2 },
    { modelo: "B610DN", marcaId: 2 },
    { modelo: "B415", marcaId: 2 },
    { modelo: "PHASER 3020", marcaId: 2 },
    { modelo: "B8075", marcaId: 2 },
  ];

  async function runSeeder() {
    try {
      await sequelize.authenticate();
      console.log("✅ Conectado a la base");

      await Marca.bulkCreate(marcas, { ignoreDuplicates: true });
      console.log("✅ Marcas cargadas");

      await Modelo.bulkCreate(modelos, { ignoreDuplicates: true });
      console.log("✅ Modelos cargados");

      await sequelize.close();
    } catch (err) {
      console.error("❌ Error en el seeder:", err);
    }
  }

  runSeeder();
}

/*Lo corremos con: node seed_inicial.js*/
