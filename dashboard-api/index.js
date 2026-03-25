import express from "express";

const port = 8003;

const app = express();

app.use((req, res, next) => {
  console.log(Date.now());
  next();
});

app.get("/hello", (req, res) => {
  res.send("Hi");
});

app.get("/error", (req, res) => {
  throw new Error("Error!");
});

app.use((err, req, res, next) => {
  console.log(err.message);
  res.status(500);
});

app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
});
