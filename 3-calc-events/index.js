const EventEmitter = require("events");

const add = require("./add.js");
const multiply = require("./multiply.js");

const myEmitter = new EventEmitter();

const [_, __, a, b, operator] = process.argv;

const x = Number(a);
const y = Number(b);

myEmitter.on("add", (a, b) => {
  myEmitter.emit("result", add(a, b));
});

myEmitter.on("multiply", (a, b) => {
  myEmitter.emit("result", multiply(a, b));
});

myEmitter.on("subtract", (a, b) => {
  myEmitter.emit("result", a - b);
});

myEmitter.on("divide", (a, b) => {
  myEmitter.emit("result", a / b);
});

myEmitter.on("result", (result) => {
  console.log(result);
});

myEmitter.emit(operator, x, y);
