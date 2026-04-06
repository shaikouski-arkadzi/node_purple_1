import express, {
  type Request,
  type Response,
  type NextFunction,
} from "express";

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

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log(err.message);
  res.status(500);
});

app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
});
