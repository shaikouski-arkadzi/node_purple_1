import express, { type Express } from "express";
import { type Server } from "node:http";
import { inject, injectable } from "inversify";
import type { UserController } from "./users/users.controller.ts";
import { ExeptionFilter } from "./errors/exeption.filter.ts";
import { TYPES } from "./types.ts";
import type { ILogger } from "./logger/logger.interface.ts";
import type { IConfigService } from "./config/config.service.interface.ts";
import type { PrismaService } from "./database/prisma.service.ts";

@injectable()
export class App {
  app: Express;
  server: Server;
  port: number;

  constructor(
    @inject(TYPES.ILogger) private logger: ILogger,
    @inject(TYPES.UserController) private userController: UserController,
    @inject(TYPES.ExeptionFilter) private exeptionFilter: ExeptionFilter,
    @inject(TYPES.ConfigService) private configService: IConfigService,
    @inject(TYPES.PrismaService) private prismaService: PrismaService,
  ) {
    this.app = express();
    this.port = 8003;
    this.logger = logger;
    this.userController = userController;
    this.exeptionFilter = exeptionFilter;
  }

  useMiddleware() {
    this.app.use(express.json());
  }

  useRoutes() {
    this.app.use("/users", this.userController.router);
  }

  useExeptionFilters() {
    this.app.use(this.exeptionFilter.catch.bind(this.exeptionFilter));
  }

  async init() {
    this.useMiddleware();
    this.useRoutes();
    this.useExeptionFilters();
    await this.prismaService.connect();
    this.server = this.app.listen(this.port);
    this.logger.log(`Сервер запущен на http://localhost:${this.port}`);
  }
}
