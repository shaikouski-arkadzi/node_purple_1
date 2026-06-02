import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "@prisma/client";
import { inject, injectable } from "inversify";
import path from "node:path";
import type { ILogger } from "../logger/logger.interface.ts";
import { TYPES } from "../types.ts";

@injectable()
export class PrismaService {
  client: PrismaClient;

  constructor(@inject(TYPES.ILogger) private logger: ILogger) {
    const adapter = new PrismaBetterSqlite3({ url: path.resolve("dev.db") });
    this.client = new PrismaClient({
      adapter: adapter,
      log: ["error", "warn"],
    });
  }

  async connect(): Promise<void> {
    try {
      await this.client.$connect();
      this.logger.log("[PrismaService] Успешно подключились к БД");
    } catch (error) {
      if (error instanceof Error) {
        this.logger.log(
          "[PrismaService] Ошибка подключения к БД: " + error.message,
        );
      }
      throw error;
    }
  }

  async disconnect(): Promise<void> {
    await this.client.$disconnect();
  }
}
