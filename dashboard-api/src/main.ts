import { App } from "./app.js";
import { LoggerService } from "./logger/logger.service.js";

async function main() {
  const app = new App(new LoggerService());
  await app.init();
}

main();
