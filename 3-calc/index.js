const add = require("./add.js");
const multiply = require("./multiply.js");

const [_, __, a, b, operator] = process.argv;

const result = {
  add,
  subtract: (a, b) => a - b,
  multiply,
  divide: (a, b) => a / b,
}[operator](Number(a), Number(b));

console.log(result);
