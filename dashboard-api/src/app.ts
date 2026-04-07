import express, { type Express } from "express";
import { type Server } from "node:http";
import { userRouter } from "./users/users.js";
import type { LoggerService } from "./logger/logger.service.js";

export class App {
  app: Express;
  server: Server;
  port: number;
  logger: LoggerService;

  constructor(logger: LoggerService) {
    this.app = express();
    this.port = 8003;
    this.logger = logger;
  }

  useRoutes() {
    this.app.use("/users", userRouter);
  }

  async init() {
    this.useRoutes();
    this.server = this.app.listen(this.port);
    this.logger.log(`Сервер запущен на http://localhost:${this.port}`);
  }
}
