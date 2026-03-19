// node --expose-gc --trace_gc_verbose app.js

let outter = null;
let run = function () {
  let inner = outter;
  let unused = function () {
    if (inner) console.log("hi");
  };
  outter = {
    longStr: new Array(1000000).join("*"),
  };
};
setInterval(run, 1000);
