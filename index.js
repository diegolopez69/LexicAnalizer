const { analize } = require("./logic");

const tryHere = "arroz = 1 != 2; pollo == 5; prueba = 12 == 5 > 5 < sol;";

console.log(analize(tryHere));