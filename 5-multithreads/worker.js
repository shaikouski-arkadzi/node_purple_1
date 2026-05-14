const { parentPort, workerData } = require("worker_threads");

const count = workerData.filter((num) => num % 3 === 0).length;

parentPort.postMessage(count);
