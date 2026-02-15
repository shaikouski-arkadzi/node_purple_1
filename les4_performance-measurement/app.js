const perf_hooks = require("perf_hooks");

test = perf_hooks.performance.timerify(test);

const performanceObserver = new perf_hooks.PerformanceObserver(
  /* items=mark */
  (items, observer) => {
    console.log(items.getEntries());
    const entry = items.getEntriesByName("slow").at(-1);
    console.log(`${entry.name}: ${entry.duration}`);
    observer.disconnect;
  },
);
performanceObserver.observe({ entryTypes: ["measure", "function"] });

function test() {
  const arr = [];
  for (let index = 0; index < 10_000_000; index++) {
    arr.push(Math.random() * index * index);
  }
}

function slow() {
  performance.mark("start");
  const arr = [];
  for (let index = 0; index < 10_000_000; index++) {
    arr.push(Math.random() * index * index);
  }
  performance.mark("end");
  performance.measure("slow", "start", "end");
  // console.log(performance.getEntriesByName("slow"));
}

slow();
test();
