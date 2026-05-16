import { inject, injectable } from "inversify";
import type { IConfigService } from "./config.service.interface.ts";
import {
  config,
  type DotenvConfigOutput,
  type DotenvParseOutput,
} from "dotenv";
import { TYPES } from "../types.ts";
import type { ILogger } from "../logger/logger.interface.ts";

@injectable()
export class ConfigService implements IConfigService {
  private config: DotenvParseOutput;
  constructor(@inject(TYPES.ILogger) private logger: ILogger) {
    const result: DotenvConfigOutput = config();
    if (result.error) {
      this.logger.error("Не удалось прочитать .env");
    } else {
      this.config = result.parsed!;
    }
  }

  get<T extends number | string>(key: string): T {
    return this.config[key] as T;
  }
}
