//system async calls
const https = require("https");

const start = performance.now();

for (let i = 0; i < 50; i++) {
  https.get("https://www.youtube.com/", (res) => {
    res.on("data", () => {});
    res.on("end", () => console.log(performance.now() - start));
  });
}
