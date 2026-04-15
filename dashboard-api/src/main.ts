import { Container, ContainerModule } from "inversify";
import { App } from "./app.ts";
import { ExeptionFilter } from "./errors/exeption.filter.ts";
import { LoggerService } from "./logger/logger.service.ts";
import { UserController } from "./users/users.controller.ts";
import type { ILogger } from "./logger/logger.interface.ts";
import type { IExeptionFilter } from "./errors/exeption.filter.interface.ts";
import { TYPES } from "./types.ts";

export const appBinding = new ContainerModule(({ bind }) => {
  bind<ILogger>(TYPES.ILogger).to(LoggerService);
  bind<IExeptionFilter>(TYPES.ExeptionFilter).to(ExeptionFilter);
  bind<UserController>(TYPES.UserController).to(UserController);
  bind<App>(TYPES.Application).to(App);
});

function main() {
  const appContainer = new Container();
  appContainer.load(appBinding);
  const app = appContainer.get<App>(TYPES.Application);
  app.init();
  return { appContainer, app };
}

export const { app, appContainer } = main();
