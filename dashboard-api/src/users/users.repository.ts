import type { UserModel } from "@prisma/client";
import { inject } from "inversify";
import type { User } from "./user.entity.ts";
import type { IUsersRepository } from "./users.repository.interface.ts";
import { TYPES } from "../types.ts";
import type { PrismaService } from "../database/prisma.service.ts";

export class UsersRepository implements IUsersRepository {
  constructor(
    @inject(TYPES.PrismaService) private prismaService: PrismaService,
  ) {}

  async create(user: User): Promise<UserModel> {
    return this.prismaService.client.userModel.create({
      data: {
        name: user.name,
        email: user.email,
        password: user.password,
      },
    });
  }

  async find(email: string): Promise<UserModel | null> {
    return this.prismaService.client.userModel.findFirst({
      where: {
        email,
      },
    });
  }
}
