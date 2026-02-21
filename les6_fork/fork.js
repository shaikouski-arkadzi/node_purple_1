process.on("message", (msg) => {
  console.log(msg);
  if (msg === "Ping") {
    process.send("Pong");
  }
  process.disconnect();
});
