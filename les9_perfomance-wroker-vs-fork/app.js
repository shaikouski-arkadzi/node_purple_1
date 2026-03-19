const { Worker } = require("worker_threads");
const { fork } = require("child_process");
const { performance, PerformanceObserver } = require("perf_hooks");

const performanceObserver = new PerformanceObserver((items) => {
  items.getEntries().forEach((entry) => {
    console.log(entry.name, entry.duration);
  });
});
performanceObserver.observe({ entryTypes: ["measure"] });

const workerFunc = (array) => {
  return new Promise((resolve, reject) => {
    performance.mark("worker start");

    const worker = new Worker("./worker.js", {
      workerData: { array },
    });
    worker.on("message", (msg) => {
      performance.mark("worker end");
      performance.measure("worker", "worker start", "worker end");
      resolve(msg);
    });
  });
};

const forkFunc = (array) => {
  return new Promise((resolve, reject) => {
    performance.mark("fork start");

    const forkProcess = fork("./fork.js");
    forkProcess.send({ array });
    forkProcess.on("message", (msg) => {
      performance.mark("fork end");
      performance.measure("fork", "fork start", "fork end");
      resolve(msg);
    });
  });
};

const main = async () => {
  await workerFunc([30, 45, 5, 17, 23]);
  await forkFunc([30, 45, 5, 17, 23]);
};

main();
