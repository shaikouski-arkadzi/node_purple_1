import express, { type Express } from "express";
import { type Server } from "node:http";
import type { UserController } from "./users/users.controller.js";
import type { LoggerService } from "./logger/logger.service.js";

export class App {
  app: Express;
  server: Server;
  port: number;
  logger: LoggerService;
  userController: UserController;

  constructor(logger: LoggerService, userController: UserController) {
    this.app = express();
    this.port = 8003;
    this.logger = logger;
    this.userController = userController;
  }

  useRoutes() {
    this.app.use("/users", this.userController.router);
  }

  async init() {
    this.useRoutes();
    this.server = this.app.listen(this.port);
    this.logger.log(`Сервер запущен на http://localhost:${this.port}`);
  }
}
