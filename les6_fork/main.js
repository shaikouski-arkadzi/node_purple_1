const { fork } = require("child_process");

const forkProcess = fork("fork.js");

forkProcess.on("message", (msg) => console.log(msg));
forkProcess.on("close", (code) => console.log(code));

forkProcess.send("Ping");
