import { App } from "./app.js";
import { LoggerService } from "./logger/logger.service.js";
import { UserController } from "./users/users.controller.js";

async function main() {
  const logger = new LoggerService();
  const app = new App(logger, new UserController(logger));
  await app.init();
}

main();
