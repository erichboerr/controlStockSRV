const insumos = [
  { insumo: "85A", stock_minimo: 5 }, //1
  { insumo: "78A", stock_minimo: 5 }, //2
  { insumo: "05A", stock_minimo: 5, flagHabilitado: false }, //3
  { insumo: "06A", stock_minimo: 5, flagHabilitado: false }, //4
  { insumo: "12A", stock_minimo: 5 }, //5
  { insumo: "80A", stock_minimo: 5 }, //6
  { insumo: "83A", stock_minimo: 5 }, //7
  { insumo: "35A", stock_minimo: 5, flagHabilitado: false }, //8
  { insumo: "49A", stock_minimo: 5, flagHabilitado: false }, //9
  { insumo: "55A", stock_minimo: 5, flagHabilitado: false }, //10
  { insumo: "36A", stock_minimo: 5, flagHabilitado: false }, //11
  { insumo: "79A", stock_minimo: 5 }, //12
  { insumo: "105A / 1105A", stock_minimo: 5 }, //13
  { insumo: "106R02778 TONER", stock_minimo: 5 }, //14
  { insumo: "101R474 DRUMS", stock_minimo: 5 }, //15
  { insumo: "106R02773 TONER", stock_minimo: 5 }, //16
  { insumo: "106R1536 TONER", stock_minimo: 5 }, //17
  { insumo: "113R00762 DRUMS", stock_minimo: 5 }, //18
  {
    insumo: "115R00070X UNIDAD DE IMAGEN",
    stock_minimo: 0,
    flagHabilitado: false,
  }, //19
  { insumo: "106R01601 CYAN TONER", stock_minimo: 5, flagHabilitado: false }, //20
  { insumo: "106R01602 RED TONER", stock_minimo: 5, flagHabilitado: false }, //21
  { insumo: "106R01603 YELLOW TONER", stock_minimo: 5, flagHabilitado: false }, //22
  { insumo: "106R01604 BLACK TONER", stock_minimo: 5, flagHabilitado: false }, //23
  {
    insumo: "676k05360 Unidad de imagen",
    stock_minimo: 0,
    flagHabilitado: false,
  }, //24
  { insumo: "106R02732 TONER", stock_minimo: 5 }, //25
  { insumo: "113R00773 DRUMS", stock_minimo: 5 }, //26
  { insumo: "106R03623N", stock_minimo: 5 }, //27
  { insumo: "999W3550 TONER", stock_minimo: 5 }, //28
  { insumo: "106R1501 DRUMS", stock_minimo: 5 }, //29
  { insumo: "106R01305 TONER", stock_minimo: 5 }, //30
  { insumo: "101R0435 DRUMS", stock_minimo: 5 }, //31
  {
    insumo: "106R03478 MAGENTA TONER {XL}",
    stock_minimo: 5,
    flagHabilitado: false,
  }, //32
  {
    insumo: "106R03479 AMARILLO TONER {XL}",
    stock_minimo: 5,
    flagHabilitado: false,
  }, //33
  {
    insumo: "106R03477 CYAN TONER {XL}",
    stock_minimo: 5,
    flagHabilitado: false,
  }, //34
  {
    insumo: "106R03480 NEGRO TONER {XL}",
    stock_minimo: 5,
    flagHabilitado: false,
  }, //35
  {
    insumo: "108R01416 CARTUCHO DE RESIDUOS",
    stock_minimo: 0,
    flagHabilitado: false,
  }, //36
  { insumo: "106R04347 TONER B210/B215 ", stock_minimo: 5 }, //37
  { insumo: "101R00664 DRUM B210/B215 ", stock_minimo: 2 }, //38
  {
    insumo: "006R04404 / B230 TONER",
    stock_minimo: 5,
    flagHabilitado: true,
  }, //39
  { insumo: "013R00691 / B230 DRUM", stock_minimo: 2 }, //40
  { insumo: "6R04730 / B415 TONER", stock_minimo: 5 }, //41
  { insumo: "013R00702 / B415 DRUM", stock_minimo: 2 }, //42
  {
    insumo: "106R03945 / B610 TONER",
    stock_minimo: 5,
    flagHabilitado: true,
  }, //43
  {
    insumo: "101R00582 / B610 DRUM",
    stock_minimo: 2,
    flagHabilitado: true,
  }, //44
  {
    insumo: "006R01683 / B8075 TONER",
    stock_minimo: 5,
    flagHabilitado: true,
  }, //45
  {
    insumo: "013R00675 / B8075 DRUM",
    stock_minimo: 5,
    flagHabilitado: true,
  }, //46
  { insumo: "TN1060 TONER", stock_minimo: 5 }, //47
  { insumo: "DR1060 DRUMS", stock_minimo: 5 }, //48
  { insumo: "TN450 TONER {XL}", stock_minimo: 5 }, //49
  { insumo: "DR420 DRUMS", stock_minimo: 2 }, //50
  { insumo: "TN650 TONER {XL}", stock_minimo: 5 }, //51
  { insumo: "DR620 DRUMS", stock_minimo: 5 }, //52
  { insumo: "E260A11L", stock_minimo: 5 }, //53
  { insumo: "E260X22G DRUMS", stock_minimo: 5 }, //54
  { insumo: "E250A11L TONER", stock_minimo: 5 }, //55
  { insumo: "E250X22G DRUMS", stock_minimo: 2 }, //56
  { insumo: "TK-3182 TONER", stock_minimo: 5 }, //57
  { insumo: "DK-3192 DRUM", stock_minimo: 2 }, //58
  { insumo: "TK-5232K BLACK TONER", stock_minimo: 5 }, //59
  { insumo: "TK-5232C CYAN TONER", stock_minimo: 5 }, //60
  {
    insumo: "TK-5232M MAGENTA TONER",
    stock_minimo: 5,
    flagHabilitado: true,
  }, //61
  { insumo: "TK-5232Y YELLOW TONER", stock_minimo: 5 }, //62
  { insumo: "TK-1150/52 TONER", stock_minimo: 5 }, //63
  { insumo: "MLT203 TONER|", stock_minimo: 5 }, //64
  { insumo: "MLT-D105L TONER", stock_minimo: 5 }, //65
  { insumo: "SP3710 TONER", stock_minimo: 5 }, //66
  { insumo: "M600", stock_minimo: 5 }, //67
  { insumo: "101R00555N DRUM", stock_minimo: 2 }, //68
  { insumo: "108R01417 CYAN DRUMS", stock_minimo: 5 }, //69
  {
    insumo: "108R01418 MAGENTA DRUMS",
    stock_minimo: 5,
    flagHabilitado: true,
  }, //70
  {
    insumo: "108R01419 AMARILLO DRUMS",
    stock_minimo: 5,
    flagHabilitado: true,
  }, //71
  { insumo: "108R01420 NEGRO DRUMS", stock_minimo: 5 }, //72
  {
    insumo: "106R3488/92 NEGRO TONER",
    stock_minimo: 5,
    flagHabilitado: true,
  }, //73
  {
    insumo: "106R3694AL MAGENTA TONER",
    stock_minimo: 5,
    flagHabilitado: true,
  }, //74
  {
    insumo: "106R3489/93 CYAN TONER",
    stock_minimo: 5,
    flagHabilitado: true,
  }, //75
  {
    insumo: "106R3695AL YELLOW TONER",
    stock_minimo: 5,
    flagHabilitado: true,
  }, //76
  {
    insumo: "JC91-01034B FUSOR XEROX 3225",
    stock_minimo: 5,
    flagHabilitado: true,
  }, //77
  {
    insumo: "115R00085 KIT MANTENIMIENTO FUSOR",
    stock_minimo: 5,
    flagHabilitado: true,
  }, //78
  {
    insumo: "CBT-CB435A/436A/CE285A/CE278A",
    stock_minimo: 5,
    flagHabilitado: true,
  }, //79
  { insumo: "M300/M320", stock_minimo: 5 }, //!<averiguar>
  { insumo: "3020 TONER", stock_minimo: 5 }, //!<averiguar>  
];
