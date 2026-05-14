const os = require("os");
const path = require("path");
const { Worker } = require("worker_threads");

const MAX = 300_000;

const numbers = Array.from({ length: MAX }, (_, i) => i + 1);

// ======================================================
// SINGLE THREAD
// ======================================================

console.log("\n=== SINGLE THREAD ===");

console.time("single-thread");

let singleCount = 0;

for (let i = 0; i < numbers.length; i++) {
  if (numbers[i] % 3 === 0) {
    singleCount++;
  }
}

console.timeEnd("single-thread");

console.log("Result:", singleCount);

// ======================================================
// MULTI THREAD
// ======================================================

console.log("\n=== MULTI THREAD ===");

const cpuCount = os.cpus().length;

console.log("CPU cores:", cpuCount);

const chunkSize = Math.ceil(numbers.length / cpuCount);

let totalCount = 0;
let finished = 0;

console.time("multi-thread");

for (let i = 0; i < cpuCount; i++) {
  const start = i * chunkSize;
  const end = start + chunkSize;

  const worker = new Worker(path.resolve(__dirname, "./worker.js"), {
    workerData: numbers.slice(start, end),
  });

  worker.on("message", (count) => {
    totalCount += count;
  });

  worker.on("exit", () => {
    finished++;

    if (finished === cpuCount) {
      console.timeEnd("multi-thread");

      console.log("Result:", totalCount);
    }
  });
}
