import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "@prisma/client";
import { injectable } from "inversify";

@injectable()
export class PrismaService {
  client: PrismaClient;

  constructor() {
    const adapter = new PrismaBetterSqlite3({ url: "../../dev.db" });
    this.client = new PrismaClient({
      adapter: adapter,
      log: [],
    });
  }

  async connect(): Promise<void> {
    await this.client.$connect();
  }

  async disconnect(): Promise<void> {
    await this.client.$disconnect();
  }
}
