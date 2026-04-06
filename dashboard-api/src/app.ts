import express, { type Express } from "express";
import { type Server } from "node:http";
import { userRouter } from "./users/users.js";

export class App {
  app: Express;
  server: Server;
  port: number;

  constructor() {
    this.app = express();
    this.port = 8003;
  }

  useRoutes() {
    this.app.use("/users", userRouter);
  }

  async init() {
    this.useRoutes();
    this.server = this.app.listen(this.port);
    console.log(`Сервер запущен на http://localhost:${this.port}`);
  }
}
