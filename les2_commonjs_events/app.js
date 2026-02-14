const EventEmmiter = require("events");

const myEmitter = new EventEmmiter();

const logDbConnection = () => console.log("DB connected");

myEmitter.addListener("connected", logDbConnection);

myEmitter.emit("connected");

myEmitter.removeListener("connected", logDbConnection);
// myEmitter.removeAllListeners("connected");

myEmitter.emit("connected");

myEmitter.on("message", (data) => console.log(data));

myEmitter.emit("message", "Hello");

// Для однократной обработки события использовать once
myEmitter.once("off", () => console.log("once"));
myEmitter.emit("off");
myEmitter.emit("off");

// Максимум слушателей
console.log(myEmitter.getMaxListeners());
myEmitter.setMaxListeners(2);
console.log(myEmitter.getMaxListeners());
console.log(myEmitter.listenerCount("message"));
console.log(myEmitter.listenerCount("off"));
console.log(myEmitter.listeners("message"));

// Управление очередью подписиков. Вставка в начало, вместо дефолтного в конец
myEmitter.prependListener("message", () => console.log("prepend"));
console.log(myEmitter.listeners("message"));

console.log(myEmitter.eventNames());

myEmitter.on("error", (err) => console.log(`Error: ${err}`));
myEmitter.emit("error", new Error("MyError"));

// EventTarget
const target = new EventTarget();

const logTarget = () => console.log("Connected to target");

target.addEventListener("connected", logTarget);

target.dispatchEvent(new Event("connected"));
