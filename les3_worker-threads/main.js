const factorial = require("./factorial");

const compute = (array) => {
  const arr = [];
  for (let index = 0; index < 100_000_000; index++) {
    arr.push(Math.random() * index * index);
  }
  return array.map((el) => factorial(el));
};

const main = () => {
  performance.mark("start");

  const result = [
    compute([34, 24, 17, 12, 34, 6]),
    compute([34, 24, 17, 12, 34, 6]),
    compute([34, 24, 17, 12, 34, 6]),
    compute([34, 24, 17, 12, 34, 6]),
  ];
  console.log(result);

  performance.mark("end");

  performance.measure("main", "start", "end");

  console.log(performance.getEntriesByName("main").at(-1));
};

setTimeout(() => console.log("Timeout"), 2000);

main();
