import sequelize from "../config/db.js";
import models from "../models/index.js";

const {
  Marca,
  Modelo,
  Insumo,
  ModeloInsumo,
  Servicio,
  Proveedor,
  Impresora,
  ImpresoraFisica,
  Repuesto,
} = models;

export async function seed_inicial() {
  // =======================
  // MARCAS
  // =======================
  const marcas = [
    { id: 1, marca: "HP" },
    { id: 2, marca: "XEROX" },
    { id: 3, marca: "BROTHER" },
    { id: 4, marca: "LEXMARK" },
    { id: 5, marca: "KYOCERA" },
    { id: 6, marca: "SAMSUNG" },
    { id: 7, marca: "RICOH" },
  ];

  // =======================
  // MODELOS (IDs explícitos)
  // =======================
  const modelos = [
    { id: 1, modelo: "LASERJET 1102W", marcaId: 1 },
    { id: 2, modelo: "LASERJET 1606DN", marcaId: 1 },
    { id: 3, modelo: "LASERJET 2205N", marcaId: 1 },
    { id: 4, modelo: "LASERJET 5L/6L", marcaId: 1, flagHabilitado: false },
    { id: 5, modelo: "LASERJET 1010/12/15/20/22", marcaId: 1 },
    { id: 6, modelo: "LASERJET M401 PRO", marcaId: 1 },
    { id: 7, modelo: "LASERJET PRO 201DW", marcaId: 1 },
    { id: 8, modelo: "LASERJET P1005/P1006", marcaId: 1 },
    { id: 9, modelo: "LASERJET 1320", marcaId: 1, flagHabilitado: false },
    { id: 10, modelo: "LASERJET PRO M521DN", marcaId: 1 },
    { id: 11, modelo: "LASERJET P2055DN", marcaId: 1, flagHabilitado: false },
    { id: 12, modelo: "LASERJET P1505", marcaId: 1 },
    { id: 13, modelo: "LASERJET M12W", marcaId: 1 },
    { id: 14, modelo: "LASERJET 107W", marcaId: 1 },
    { id: 15, modelo: "PHASER 3225/3260", marcaId: 2 },
    { id: 16, modelo: "PHASER 3020", marcaId: 2 },
    { id: 17, modelo: "PHASER 4600DN", marcaId: 2 },
    { id: 18, modelo: "WorkCentre 6505DN", marcaId: 2 },
    { id: 19, modelo: "WorkCentre 3615DN", marcaId: 2 },
    { id: 20, modelo: "WorkCentre 3345DN", marcaId: 2 },
    { id: 21, modelo: "WorkCentre 3550DN", marcaId: 2 },
    { id: 22, modelo: "WorkCentre 5225/5230DN", marcaId: 2 },
    { id: 23, modelo: "WorkCentre 6515DN", marcaId: 2 },
    { id: 24, modelo: "VersaLink B210/B215", marcaId: 2 },
    { id: 25, modelo: "VersaLink B230DN", marcaId: 2 },
    { id: 26, modelo: "VersaLink B415DN", marcaId: 2 },
    { id: 27, modelo: "VersaLink B610DN", marcaId: 2 },
    { id: 28, modelo: "VersaLink B8075DN", marcaId: 2 },
    { id: 29, modelo: "HL-1100/DCP1617NW", marcaId: 3 },
    { id: 30, modelo: "HL-2200", marcaId: 3 },
    { id: 31, modelo: "HL-5350DN", marcaId: 3 },
    { id: 32, modelo: "HL-1200", marcaId: 3 },
    { id: 33, modelo: "E260DN", marcaId: 4 },
    { id: 34, modelo: "E250DN/E350DN", marcaId: 4 },
    { id: 35, modelo: "ECOSYS P3055DN", marcaId: 5 },
    { id: 36, modelo: "ECOSYS M5521CDW", marcaId: 5 },
    { id: 37, modelo: "ECOSYS P2235DN", marcaId: 5 },
    { id: 38, modelo: "SL-M4072FD", marcaId: 6 },
    { id: 39, modelo: "ML-2525", marcaId: 6 },
    { id: 40, modelo: "SP3710DN", marcaId: 7 },
    { id: 41, modelo: "P800", marcaId: 7 },
    { id: 42, modelo: "M320F", marcaId: 7 },
    { id: 43, modelo: "P311", marcaId: 7 },
  ];

  const insumos = [
    { id: 1, insumo: "85A TONER", stock_minimo: 5 }, //1
    { id: 2, insumo: "78A TONER", stock_minimo: 5 }, //2
    { id: 3, insumo: "05A TONER", stock_minimo: 5, flagHabilitado: false }, //3
    { id: 4, insumo: "06A TONER", stock_minimo: 5, flagHabilitado: false }, //4
    { id: 5, insumo: "12A TONER", stock_minimo: 5 }, //5
    { id: 6, insumo: "80A TONER", stock_minimo: 5 }, //6
    { id: 7, insumo: "83A TONER", stock_minimo: 5 }, //7
    { id: 8, insumo: "35A TONER", stock_minimo: 5, flagHabilitado: false }, //8
    { id: 9, insumo: "49A TONER", stock_minimo: 5, flagHabilitado: false }, //9
    { id: 10, insumo: "55A TONER", stock_minimo: 5, flagHabilitado: false }, //10
    { id: 11, insumo: "36A TONER", stock_minimo: 5, flagHabilitado: false }, //11
    { id: 12, insumo: "79A TONER", stock_minimo: 5 }, //12
    { id: 13, insumo: "105A / 1105A TONER", stock_minimo: 5 }, //13
    { id: 14, insumo: "106R02778 TONER", stock_minimo: 5 }, //14
    { id: 15, insumo: "101R474 DRUM", stock_minimo: 3 }, //15
    { id: 16, insumo: "106R02773 TONER", stock_minimo: 5 }, //16
    { id: 17, insumo: "106R1536 TONER", stock_minimo: 5 }, //17
    { id: 18, insumo: "113R00762 DRUM", stock_minimo: 3 }, //18
    {
      id: 19,
      insumo: "115R00070 FUSOR XEROX 4600",
      stock_minimo: 0,
      flagHabilitado: false,
    }, //19
    {
      id: 20,
      insumo: "106R01601 CYAN TONER",
      stock_minimo: 2,
      flagHabilitado: false,
    }, //20
    {
      id: 21,
      insumo: "106R01602 RED TONER",
      stock_minimo: 2,
      flagHabilitado: false,
    }, //21
    {
      id: 22,
      insumo: "106R01603 AMARILLO TONER",
      stock_minimo: 2,
      flagHabilitado: false,
    }, //22
    {
      id: 23,
      insumo: "106R01604 BLACK TONER",
      stock_minimo: 2,
      flagHabilitado: false,
    }, //23
    {
      id: 24,
      insumo: "676K05360 XEROX 6505 DRUM",
      stock_minimo: 0,
      flagHabilitado: false,
    }, //24
    { id: 25, insumo: "106R02732 TONER", stock_minimo: 5 }, //25
    { id: 26, insumo: "113R00773 DRUM", stock_minimo: 3 }, //26
    { id: 27, insumo: "106R03623 TONER", stock_minimo: 5 }, //27
    { id: 28, insumo: "999W3550 TONER", stock_minimo: 5 }, //28
    { id: 29, insumo: "106R1501 DRUM", stock_minimo: 3 }, //29
    { id: 30, insumo: "106R01305 TONER", stock_minimo: 5 }, //30
    { id: 31, insumo: "101R0435 DRUM", stock_minimo: 3 }, //31
    {
      id: 32,
      insumo: "106R03478 MAGENTA TONER (XL)",
      stock_minimo: 2,
      flagHabilitado: false,
    }, //32
    {
      id: 33,
      insumo: "106R03479 AMARILLO TONER (XL)",
      stock_minimo: 2,
      flagHabilitado: false,
    }, //33
    {
      id: 34,
      insumo: "106R03477 CYAN TONER (XL)",
      stock_minimo: 2,
      flagHabilitado: false,
    }, //34
    {
      id: 35,
      insumo: "106R03480 NEGRO TONER (XL)",
      stock_minimo: 3,
      flagHabilitado: false,
    }, //35
    {
      id: 36,
      insumo: "108R01416 CART. RESIDUOS XEROX 6515",
      stock_minimo: 1,
    }, //36
    { id: 37, insumo: "106R04347 B210/B215 TONER", stock_minimo: 5 }, //37
    { id: 38, insumo: "101R00664 B210/B215 DRUM", stock_minimo: 2 }, //38
    {
      id: 39,
      insumo: "006R04404 / B230 TONER",
      stock_minimo: 5,
    }, //39
    { id: 40, insumo: "013R00691 / B230 DRUM", stock_minimo: 2 }, //40
    { id: 41, insumo: "6R04730 / B415 TONER", stock_minimo: 5 }, //41
    { id: 42, insumo: "013R00702 / B415 DRUM", stock_minimo: 2 }, //42
    {
      id: 43,
      insumo: "106R03945 / B610 TONER",
      stock_minimo: 5,
    }, //43
    {
      id: 44,
      insumo: "101R00582 / B610 DRUM",
      stock_minimo: 2,
    }, //44
    {
      id: 45,
      insumo: "006R01683 / B8075 TONER",
      stock_minimo: 5,
    }, //45
    { 
      id: 46, 
      insumo: "013R00675 / B8075 DRUM", 
      stock_minimo: 2, 
    }, //46
    { id: 47, insumo: "TN1060 TONER", stock_minimo: 5 }, //47
    { id: 48, insumo: "DR1060 DRUM", stock_minimo: 2 }, //48
    { id: 49, insumo: "TN450 TONER", stock_minimo: 5 }, //49
    { id: 50, insumo: "DR420 DRUM", stock_minimo: 2 }, //50
    { id: 51, insumo: "TN650 TONER", stock_minimo: 5 }, //51
    { id: 52, insumo: "DR620 DRUM", stock_minimo: 2 }, //52
    { id: 53, insumo: "E260A11L TONER", stock_minimo: 5 }, //53
    { id: 54, insumo: "E260X22G DRUM", stock_minimo: 1 }, //54
    { id: 55, insumo: "E250A11L TONER", stock_minimo: 2, flagHabilitado: false }, //55
    { id: 56, insumo: "E250X22G DRUM", stock_minimo: 2, flagHabilitado: false }, //56
    { id: 57, insumo: "TK-3182 TONER", stock_minimo: 5 }, //57
    { id: 58, insumo: "DK-3192 DRUM", stock_minimo: 2 }, //58
    { id: 59, insumo: "TK-5232K BLACK TONER", stock_minimo: 3 }, //59
    { id: 60, insumo: "TK-5232C CYAN TONER", stock_minimo: 3 }, //60
    { id: 61, insumo: "TK-5232M MAGENTA TONER", stock_minimo: 3, }, //61
    { id: 62, insumo: "TK-5232Y AMARILLO TONER", stock_minimo: 3 }, //62
    { id: 63, insumo: "TK-1150/52 TONER", stock_minimo: 5 }, //63
    { id: 64, insumo: "MLT203 TONER", stock_minimo: 5 }, //64
    { id: 65, insumo: "MLT-D105L TONER", stock_minimo: 2 }, //65
    { id: 66, insumo: "SP3710 TONER", stock_minimo: 5 }, //66
    { id: 67, insumo: "M600 TONER", stock_minimo: 5 }, //67
    { id: 68, insumo: "101R00555 DRUM", stock_minimo: 2 }, //68
    { 
      id: 69, 
      insumo: "108R01417 CYAN DRUM", 
      stock_minimo: 2 
    }, //69
    {
      id: 70,
      insumo: "108R01418 MAGENTA DRUM",
      stock_minimo: 2,
    }, //70
    {
      id: 71,
      insumo: "108R01419 AMARILLO DRUM",
      stock_minimo: 2,
    }, //71
    { 
      id: 72, 
      insumo: "108R01420 NEGRO DRUM", 
      stock_minimo: 2 
    }, //72
    {
      id: 73,
      insumo: "106R3488/92 NEGRO TONER",
      stock_minimo: 3,
    }, //73
    {
      id: 74,
      insumo: "106R3690/94 MAGENTA TONER",
      stock_minimo: 3,
    }, //74
    {
      id: 75,
      insumo: "106R3489/93 CYAN TONER",
      stock_minimo: 3,
    }, //75
    {
      id: 76,
      insumo: "106R3691/95 AMARILLO TONER",
      stock_minimo: 3,
    }, //76
    {
      id: 77,
      insumo: "JC91-01034B FUSOR XEROX 3225",
      stock_minimo: 1,
    }, //77
    {
      id: 78,
      insumo: "115R00085 FUSOR XEROX 3615",
      stock_minimo: 1,
    }, //78
    {
      id: 79,
      insumo: "CBT-CB435A/436A/CE285A/CE278A TONER",
      stock_minimo: 5,
    }, //79
    { id: 80, insumo: "M300/M320 TONER", stock_minimo: 5 },
    { id: 81, insumo: "3020 TONER", stock_minimo: 5 },
  ];

  const modelosInsumos = [
    { modeloId: 1, insumoId: 1 }, // HP LASERJET 1102W - 85A
    { modeloId: 2, insumoId: 2 }, // HP LASERJET 1606DN - 78A
    { modeloId: 3, insumoId: 3 }, // HP LASERJET 2205N - 05A
    { modeloId: 4, insumoId: 4 }, // HP LASERJET 5L/6L - 06A
    { modeloId: 5, insumoId: 5 }, // HP LASERJET 1010/12/15/20/22 - 12A
    { modeloId: 6, insumoId: 6 }, // HP LASERJET M401 PRO - 80A
    { modeloId: 7, insumoId: 7 }, // HP LASERJET PRO 201DW - 83A
    { modeloId: 8, insumoId: 8 }, // HP LASERJET P1005/P1006 - 35A
    { modeloId: 9, insumoId: 9 }, // HP LASERJET 1320 - 49A
    { modeloId: 10, insumoId: 10 }, // HP LASERJET PRO M521DN 55A
    { modeloId: 11, insumoId: 3 }, // HP LASERJET P2055DN - 05A
    { modeloId: 12, insumoId: 11 }, // HP LASERJET P1505 - 36A
    { modeloId: 13, insumoId: 12 }, // HP LASERJET M12W - 79A
    { modeloId: 14, insumoId: 13 }, // HP LASERJET 107W - 105A / 1105A
    { modeloId: 15, insumoId: 14 }, // XEROX PHASER 3225/3260 - 106R02778 TONER
    { modeloId: 15, insumoId: 15 }, // XEROX PHASER 3225/3260 - 101R474 DRUM
    { modeloId: 16, insumoId: 16 }, // XEROX PHASER 3020 - 106R02773 TONER
    { modeloId: 17, insumoId: 17 }, // XEROX PHASER 4600DN - 106R1536 TONER
    { modeloId: 17, insumoId: 18 }, // XEROX PHASER 4600DN - 113R00762 DRUM
    { modeloId: 17, insumoId: 19 }, // XEROX PHASER 4600DN - 115R00070X UNIDAD DE IMAGEN
    { modeloId: 18, insumoId: 20 }, // XEROX WorkCentre 6505DN - 106R01601 CYAN TONER
    { modeloId: 18, insumoId: 21 }, // XEROX WorkCentre 6505DN - 106R01602 RED TONER
    { modeloId: 18, insumoId: 22 }, // XEROX WorkCentre 6505DN - 106R01603 AMARILLO TONER
    { modeloId: 18, insumoId: 23 }, // XEROX WorkCentre 6505DN - 106R01604 BLACK TONER
    { modeloId: 18, insumoId: 24 }, // XEROX WorkCentre 6505DN - 676K05360 UNIDAD DE IMAGEN
    { modeloId: 19, insumoId: 25 }, // XEROX WorkCentre 3615 - 106R02732 TONER
    { modeloId: 19, insumoId: 26 }, // XEROX WorkCentre 3615 - 113R00773 DRUM
    { modeloId: 20, insumoId: 27 }, // XEROX WorkCentre 3345 - 106R03623N TONER
    { modeloId: 20, insumoId: 68 }, // XEROX WorkCentre 3345 - 101R0555N DRUM
    { modeloId: 21, insumoId: 28 }, // XEROX WorkCentre 3550 - 106R01531 TONER
    { modeloId: 21, insumoId: 29 }, // XEROX WorkCentre 3550 - 999W3550 TONER|
    { modeloId: 22, insumoId: 30 }, // XEROX WorkCentre 5225/5230 - 106R01305 TONER
    { modeloId: 22, insumoId: 31 }, // XEROX WorkCentre 5225/5230 - 101R0435 DRUM
    { modeloId: 23, insumoId: 32 }, // XEROX WorkCentre 6515DN - 106R03478 MAGENTA TONER {XL}
    { modeloId: 23, insumoId: 33 }, // XEROX WorkCentre 6515DN - 106R03479 AMARILLO TONER {XL}
    { modeloId: 23, insumoId: 34 }, // XEROX WorkCentre 6515DN - 106R03477 CYAN TONER {XL}
    { modeloId: 23, insumoId: 35 }, // XEROX WorkCentre 6515DN - 106R03480 NEGRO TONER {XL}
    { modeloId: 23, insumoId: 36 }, // XEROX WorkCentre 6515DN - 108R01416 CARTUCHO DE RESIDUOS
    { modeloId: 24, insumoId: 37 }, // XEROX VersaLink B210/B215 - 106R04347 TONER B210/B215
    { modeloId: 24, insumoId: 38 }, // XEROX VersaLink B210/B215 - 101R00664 DRUM B210/B215
    { modeloId: 25, insumoId: 39 }, // XEROX VersaLink B230 - 006R04404 / B230 TONER
    { modeloId: 25, insumoId: 40 }, // XEROX VersaLink B230 - 013R00691 / B230 DRUM
    { modeloId: 26, insumoId: 41 }, // XEROX VersaLink B415 - 6R04730
    { modeloId: 26, insumoId: 42 }, // XEROX VersaLink B415 - 013R00702 / B415 DRUM
    { modeloId: 27, insumoId: 43 }, // XEROX VersaLink B610DN - 106R03945 / B610 TONER
    { modeloId: 27, insumoId: 44 }, // XEROX VersaLink B610DN - 101R00582 / B610 DRUM
    { modeloId: 28, insumoId: 45 }, // XEROX VersaLink B8075 - 006R01683 / B8075 TONER
    { modeloId: 28, insumoId: 46 }, // XEROX VersaLink B8075 - 013R00675 / B8075 DRUM
    { modeloId: 29, insumoId: 47 }, // BROTHER HL-1100/DCP1617NW - TN-1060 TONER
    { modeloId: 29, insumoId: 48 }, // BROTHER HL-1100/DCP1617NW - DR-1060 DRUM
    { modeloId: 30, insumoId: 49 }, // BROTHER HL-2200 - TN450 TONER
    { modeloId: 30, insumoId: 50 }, // BROTHER HL-2200 - DR420 DRUM
    { modeloId: 31, insumoId: 51 }, // BROTHER HL-5350DN - TN650 TONER {XL}
    { modeloId: 31, insumoId: 52 }, // BROTHER HL-5350DN - DR620 DRUM
    { modeloId: 32, insumoId: 48 }, //BROTHER HL-1200 - DR-1060 DRUM
    { modeloId: 33, insumoId: 53 }, // LEXMARK E260DN - E260A11L TONER
    { modeloId: 33, insumoId: 54 }, // LEXMARK E260DN - E260X22G DRUM
    { modeloId: 34, insumoId: 55 }, //LEXMARK E250DN/E350DN - E250A11L
    { modeloId: 34, insumoId: 56 }, //LEXMARK E250DN/E350DN - E250X22G DRUM
    { modeloId: 35, insumoId: 57 }, // KYOCERA ECOSYS P3055DN -  TK-3182 TONER
    { modeloId: 35, insumoId: 58 }, // KYOCERA ECOSYS P3055DN - DK-3192 DRUM
    { modeloId: 36, insumoId: 59 }, // KYOCERA ECOSYS M5521CDW -  TK-5232K BLACK TONER
    { modeloId: 36, insumoId: 60 }, // KYOCERA ECOSYS M5521CDW -  TK-5232C CYAN TONER
    { modeloId: 36, insumoId: 61 }, // KYOCERA ECOSYS M5521CDW -  TK-5232M MAGENTA TONER
    { modeloId: 36, insumoId: 62 }, // KYOCERA ECOSYS M5521CDW -  TK-5232Y AMARILLO TONER
    { modeloId: 37, insumoId: 63 }, // KYOCERA ECOSYS P2235DN - TK-1150/52 TONER
    { modeloId: 38, insumoId: 64 }, // SAMSUNG SL-M4072FD - MLT-D203U
    { modeloId: 39, insumoId: 65 }, //SAMSUNG ML-2525 - MLT-D105L
    { modeloId: 40, insumoId: 66 }, // RICOH SP3710DN - SP3710 TONER
    { modeloId: 41, insumoId: 67 }, // RICOH P800 - M600
    { modeloId: 42, insumoId: 66 }, // RICOH M320F - SP3710 TONER
    { modeloId: 43, insumoId: 66 }, // RICOH P311 - SP3710 TONER
    { modeloId: 23, insumoId: 69 }, // XEROX WorkCentre 6515DN - 108R01417 CYAN DRUM
    { modeloId: 23, insumoId: 70 }, // XEROX WorkCentre 6515DN - 108R01418 MAGENTA DRUM
    { modeloId: 23, insumoId: 71 }, // XEROX WorkCentre 6515DN - 108R01419 AMARILLO DRUM
    { modeloId: 23, insumoId: 72 }, // XEROX WorkCentre 6515DN - 108R01420 NEGRO DRUM
    { modeloId: 23, insumoId: 73 }, // XEROX WorkCentre 6515DN - 106R3488/92 NEGRO TONER
    { modeloId: 23, insumoId: 74 }, // XEROX WorkCentre 6515DN - 106R3694AL MAGENTA TONER
    { modeloId: 23, insumoId: 75 }, // XEROX WorkCentre 6515DN - 106R3489/93 CYAN TONER
    { modeloId: 23, insumoId: 76 }, // XEROX WorkCentre 6515DN - 106R3695AL AMARILLO TONER
    { modeloId: 15, insumoId: 77 }, // XEROX 3225/3260 - JC91-01034B FUSOR XEROX 3225
    { modeloId: 23, insumoId: 78 }, // XEROX WorkCentre 3615 - 115R00085 KIT MANTENIMIENTO FUSOR
    { modeloId: 1, insumoId: 79 }, //hp 1102w - CBT-CB435A/436A/CE285A/CE278A
    { modeloId: 2, insumoId: 79 }, // hp 1606DN - CBT-CB435A/436A/CE285A/CE278A
    { modeloId: 8, insumoId: 79 }, //hp LASERJET P1005/P1006 - CBT-CB435A/436A/CE285A/CE278A
    { modeloId: 42, insumoId: 80 },
  ];

  const proveedores = [
    {
      id: 1,
      proveedor: "AJUSTE",
      email: "ajuste@system.local",
      telefono: "00000000",
    },
    {
      id: 2,
      proveedor: "COMPRAS",
      telefono: "1112",
      email: "pinero_compras@buenosaires.gob.ar",
    },
    {
      id: 3,
      proveedor: "CONTABLE",
      telefono: "1113",
      email: "pinero_contable@buenosaires.gob.ar",
    },
    {
      id: 4,
      proveedor: "XEROX ARG. {FOTOCOPIADORAS}",
      telefono: null,
      email: null,
    },
    {
      id: 5,
      proveedor: "STAPLES",
      telefono: "0114136-6666",
      email: null,
    },
    {
      id: 6,
      proveedor: "AVANTECNO",
      telefono: "1143450150/4055 1143429152",
      email: "soporte@avantecno.com.ar",
    },
    {
      id: 7,
      proveedor: "AMERICANTEC",
      telefono: "1152918989",
      email: "info@americantec.com.ar",
    },
    { id: 8, proveedor: "REINGRESO", telefono: null, email: null },
    {
      id: 9,
      proveedor: "BRUNO HNOS.",
      telefono: "43624700",
      email: "bruno@brunohnos.com.ar",
    },
    {
      id: 10,
      proveedor: "INFORMATICA PALMAR S.R.L.",
      telefono: "4931-9575/9388",
      email: "info@informaticapalmar.com.ar",
    },
    {
      id: 11,
      proveedor: "IMPLEMENTACION LABORATORIO - GCBA",
      telefono: null,
      email: null,
    },
    { id: 12, proveedor: "GCBA", telefono: null, email: null },
    { id: 13, proveedor: "CABRAL", telefono: null, email: null },
    {
      id: 14,
      proveedor: "SGI (SERVICIOS GLOBALES DE IMFORMATICA S.A.)",
      telefono: "4504-0569/2601 4501-2190",
      email: null,
    },
    { id: 15, proveedor: "EMECE", telefono: "4958-7806", email: null },
    {
      id: 16,
      proveedor: "PAPELERA EP SRL",
      telefono: "1146136556",
      email: "papeleraep@gmail.com",
    },
    {
      id: 17,
      proveedor: "ARTFUL S.A.",
      telefono: "4551-4499",
      email: "info@artful.com.ar",
    },
    {
      id: 18,
      proveedor: "SILOG",
      telefono: "47555589",
      email: "silog@silog.com.ar",
    },
    { id: 19, proveedor: "EBOX S.A.", telefono: "21523630", email: null },
    {
      id: 20,
      proveedor: "GTC RIBBON S.A.",
      telefono: "43835900",
      email: "ivanadelrio@gtcribbon.com",
    },
    {
      id: 21,
      proveedor: "M200 S.A.",
      telefono: "5279-5000",
      email: "administracion@m200la.com",
    },
    {
      id: 22,
      proveedor: "S&G S.R.L",
      telefono: "4308-1113",
      email: "ventas@gyb.com.ar / webmaster@gyb.com.ar",
    },
    {
      id: 23,
      proveedor: "UNISER S.A.",
      telefono: "4854-1249",
      email: "uniserargentina@gmail.com",
    },
    {
      id: 24,
      proveedor: "EXTERNAL MARKET SRL",
      telefono: "114756-7500",
      email: null,
    },
    { id: 25, proveedor: "CL TECNOLOGICA S.A.S.", telefono: null, email: null },
    {
      id: 26,
      proveedor: "MERIDIANO ELECTRONICA S.R.L.",
      telefono: "1148783900 / 1148783901",
      email: null,
    },
    {
      id: 27,
      proveedor: "DAIKO S.R.L.",
      telefono: "1139315520",
      email: "claudia@daiko.com.ar",
    },
    { id: 28, proveedor: "DONACIÓN", telefono: null, email: null },
    { id: 29, proveedor: "AP SUPPLIER GROUP SA", telefono: null, email: null },
    { id: 30, proveedor: "JUAN MANUEL MOGHAMES", telefono: null, email: null },
    {
      id: 31,
      proveedor: "LAURENCE JAVIER DRUSCOVICH",
      telefono: "1147533838",
      email: "info@313led.com.ar",
    },
    {
      id: 32,
      proveedor: "TONER INFORMÁTICA",
      telefono: "1138251620",
      email: "danlezca@gmail.com",
    },
    { id: 33, proveedor: "BAFF", telefono: "1147709466", email: null },
    { id: 34, proveedor: "OSGI", telefono: null, email: null },
    { id: 35, proveedor: "DATXER", telefono: "080022293769", email: null },
    {
      id: 36,
      proveedor: "PRINT AR S.R.L",
      telefono: "1147340734",
      email: "info@printar.com.ar",
    },
    { id: 37, proveedor: "JONATHAN TRAJTEMBROIT", telefono: null, email: null },
  ];

  const servicios = [
    { id: 1, servicio: "AJUSTE" },
    { id: 2, servicio: "ADMISION Y EGRESO" },
    { id: 3, servicio: "ALIMENTACION" },
    { id: 4, servicio: "ANATOMIA PATOLOGICA" },
    { id: 5, servicio: "ANESTESIOLOGIA" },
    { id: 6, servicio: "ARCHIVO" },
    { id: 7, servicio: "AREA PROGRAMATICA" },
    { id: 8, servicio: "AREA PROGRAMATICA (LEGALES)" },
    { id: 9, servicio: "BIOETICA" },
    { id: 10, servicio: "CARDIOLOGIA (ECOCARDIO)" },
    { id: 11, servicio: "CARDIOLOGIA (ECODOPLER)" },
    { id: 12, servicio: "CARDIOLOGIA (JEFATURA)" },
    { id: 13, servicio: "CC.EE. (39)" },
    { id: 14, servicio: "CC.EE. (COBERTURA PORTEÑA)" },
    { id: 15, servicio: "CC.EE. NEUROLOGIA" },
    { id: 16, servicio: "CC.EE. (SERVICIO SOCIAL)" },
    { id: 17, servicio: "CC.EE. (VENTANILLA)" },
    { id: 18, servicio: "CIRUGIA U7" },
    { id: 19, servicio: "CIRUGIA U8" },
    { id: 20, servicio: "CLINICA U1" },
    { id: 21, servicio: "CLINICA U2" },
    { id: 22, servicio: "CLINICA U3" },
    { id: 23, servicio: "CLINICA U4" },
    { id: 24, servicio: "CODEI" },
    { id: 25, servicio: "COMITE DE EMERGENCIA" },
    { id: 26, servicio: "COMPRAS" },
    { id: 27, servicio: "CONTABLE" },
    { id: 28, servicio: "DEPOSITO MATERIAL SANITARIO" },
    { id: 29, servicio: "DESPACHO JURIDICO" },
    { id: 30, servicio: "DESPACHO MESA ENTRADA" },
    { id: 31, servicio: "DIRECCION" },
    { id: 32, servicio: "DOCENCIA DE ENFERMERIA" },
    { id: 33, servicio: "E.C.I." },
    { id: 34, servicio: "ESTADISTICA" },
    { id: 35, servicio: "ESTERILIZACIÓN" },
    { id: 36, servicio: "FACTURACIÓN" },
    { id: 37, servicio: "FARMACIA CENTRAL" },
    { id: 38, servicio: "FARMACIA COBERTURA PORTEÑA" },
    { id: 39, servicio: "GINECOLOGIA" },
    { id: 40, servicio: "GUARDIA (HHCC)" },
    { id: 41, servicio: "GUARDIA (JEFATURA)" },
    { id: 42, servicio: "GUARDIA (SECRETARÍA)" },
    { id: 43, servicio: "GUARDIA (VENTANILLA)" },
    { id: 44, servicio: "HEMOTERAPIA" },
    { id: 45, servicio: "HOSPITAL DE DIA" },
    { id: 46, servicio: "INFECTOLOGIA" },
    { id: 47, servicio: "JURIDICO" },
    { id: 48, servicio: "KINESIOLOGIA" },
    { id: 49, servicio: "LABORATORIO (BACTERIOLOGIA)" },
    { id: 50, servicio: "LABORATORIO (GUARDIA)" },
    { id: 51, servicio: "LABORATORIO (QUIMICA)" },
    { id: 52, servicio: "LABORATORIO (VENTANILLA)" },
    { id: 53, servicio: "LIBRERIA" },
    { id: 54, servicio: "LIBRETA SANITARIA" },
    { id: 55, servicio: "LICENCIAS" },
    { id: 56, servicio: "LIQUIDACION DE GUARDIA" },
    { id: 57, servicio: "MATERNIDAD" },
    { id: 58, servicio: "MEDICINA LABORAL" },
    { id: 59, servicio: "MORGUE" },
    { id: 60, servicio: "MOVIMIENTO Y CONCURSO" },
    { id: 61, servicio: "NEONATOLOGIA" },
    { id: 62, servicio: "NEUMOTISIOLOGIA" },
    { id: 63, servicio: "OBSTETRICIA (JEFATURA)" },
    { id: 64, servicio: "OBSTETRICIA SALA MEDICOS" },
    { id: 65, servicio: "ODONTOLOGIA" },
    { id: 66, servicio: "OFTALMOLOGIA" },
    { id: 67, servicio: "ONCOLOGIA" },
    { id: 68, servicio: "ORL" },
    { id: 69, servicio: "PATRIMONIO" },
    { id: 70, servicio: "PEDIATRIA" },
    { id: 71, servicio: "PERSONAL" },
    { id: 72, servicio: "PROGRAMACION Y CONTROL" },
    { id: 73, servicio: "PROMOCION Y PROTECCION" },
    { id: 74, servicio: "PSICOPATOLOGIA" },
    { id: 75, servicio: "QUIROFANO CENTRAL" },
    { id: 76, servicio: "RAYOS (Secretaria)" },
    { id: 77, servicio: "SALUD DEL ESCOLAR" },
    { id: 78, servicio: "SISTEMAS" },
    { id: 79, servicio: "SOPORTE TECNICO" },
    { id: 80, servicio: "SUBGERENCIA RRHH" },
    { id: 81, servicio: "SUTECBA" },
    { id: 82, servicio: "TRAUMATOLOGIA U09" },
    { id: 83, servicio: "TRAUMATOLOGIA U10" },
    { id: 84, servicio: "U.C.I.M." },
    { id: 85, servicio: "U.T.I." },
    { id: 86, servicio: "CARDIOLOGIA" },
    { id: 87, servicio: "CLINICA U3 (RESIDENCIA)" },
    { id: 88, servicio: "NEUROLOGIA" },
    { id: 89, servicio: "PEDIATRIA (GUARDIA)" },
    { id: 90, servicio: "LABORATORIO (MICRIBIOLOGIA)" },
    { id: 91, servicio: "HEMATOLOGIA" },
    { id: 92, servicio: "CC.EE. (VENTANILLA RAYOS)" },
    { id: 93, servicio: "A.R.D." },
    { id: 94, servicio: "GASTROENTEROLOGIA" },
    { id: 95, servicio: "TRAUMATOLOGIA (JEFATURA)" },
    { id: 96, servicio: "SUBGERENCIA DE ENFERMERIA" },
    { id: 97, servicio: "LABORATORIO (JEFATURA)" },
    { id: 98, servicio: "MANTENIMIENTO" },
    { id: 99, servicio: "JEFATURA LABORATORIO" },
    { id: 100, servicio: "GINECOLOGIA (RESIDENTES)" },
    { id: 101, servicio: "ECOGRAFIA INFANTIL" },
    { id: 102, servicio: "GUARDIA (TRAUMATO)" },
    { id: 103, servicio: "DERMATOLOGIA" },
    { id: 104, servicio: "U.F.U." },
    { id: 105, servicio: "SERVICIO SOCIAL" },
    { id: 106, servicio: "CC.EE. (31)" },
    { id: 107, servicio: "DEPARTAMENTO ENFERMERIA" },
    { id: 108, servicio: "BOMBERO" },
    { id: 109, servicio: "OBSTETRICIA DORMITORIO" },
    { id: 110, servicio: "TOCOGINECO" },
    { id: 111, servicio: "ECOGRAFIA" },
    { id: 112, servicio: "FONOAUDIOLOGIA" },
    { id: 113, servicio: "VACUNATORIO" },
    { id: 114, servicio: "MAXILOFACIAL" },
    { id: 115, servicio: "PARTOS" },
    { id: 116, servicio: "AMM" },
    { id: 117, servicio: "BIBLIOTECA" },
    { id: 118, servicio: "ARQUITECTA" },
    { id: 119, servicio: "ODONTOLOGIA (ORTODONCIA)" },
    { id: 120, servicio: "ODONTOLOGIA (ODONTOPEDIATRIA)" },
    { id: 121, servicio: "ODONTOLOGIA (MAXILOFACIAL)" },
    { id: 122, servicio: "CC.EE. (UROLOGIA)" },
    { id: 123, servicio: "CARDIOLOGIA (ELECTROCARDIOGRAMA)" },
    { id: 124, servicio: "OBSTETRICIA OFIC. LICENCIA" },
    { id: 125, servicio: "TEPAPIA OCUPACIONAL" },
    { id: 126, servicio: "MAMOGRAFIA" },
    { id: 127, servicio: "CC.EE. (GENERAL)" },
  ];

  const impresoras = [
    { marcaId: 1, modeloId: 1 }, // HP LASERJET 1102W
    { marcaId: 1, modeloId: 2 }, // HP LASERJET 1606DN
    { marcaId: 1, modeloId: 3 }, // HP LASERJET 2205N
    { marcaId: 1, modeloId: 4 }, // HP LASERJET 5L/6L
    { marcaId: 1, modeloId: 5 }, // HP LASERJET 1010/12/15/20/22
    { marcaId: 1, modeloId: 6 }, // HP LASERJET M401 PRO
    { marcaId: 1, modeloId: 7 }, // HP LASERJET PRO 201DW
    { marcaId: 1, modeloId: 8 }, // HP LASERJET P1005/P1006
    { marcaId: 1, modeloId: 9 }, // HP LASERJET 1320
    { marcaId: 1, modeloId: 10 }, // HP LASERJET PRO M521DN
    { marcaId: 1, modeloId: 11 }, // HP LASERJET P2055DN
    { marcaId: 1, modeloId: 12 }, // HP LASERJET P1505
    { marcaId: 1, modeloId: 13 }, // HP LASERJET M12W
    { marcaId: 1, modeloId: 14 }, // HP LASERJET 107W
    { marcaId: 2, modeloId: 15 }, // XEROX PHASER 3225/3260
    { marcaId: 2, modeloId: 16 }, // XEROX PHASER 3020
    { marcaId: 2, modeloId: 17 }, // XEROX PHASER 4600DN
    { marcaId: 2, modeloId: 18 }, // XEROX WorkCentre 6505DN
    { marcaId: 2, modeloId: 19 }, // XEROX WorkCentre 3615
    { marcaId: 2, modeloId: 20 }, // XEROX WorkCentre 3345
    { marcaId: 2, modeloId: 21 }, // XEROX WorkCentre 3550
    { marcaId: 2, modeloId: 22 }, // XEROX WorkCentre 5225/5230
    { marcaId: 2, modeloId: 23 }, // XEROX WorkCentre 6515DN
    { marcaId: 2, modeloId: 24 }, // XEROX VersaLink B210/B215
    { marcaId: 2, modeloId: 25 }, // XEROX VersaLink B230
    { marcaId: 2, modeloId: 26 }, // XEROX VersaLink B415
    { marcaId: 2, modeloId: 27 }, // XEROX VersaLink B610DN
    { marcaId: 2, modeloId: 28 }, // XEROX VersaLink B8075
    { marcaId: 3, modeloId: 29 }, // BROTHER HL-1100/DCP1617NW
    { marcaId: 3, modeloId: 30 }, // BROTHER HL-2200
    { marcaId: 3, modeloId: 31 }, // BROTHER HL-5350DN
    { marcaId: 3, modeloId: 32 }, //BROTHER HL-1200
    { marcaId: 4, modeloId: 33 }, // LEXMARK E260DN
    { marcaId: 4, modeloId: 34 }, //LEXMARK E250DN/E350DN
    { marcaId: 5, modeloId: 35 },
    { marcaId: 5, modeloId: 36 },
    { marcaId: 5, modeloId: 37 },
    { marcaId: 6, modeloId: 38 },
    { marcaId: 6, modeloId: 39 }, //SAMSUNG ML-2525
    { marcaId: 7, modeloId: 40 },
    { marcaId: 7, modeloId: 41 },
    { marcaId: 7, modeloId: 42 },
    { marcaId: 7, modeloId: 43 },
  ];

  const impresoraFisica = [
    {
      id: 1,
      numeroSerie: "WW68803330",
      remito: null,
      proveedorId: 6,
      impresoraId: 1,
    },
    {
      id: 2,
      numeroSerie: "WW68803331",
      remito: null,
      proveedorId: 6,
      impresoraId: 2,
    },
    {
      id: 3,
      numeroSerie: "3373928290",
      remito: null,
      proveedorId: 3,
      impresoraId: 19,
    },
    {
      id: 4,
      numeroSerie: "ALIM-001",
      remito: null,
      proveedorId: 1,
      impresoraId: 5,
    },
    {
      id: 5,
      numeroSerie: "ALIM-002",
      remito: null,
      proveedorId: 1,
      impresoraId: 29,
    },
    {
      numeroSerie: "3373927987",
      remito: null,
      proveedorId: 3,
      impresoraId: 19,
    },
    {
      id: 6,
      numeroSerie: "ANAT-002",
      remito: null,
      proveedorId: 5,
      impresoraId: 15,
    },
    {
      id: 7,
      numeroSerie: "ANES-001",
      remito: null,
      proveedorId: 1,
      impresoraId: 1,
    },
    {
      id: 8,
      numeroSerie: "3373928967",
      remito: null,
      proveedorId: 3,
      impresoraId: 19,
    },
    {
      id: 9,
      numeroSerie: "3248743831",
      remito: null,
      proveedorId: 1,
      impresoraId: 17,
    },
    {
      id: 10,
      numeroSerie: "3316129608",
      remito: null,
      proveedorId: 3,
      impresoraId: 22,
    },
    {
      id: 11,
      numeroSerie: "3163790776",
      remito: null,
      proveedorId: 1,
      impresoraId: 18,
    },
    {
      id: 12,
      numeroSerie: "BIOE-001",
      remito: null,
      proveedorId: 1,
      impresoraId: 17,
    },
    {
      id: 13,
      numeroSerie: "CARD-001",
      remito: null,
      proveedorId: 5,
      impresoraId: 15,
    },
    {
      id: 14,
      numeroSerie: "CARD-002",
      remito: null,
      proveedorId: 5,
      impresoraId: 15,
    },
    {
      id: 15,
      numeroSerie: "CARD-003",
      remito: null,
      proveedorId: 1,
      impresoraId: 1,
    },
    {
      id: 16,
      numeroSerie: "CARD-004",
      remito: null,
      proveedorId: 1,
      impresoraId: 29,
    },
    {
      id: 17,
      numeroSerie: "CONS39-001",
      remito: null,
      proveedorId: 1,
      impresoraId: 5,
    },
    {
      id: 18,
      numeroSerie: "3248743467",
      remito: null,
      proveedorId: 5,
      impresoraId: 17,
    },
    {
      id: 19,
      numeroSerie: "3373932921",
      remito: null,
      proveedorId: 1,
      impresoraId: 19,
    },
    {
      id: 20,
      numeroSerie: "CC.EE-VENT-001",
      remito: null,
      proveedorId: 5,
      impresoraId: 15,
    },
    {
      id: 21,
      numeroSerie: "CIRU-003",
      remito: null,
      proveedorId: 1,
      impresoraId: 1,
    },
    {
      id: 22,
      numeroSerie: "3380490071",
      remito: null,
      proveedorId: 5,
      impresoraId: 15,
    },
    {
      id: 23,
      numeroSerie: "3380497947",
      remito: null,
      proveedorId: 5,
      impresoraId: 15,
    },
    {
      id: 24,
      numeroSerie: "ECOINF-001",
      remito: null,
      proveedorId: 1,
      impresoraId: 1,
    },
    {
      id: 25,
      numeroSerie: "CLIN-003",
      remito: null,
      proveedorId: 1,
      impresoraId: 1,
    },
    {
      id: 26,
      numeroSerie: "CLIN-004",
      remito: null,
      proveedorId: 1,
      impresoraId: 1,
    },
    {
      id: 27,
      numeroSerie: "CLIN-005",
      remito: null,
      proveedorId: 1,
      impresoraId: 1,
    },
    {
      id: 28,
      numeroSerie: "CODE-001",
      remito: null,
      proveedorId: 1,
      impresoraId: 29,
    },
    {
      id: 29,
      numeroSerie: "COMIEMER-001",
      remito: null,
      proveedorId: 1,
      impresoraId: 2,
    },
    {
      id: 30,
      numeroSerie: "3248742100",
      remito: null,
      proveedorId: 5,
      impresoraId: 17,
    },
    {
      id: 31,
      numeroSerie: "3373928282",
      remito: null,
      proveedorId: 3,
      impresoraId: 19,
    },
    {
      id: 32,
      numeroSerie: "3248743793",
      remito: null,
      proveedorId: 5,
      impresoraId: 17,
    },
    {
      id: 33,
      numeroSerie: "DEPO-001",
      remito: null,
      proveedorId: 1,
      impresoraId: 2,
    },
    {
      id: 34,
      numeroSerie: "3380497920",
      remito: null,
      proveedorId: 5,
      impresoraId: 15,
    },
    {
      id: 35,
      numeroSerie: "3373933162",
      remito: null,
      proveedorId: 3,
      impresoraId: 19,
    },
    {
      id: 36,
      numeroSerie: "BRBFCCQQ59",
      remito: null,
      proveedorId: 1,
      impresoraId: 2,
    },
    {
      id: 37,
      numeroSerie: "3380490101",
      remito: null,
      proveedorId: 5,
      impresoraId: 15,
    },
    {
      id: 38,
      numeroSerie: "3256771097",
      remito: null,
      proveedorId: 3,
      impresoraId: 21,
    },
    {
      id: 39,
      numeroSerie: "DIRE-001",
      remito: null,
      proveedorId: 1,
      impresoraId: 1,
    },
    {
      id: 40,
      numeroSerie: "DIRE-002",
      remito: null,
      proveedorId: 1,
      impresoraId: 6,
    },
    {
      id: 41,
      numeroSerie: "3373928320",
      remito: null,
      proveedorId: 3,
      impresoraId: 19,
    },
    {
      id: 42,
      numeroSerie: "DOCE-001",
      remito: null,
      proveedorId: 5,
      impresoraId: 15,
    },
    {
      id: 43,
      numeroSerie: "ECI-001",
      remito: null,
      proveedorId: 1,
      impresoraId: 29,
    },
    {
      id: 44,
      numeroSerie: "BRBFCCQQ55",
      remito: null,
      proveedorId: 1,
      impresoraId: 2,
    },
    {
      id: 45,
      numeroSerie: "3248744064",
      remito: null,
      proveedorId: 5,
      impresoraId: 17,
    },
    {
      id: 46,
      numeroSerie: "3256771089",
      remito: null,
      proveedorId: 3,
      impresoraId: 21,
    },
    {
      id: 47,
      numeroSerie: "3248743246",
      remito: null,
      proveedorId: 5,
      impresoraId: 17,
    },
    {
      id: 48,
      numeroSerie: "3373933049",
      remito: null,
      proveedorId: 3,
      impresoraId: 19,
    },
    {
      id: 49,
      numeroSerie: "FARM-COBPOR-001",
      remito: null,
      proveedorId: 1,
      impresoraId: 5,
    },
    {
      id: 50,
      numeroSerie: "GINE-001",
      remito: null,
      proveedorId: 1,
      impresoraId: 1,
    },
    {
      id: 51,
      numeroSerie: "VW68803330",
      remito: null,
      proveedorId: 6,
      impresoraId: 35,
    },
    {
      id: 52,
      numeroSerie: "GUAR-001",
      remito: null,
      proveedorId: 1,
      impresoraId: 1,
    },
    {
      id: 53,
      numeroSerie: "3373928240",
      remito: null,
      proveedorId: 3,
      impresoraId: 19,
    },
    {
      id: 54,
      numeroSerie: "GUAR-002",
      remito: null,
      proveedorId: 5,
      impresoraId: 15,
    },
    {
      id: 55,
      numeroSerie: "HEMO-001",
      remito: null,
      proveedorId: 1,
      impresoraId: 30,
    },
    {
      id: 56,
      numeroSerie: "3248742894",
      remito: null,
      proveedorId: 5,
      impresoraId: 17,
    },
    {
      id: 57,
      numeroSerie: "INFE-001",
      remito: null,
      proveedorId: 1,
      impresoraId: 1,
    },
    {
      id: 58,
      numeroSerie: "JURI-001",
      remito: null,
      proveedorId: 1,
      impresoraId: 19,
    },
    {
      id: 59,
      numeroSerie: "KINE-001",
      remito: null,
      proveedorId: 1,
      impresoraId: 5,
    },
    {
      id: 60,
      numeroSerie: "LABO-001",
      remito: null,
      proveedorId: 1,
      impresoraId: 3,
    },
    {
      id: 61,
      numeroSerie: "LABO-002",
      remito: null,
      proveedorId: 1,
      impresoraId: 2,
    },
    {
      id: 62,
      numeroSerie: "LABO-003",
      remito: null,
      proveedorId: 1,
      impresoraId: 3,
    },
    {
      id: 63,
      numeroSerie: "2L1143",
      remito: null,
      proveedorId: 1,
      impresoraId: 3,
    },
    {
      id: 64,
      numeroSerie: "BRBSH9FTBZ",
      remito: null,
      proveedorId: 1,
      impresoraId: 7,
    },
    {
      id: 65,
      numeroSerie: "LIBRERIA-001",
      remito: null,
      proveedorId: 3,
      impresoraId: 22,
    },
    {
      id: 66,
      numeroSerie: "LIBRETA-001",
      remito: null,
      proveedorId: 5,
      impresoraId: 18,
    },
    {
      id: 67,
      numeroSerie: "XXXXXXXXX",
      remito: null,
      proveedorId: 5,
      impresoraId: 15,
    },
    {
      id: 68,
      numeroSerie: "3373921806",
      remito: null,
      proveedorId: 3,
      impresoraId: 19,
    },
    {
      id: 69,
      numeroSerie: "BRBFCCQQ5J",
      remito: null,
      proveedorId: 1,
      impresoraId: 2,
    },
    {
      id: 70,
      numeroSerie: "3373929238",
      remito: null,
      proveedorId: 3,
      impresoraId: 19,
    },
    {
      id: 71,
      numeroSerie: "MEDI-002",
      remito: null,
      proveedorId: 1,
      impresoraId: 5,
    },
    {
      id: 72,
      numeroSerie: "MEDI-001",
      remito: null,
      proveedorId: 1,
      impresoraId: 2,
    },
    {
      id: 73,
      numeroSerie: "3380490322",
      remito: null,
      proveedorId: 5,
      impresoraId: 15,
    },
    {
      id: 74,
      numeroSerie: "MORG-001",
      remito: null,
      proveedorId: 1,
      impresoraId: 1,
    },
    {
      id: 75,
      numeroSerie: "3380499257",
      remito: null,
      proveedorId: 5,
      impresoraId: 15,
    },
    {
      id: 76,
      numeroSerie: "BRBFCCQQ5D",
      remito: null,
      proveedorId: 1,
      impresoraId: 2,
    },
    {
      id: 77,
      numeroSerie: "BRBFCCQQ5H",
      remito: null,
      proveedorId: 1,
      impresoraId: 2,
    },
    {
      id: 78,
      numeroSerie: "NEUR-001",
      remito: null,
      proveedorId: 1,
      impresoraId: 8,
    },
    {
      id: 79,
      numeroSerie: "NEUR-002",
      remito: null,
      proveedorId: 1,
      impresoraId: 34,
    },
    {
      id: 80,
      numeroSerie: "OBST-001",
      remito: null,
      proveedorId: 5,
      impresoraId: 15,
    },
    {
      id: 81,
      numeroSerie: "3380483768",
      remito: null,
      proveedorId: 5,
      impresoraId: 15,
    },
    {
      id: 82,
      numeroSerie: "ODON-001",
      remito: null,
      proveedorId: 1,
      impresoraId: 31,
    },
    {
      id: 83,
      numeroSerie: "OFTA-001",
      remito: null,
      proveedorId: 1,
      impresoraId: 1,
    },
    {
      id: 84,
      numeroSerie: "ONCO-001",
      remito: null,
      proveedorId: 5,
      impresoraId: 15,
    },
    {
      id: 85,
      numeroSerie: "3380499214",
      remito: null,
      proveedorId: 5,
      impresoraId: 15,
    },
    {
      id: 86,
      numeroSerie: "PATR-001",
      remito: null,
      proveedorId: 1,
      impresoraId: 2,
    },
    {
      id: 87,
      numeroSerie: "3373928967",
      remito: null,
      proveedorId: 3,
      impresoraId: 19,
    },
    {
      id: 88,
      numeroSerie: "3373921679",
      remito: null,
      proveedorId: 3,
      impresoraId: 19,
    },
    {
      id: 89,
      numeroSerie: "3248743882",
      remito: null,
      proveedorId: 5,
      impresoraId: 17,
    },
    {
      id: 90,
      numeroSerie: "3256771119",
      remito: null,
      proveedorId: 3,
      impresoraId: 21,
    },
    {
      id: 91,
      numeroSerie: "PROG-001",
      remito: null,
      proveedorId: 1,
      impresoraId: 5,
    },
    {
      id: 92,
      numeroSerie: "BRFSF1BKKV",
      remito: null,
      proveedorId: 1,
      impresoraId: 6,
    },
    {
      id: 93,
      numeroSerie: "3163791012",
      remito: null,
      proveedorId: 5,
      impresoraId: 18,
    },
    {
      id: 94,
      numeroSerie: "PSIC-001",
      remito: null,
      proveedorId: 1,
      impresoraId: 4,
    },
    {
      id: 95,
      numeroSerie: "3248743211",
      remito: null,
      proveedorId: 5,
      impresoraId: 17,
    },
    {
      id: 96,
      numeroSerie: "QUI-CEN-001",
      remito: null,
      proveedorId: 3,
      impresoraId: 21,
    },
    {
      id: 97,
      numeroSerie: "RAYO-002",
      remito: null,
      proveedorId: 1,
      impresoraId: 29,
    },
    {
      id: 98,
      numeroSerie: "3163790806",
      remito: null,
      proveedorId: 5,
      impresoraId: 18,
    },
    {
      id: 99,
      numeroSerie: "3380499397",
      remito: null,
      proveedorId: 5,
      impresoraId: 15,
    },
    {
      id: 100,
      numeroSerie: "ST-001",
      remito: null,
      proveedorId: 1,
      impresoraId: 31,
    },
    {
      id: 101,
      numeroSerie: "SUBG-001",
      remito: null,
      proveedorId: 1,
      impresoraId: 1,
    },
    {
      id: 102,
      numeroSerie: "3373928045",
      remito: null,
      proveedorId: 3,
      impresoraId: 19,
    },
    {
      id: 103,
      numeroSerie: "TRAU-U9-001",
      remito: null,
      proveedorId: 1,
      impresoraId: 2,
    },
    {
      id: 104,
      numeroSerie: "TRAU-U10-001",
      remito: null,
      proveedorId: 1,
      impresoraId: 2,
    },
    {
      id: 105,
      numeroSerie: "UCIM-001",
      remito: null,
      proveedorId: 1,
      impresoraId: 1,
    },
    {
      id: 106,
      numeroSerie: "3380497947",
      remito: null,
      proveedorId: 5,
      impresoraId: 15,
    },
    {
      id: 107,
      numeroSerie: "CNCKK7G09F",
      remito: null,
      proveedorId: 1,
      impresoraId: 21,
    },
    {
      id: 108,
      numeroSerie: "3381716448",
      remito: null,
      proveedorId: 5,
      impresoraId: 15,
    },
    {
      id: 109,
      numeroSerie: "3381717606",
      remito: null,
      proveedorId: 5,
      impresoraId: 15,
    },
    {
      id: 110,
      numeroSerie: "HEMATOLOGIA-01",
      remito: null,
      proveedorId: 1,
      impresoraId: 5,
    },
    {
      id: 111,
      numeroSerie: "7AV905056V",
      remito: null,
      proveedorId: 5,
      impresoraId: 23,
    },
    {
      id: 112,
      numeroSerie: "K9A350106B",
      remito: null,
      proveedorId: 5,
      impresoraId: 15,
    },
    {
      id: 113,
      numeroSerie: "ZELLBJFK9000CXF",
      remito: null,
      proveedorId: 1,
      impresoraId: 38,
    },
    {
      id: 114,
      numeroSerie: "TRAUMA-01",
      remito: null,
      proveedorId: 1,
      impresoraId: 1,
    },
    {
      id: 115,
      numeroSerie: "TRAUMA-U10",
      remito: null,
      proveedorId: 1,
      impresoraId: 1,
    },
    {
      id: 116,
      numeroSerie: "CLI2-IMP2",
      remito: null,
      proveedorId: 5,
      impresoraId: 15,
    },
    {
      id: 117,
      numeroSerie: "CLIN3-002",
      remito: null,
      proveedorId: 5,
      impresoraId: 15,
    },
    {
      id: 118,
      numeroSerie: "CLIN4-002",
      remito: null,
      proveedorId: 5,
      impresoraId: 15,
    },
    {
      id: 119,
      numeroSerie: "CIRU7-002",
      remito: null,
      proveedorId: 5,
      impresoraId: 15,
    },
    {
      id: 120,
      numeroSerie: "CIRU8-002",
      remito: null,
      proveedorId: 5,
      impresoraId: 15,
    },
    {
      id: 121,
      numeroSerie: "ARD-001",
      remito: null,
      proveedorId: 5,
      impresoraId: 15,
    },
    {
      id: 122,
      numeroSerie: "CARDIO-002",
      remito: null,
      proveedorId: 1,
      impresoraId: 5,
    },
    {
      id: 123,
      numeroSerie: "GINECO-002",
      remito: null,
      proveedorId: 1,
      impresoraId: 5,
    },
    {
      id: 124,
      numeroSerie: "BRBS64NG45",
      remito: null,
      proveedorId: 1,
      impresoraId: 5,
    },
    {
      id: 125,
      numeroSerie: "RAYOS-002",
      remito: null,
      proveedorId: 1,
      impresoraId: 1,
    },
    {
      id: 126,
      numeroSerie: "VP66Z00158",
      remito: null,
      proveedorId: 5,
      impresoraId: 36,
    },
    {
      id: 127,
      numeroSerie: "VP66Z00134",
      remito: null,
      proveedorId: 8,
      impresoraId: 36,
    },
    {
      id: 128,
      numeroSerie: "CNB1L71256",
      remito: null,
      proveedorId: 11,
      impresoraId: 38,
    },
    {
      id: 129,
      numeroSerie: "CNM1JC900CE-570080",
      remito: null,
      proveedorId: 11,
      impresoraId: 38,
    },
    {
      id: 130,
      numeroSerie: "CNM1JC900CE-6T0694",
      remito: null,
      proveedorId: 11,
      impresoraId: 38,
    },
    {
      id: 131,
      numeroSerie: "QUIROFACENTRAL01",
      remito: null,
      proveedorId: 11,
      impresoraId: 39,
    },
    {
      id: 132,
      numeroSerie: "PROMPROT01",
      remito: null,
      proveedorId: 5,
      impresoraId: 15,
    },
    {
      id: 133,
      numeroSerie: "7AV091091V",
      remito: null,
      proveedorId: 6,
      impresoraId: 23,
    },
    {
      id: 134,
      numeroSerie: "7AV09109AV",
      remito: null,
      proveedorId: 5,
      impresoraId: 23,
    },
    {
      id: 135,
      numeroSerie: "1",
      remito: null,
      proveedorId: 7,
      impresoraId: 29,
    },
    {
      id: 136,
      numeroSerie: "DIRECCION-001",
      remito: null,
      proveedorId: 14,
      impresoraId: 30,
    },
    {
      id: 137,
      numeroSerie: "3380497947",
      remito: null,
      proveedorId: 1,
      impresoraId: 15,
    },
    {
      id: 138,
      numeroSerie: "VRF910318",
      remito: null,
      proveedorId: 8,
      impresoraId: 37,
    },
    {
      id: 139,
      numeroSerie: "3373933243",
      remito: null,
      proveedorId: 3,
      impresoraId: 19,
    },
    {
      id: 140,
      numeroSerie: "LAB-02",
      remito: null,
      proveedorId: 11,
      impresoraId: 29,
    },
    {
      id: 141,
      numeroSerie: "123456",
      remito: null,
      proveedorId: 7,
      impresoraId: 30,
    },
    {
      id: 142,
      numeroSerie: "ABCD",
      remito: null,
      proveedorId: 7,
      impresoraId: 8,
    },
    {
      id: 143,
      numeroSerie: "MANTENIMIENTO-001",
      remito: null,
      proveedorId: 7,
      impresoraId: 1,
    },
    {
      id: 144,
      numeroSerie: "ECO-001",
      remito: null,
      proveedorId: 7,
      impresoraId: 31,
    },
    {
      id: 145,
      numeroSerie: "BALANCE",
      remito: null,
      proveedorId: 7,
      impresoraId: 1,
    },
    {
      id: 146,
      numeroSerie: "BRGHB3JG1K",
      remito: null,
      proveedorId: 7,
      impresoraId: 5,
    },
    {
      id: 147,
      numeroSerie: "72BK081",
      remito: null,
      proveedorId: 21,
      impresoraId: 33,
    },
    {
      id: 148,
      numeroSerie: "CNM1JC900CE-570080",
      remito: null,
      proveedorId: 11,
      impresoraId: 38,
    },
    {
      id: 149,
      numeroSerie: "12345",
      remito: null,
      proveedorId: 3,
      impresoraId: 15,
    },
    {
      id: 150,
      numeroSerie: "112345",
      remito: null,
      proveedorId: 7,
      impresoraId: 1,
    },
    {
      id: 151,
      numeroSerie: "GINECO-003",
      remito: null,
      proveedorId: 1,
      impresoraId: 31,
    },
    {
      id: 152,
      numeroSerie: "RICOHSP3710DN-001",
      remito: null,
      proveedorId: 23,
      impresoraId: 40,
    },
    {
      id: 153,
      numeroSerie: "RICOHSP3710DN-002",
      remito: null,
      proveedorId: 23,
      impresoraId: 40,
    },
    {
      id: 154,
      numeroSerie: "5160ZA30688",
      remito: null,
      proveedorId: 23,
      impresoraId: 40,
    },
    {
      id: 155,
      numeroSerie: "5160Z930651",
      remito: null,
      proveedorId: 23,
      impresoraId: 40,
    },
    {
      id: 156,
      numeroSerie: "5160Z930638",
      remito: null,
      proveedorId: 23,
      impresoraId: 40,
    },
    {
      id: 157,
      numeroSerie: "SERVSOC-01",
      remito: null,
      proveedorId: 3,
      impresoraId: 19,
    },
    {
      id: 158,
      numeroSerie: "TRAUMA-U9-02",
      remito: null,
      proveedorId: 1,
      impresoraId: 29,
    },
    {
      id: 159,
      numeroSerie: "AA",
      remito: null,
      proveedorId: 23,
      impresoraId: 40,
    },
    {
      id: 160,
      numeroSerie: "516Z930414",
      remito: null,
      proveedorId: 8,
      impresoraId: 40,
    },
    {
      id: 161,
      numeroSerie: "132345",
      remito: null,
      proveedorId: 7,
      impresoraId: 15,
    },
    {
      id: 162,
      numeroSerie: "PEDIATRIA-01",
      remito: null,
      proveedorId: 3,
      impresoraId: 19,
    },
    {
      id: 163,
      numeroSerie: "5161Z930400",
      remito: null,
      proveedorId: 23,
      impresoraId: 40,
    },
    {
      id: 164,
      numeroSerie: "0000001",
      remito: null,
      proveedorId: 12,
      impresoraId: 32,
    },
    {
      id: 165,
      numeroSerie: "HHCC01",
      remito: null,
      proveedorId: 1,
      impresoraId: 2,
    },
    {
      id: 166,
      numeroSerie: "000001",
      remito: null,
      proveedorId: 27,
      impresoraId: 32,
    },
    {
      id: 167,
      numeroSerie: "COB.PORTENA01",
      remito: null,
      proveedorId: 2,
      impresoraId: 7,
    },
    {
      id: 168,
      numeroSerie: "EX-ONCO",
      remito: null,
      proveedorId: 5,
      impresoraId: 23,
    },
    {
      id: 169,
      numeroSerie: "160Z930636",
      remito: null,
      proveedorId: 23,
      impresoraId: 40,
    },
    {
      id: 170,
      numeroSerie: "3437861357",
      remito: null,
      proveedorId: 21,
      impresoraId: 24,
    },
    {
      id: 171,
      numeroSerie: "5302X451460",
      remito: null,
      proveedorId: 23,
      impresoraId: 41,
    },
    {
      id: 172,
      numeroSerie: "5852Z330883",
      remito: null,
      proveedorId: 23,
      impresoraId: 42,
    },
    {
      id: 173,
      numeroSerie: "5852Z330885",
      remito: null,
      proveedorId: 23,
      impresoraId: 42,
    },
    {
      id: 174,
      numeroSerie: "BRB5644G62",
      remito: null,
      proveedorId: 21,
      impresoraId: 41,
    },
    {
      id: 175,
      numeroSerie: "5160Z931341",
      remito: null,
      proveedorId: 23,
      impresoraId: 40,
    },
    {
      id: 176,
      numeroSerie: "GUARDIAHHCC",
      remito: null,
      proveedorId: 4,
      impresoraId: 41,
    },
    {
      id: 177,
      numeroSerie: "3380510184",
      remito: null,
      proveedorId: 5,
      impresoraId: 15,
    },
    {
      id: 178,
      numeroSerie: "DTOENF-002",
      remito: null,
      proveedorId: 11,
      impresoraId: 15,
    },
    {
      id: 179,
      numeroSerie: "INFECTO",
      remito: null,
      proveedorId: 11,
      impresoraId: 40,
    },
    {
      id: 180,
      numeroSerie: "UNIDAD8-001",
      remito: null,
      proveedorId: 6,
      impresoraId: 41,
    },
    {
      id: 181,
      numeroSerie: "CARDIO-001",
      remito: null,
      proveedorId: 6,
      impresoraId: 41,
    },
    {
      id: 182,
      numeroSerie: "NEUMO-003",
      remito: null,
      proveedorId: 6,
      impresoraId: 41,
    },
    {
      id: 183,
      numeroSerie: "LICENCIAS-02",
      remito: null,
      proveedorId: 6,
      impresoraId: 41,
    },
    {
      id: 184,
      numeroSerie: "BRB5644G63",
      remito: null,
      proveedorId: 21,
      impresoraId: 5,
    },
    {
      id: 185,
      numeroSerie: "AMM",
      remito: null,
      proveedorId: 1,
      impresoraId: 29,
    },
    {
      id: 186,
      numeroSerie: "5160Z931343",
      remito: null,
      proveedorId: 7,
      impresoraId: 40,
    },
    {
      id: 187,
      numeroSerie: "5160Z931377",
      remito: null,
      proveedorId: 23,
      impresoraId: 40,
    },
    {
      id: 188,
      numeroSerie: "OFTALMO-1",
      remito: null,
      proveedorId: 11,
      impresoraId: 40,
    },
    {
      id: 189,
      numeroSerie: "CM4IMP1",
      remito: null,
      proveedorId: 11,
      impresoraId: 43,
    },
    {
      id: 190,
      numeroSerie: "CARDIO2",
      remito: null,
      proveedorId: 11,
      impresoraId: 40,
    },
    {
      id: 191,
      numeroSerie: "ARQ-1",
      remito: null,
      proveedorId: 11,
      impresoraId: 40,
    },
    {
      id: 192,
      numeroSerie: "NEONATO-001",
      remito: null,
      proveedorId: 21,
      impresoraId: 41,
    },
    {
      id: 193,
      numeroSerie: "3388685203",
      remito: null,
      proveedorId: 3,
      impresoraId: 20,
    },
    {
      id: 194,
      numeroSerie: "58732530807",
      remito: null,
      proveedorId: 23,
      impresoraId: 43,
    },
    {
      id: 195,
      numeroSerie: "58727732605",
      remito: null,
      proveedorId: 11,
      impresoraId: 43,
    },
    {
      id: 196,
      numeroSerie: "ODONTO-1",
      remito: null,
      proveedorId: 23,
      impresoraId: 41,
    },
    {
      id: 197,
      numeroSerie: "ODONTO-2",
      remito: null,
      proveedorId: 23,
      impresoraId: 41,
    },
    {
      id: 198,
      numeroSerie: "ODONTO-3",
      remito: null,
      proveedorId: 23,
      impresoraId: 41,
    },
    {
      id: 199,
      numeroSerie: "GUARDIA-VENT1",
      remito: null,
      proveedorId: 23,
      impresoraId: 42,
    },
    {
      id: 200,
      numeroSerie: "5873Z730428",
      remito: null,
      proveedorId: 11,
      impresoraId: 43,
    },
    {
      id: 201,
      numeroSerie: "UROLOGIA1",
      remito: null,
      proveedorId: 5,
      impresoraId: 41,
    },
    {
      id: 202,
      numeroSerie: "GUARDIA-HHCC-001",
      remito: null,
      proveedorId: 5,
      impresoraId: 25,
    },
    {
      id: 203,
      numeroSerie: "GUARDIA HHCC-1",
      remito: null,
      proveedorId: 5,
      impresoraId: 27,
    },
    {
      id: 204,
      numeroSerie: "5872Z732600",
      remito: null,
      proveedorId: 23,
      impresoraId: 43,
    },
    {
      id: 205,
      numeroSerie: "PSICO-001",
      remito: null,
      proveedorId: 5,
      impresoraId: 25,
    },
    {
      id: 206,
      numeroSerie: "BRBFC87MJR",
      remito: null,
      proveedorId: 27,
      impresoraId: 1,
    },
    {
      id: 207,
      numeroSerie: "3021577323",
      remito: null,
      proveedorId: 5,
      impresoraId: 25,
    },
    {
      id: 208,
      numeroSerie: "S/N",
      remito: null,
      proveedorId: 11,
      impresoraId: 41,
    },
    {
      id: 209,
      numeroSerie: "QQY157733",
      remito: null,
      proveedorId: 3,
      impresoraId: 26,
    },
    {
      id: 210,
      numeroSerie: "5337981803",
      remito: null,
      proveedorId: 3,
      impresoraId: 26,
    },
    {
      id: 211,
      numeroSerie: "5337981390",
      remito: null,
      proveedorId: 3,
      impresoraId: 26,
    },
    {
      id: 212,
      numeroSerie: "0000000000",
      remito: null,
      proveedorId: 7,
      impresoraId: 40,
    },
    {
      id: 213,
      numeroSerie: "00000000000",
      remito: null,
      proveedorId: 7,
      impresoraId: 40,
    },
    {
      id: 214,
      numeroSerie: "00000001",
      remito: null,
      proveedorId: 27,
      impresoraId: 16,
    },
    {
      id: 215,
      numeroSerie: "0000123",
      remito: null,
      proveedorId: 7,
      impresoraId: 41,
    },
    {
      id: 216,
      numeroSerie: "33800475587",
      remito: null,
      proveedorId: 5,
      impresoraId: 15,
    },
    {
      id: 217,
      numeroSerie: "5337981765",
      remito: null,
      proveedorId: 3,
      impresoraId: 26,
    },
    {
      id: 218,
      numeroSerie: "1AG923781",
      remito: null,
      proveedorId: 3,
      impresoraId: 28,
    },
    {
      id: 219,
      numeroSerie: "5873Z730434",
      remito: null,
      proveedorId: 7,
      impresoraId: 43,
    },
    {
      id: 220,
      numeroSerie: "5874ZA30141",
      remito: null,
      proveedorId: 23,
      impresoraId: 43,
    },
    {
      id: 221,
      numeroSerie: "31612930412",
      remito: null,
      proveedorId: 7,
      impresoraId: 40,
    },
    {
      id: 222,
      numeroSerie: "0000000000000",
      remito: null,
      proveedorId: 7,
      impresoraId: 2,
    },
    {
      id: 223,
      numeroSerie: "5160ZC30034",
      remito: null,
      proveedorId: 7,
      impresoraId: 43,
    },
    {
      id: 224,
      numeroSerie: "3380483296-PSICOPATO",
      remito: null,
      proveedorId: 7,
      impresoraId: 15,
    },
    {
      id: 225,
      numeroSerie: "5852ZC30223",
      remito: null,
      proveedorId: 27,
      impresoraId: 42,
    },
    {
      id: 226,
      numeroSerie: "5337983253",
      remito: null,
      proveedorId: 3,
      impresoraId: 26,
    },
    {
      id: 227,
      numeroSerie: "5337984195",
      remito: null,
      proveedorId: 3,
      impresoraId: 26,
    },
    {
      id: 228,
      numeroSerie: "5337984608",
      remito: null,
      proveedorId: 3,
      impresoraId: 26,
    },
    {
      id: 229,
      numeroSerie: "5337984616",
      remito: null,
      proveedorId: 3,
      impresoraId: 26,
    },
    {
      id: 230,
      numeroSerie: "5337984543",
      remito: null,
      proveedorId: 3,
      impresoraId: 26,
    },
    {
      id: 231,
      numeroSerie: "5337985493",
      remito: null,
      proveedorId: 3,
      impresoraId: 26,
    },
  ];

  const Repuestos = [
    { id: 1, repuesto: "Fuente 500W ATX" },
    { id: 2, repuesto: "Teclado USB" },
    { id: 3, repuesto: "Mouse Óptico USB" },
    { id: 4, repuesto: "Disco SSD 240GB" },
  ];

  async function runSeeder() {
    try {
      await sequelize.authenticate();
      console.log("✅ Conectado a la base");

      await Proveedor.bulkCreate(proveedores, { ignoreDuplicates: true });
      await sequelize.query(
        "SELECT setval('proveedores_id_seq', (SELECT MAX(id) FROM proveedores))"
      );
      console.log("✅ Proveedores cargados");

      await Servicio.bulkCreate(servicios, { ignoreDuplicates: true });
      await sequelize.query(
        "SELECT setval('servicios_id_seq', (SELECT MAX(id) FROM servicios))"
      );
      console.log("✅ Servicios cargados");

      await Marca.bulkCreate(marcas, { ignoreDuplicates: true });
      await sequelize.query(
        "SELECT setval('marcas_id_seq', (SELECT MAX(id) FROM marcas))"
      );
      console.log("✅ Marcas cargadas");

      await Modelo.bulkCreate(modelos, { ignoreDuplicates: true });
      await sequelize.query(
        "SELECT setval('modelos_id_seq', (SELECT MAX(id) FROM modelos))"
      );
      console.log("✅ Modelos cargados");

      await Insumo.bulkCreate(insumos, { ignoreDuplicates: true });
      await sequelize.query(
        "SELECT setval('insumos_id_seq', (SELECT MAX(id) FROM insumos))"
      );
      console.log("✅ insumos cargados");

      await ModeloInsumo.bulkCreate(modelosInsumos, { ignoreDuplicates: true });
      console.log("✅ modelos insumos cargados");

      await Impresora.bulkCreate(impresoras, { ignoreDuplicates: true });
      await sequelize.query(
        "SELECT setval('impresoras_id_seq', (SELECT MAX(id) FROM impresoras))"
      );
      console.log("✅ Impresoras cargadas");

      await ImpresoraFisica.bulkCreate(impresoraFisica, {
        ignoreDuplicates: true,
      });
      await sequelize.query(
        "SELECT setval(pg_get_serial_sequence('impresora_Fisica','id'), (SELECT MAX(id) FROM impresora_Fisica));"
      );
      console.log("✅ Impresoras físicas cargadas");

      await Repuesto.bulkCreate(Repuestos, {
        ignoreDuplicates: true,
      });
      await sequelize.query(
        "SELECT setval(pg_get_serial_sequence('repuestos','id'), (SELECT MAX(id) FROM repuestos));"
      );
      console.log("✅ Repuestos cargados");

      await sequelize.close();
    } catch (err) {
      console.error("❌ Error en el seeder:", err);
    }
  }

  runSeeder();
}

/*Lo corremos con: node seed_inicial.js*/
