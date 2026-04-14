import { Container } from "inversify";
import { App } from "./app.ts";
import { ExeptionFilter } from "./errors/exeption.filter.ts";
import { LoggerService } from "./logger/logger.service.ts";
import { UserController } from "./users/users.controller.ts";
import type { ILogger } from "./logger/logger.interface.ts";
import type { IExeptionFilter } from "./errors/exeption.filter.interface.ts";
import { TYPES } from "./types.ts";

const appContainer = new Container();

appContainer.bind<ILogger>(TYPES.ILogger).to(LoggerService);
appContainer.bind<IExeptionFilter>(TYPES.ExeptionFilter).to(ExeptionFilter);
appContainer.bind<UserController>(TYPES.UserController).to(UserController);
appContainer.bind<App>(TYPES.Application).to(App);

const app = appContainer.get<App>(TYPES.Application);
app.init();

export { app, appContainer };
