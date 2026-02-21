const { Worker } = require("worker_threads");

const compute = (array) => {
  return new Promise((resolve, reject) => {
    const worker = new Worker("./worker.js", {
      workerData: {
        array,
      },
    });
    worker.on("message", (msg) => resolve(msg));
    worker.on("error", (err) => reject(err));
    worker.on("exit", () => console.log("Done"));
  });
};

const main = async () => {
  try {
    performance.mark("start");

    const result = await Promise.all([
      compute([34, 24, 17, 12, 34, 6]),
      compute([34, 24, 17, 12, 34, 6]),
      compute([34, 24, 17, 12, 34, 6]),
      compute([34, 24, 17, 12, 34, 6]),
    ]);
    console.log(result);

    performance.mark("end");

    performance.measure("main", "start", "end");

    console.log(performance.getEntriesByName("main").at(-1));
  } catch (error) {
    console.error(error.message);
  }
};

setTimeout(() => console.log("Timeout"), 2000);

main();
