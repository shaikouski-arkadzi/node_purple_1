const { parentPort, workerData } = require("worker_threads");
const factorial = require("./factorial");

const compute = ({ array }) => {
  const arr = [];
  for (let index = 0; index < 100_000_000; index++) {
    arr.push(Math.random() * index * index);
  }
  return array.map((el) => factorial(el));
};

parentPort.postMessage(compute(workerData));
