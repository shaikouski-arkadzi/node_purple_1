import "reflect-metadata";
import { Container } from "inversify";
import type { IConfigService } from "../config/config.service.interface.ts";
import type { IUsersRepository } from "./users.repository.interface.ts";
import type { IUserService } from "./users.service.interface.ts";
import { UserService } from "./users.service.ts";
import { TYPES } from "../types.ts";
import type { User } from "./user.entity.ts";
import type { UserModel } from "@prisma/client";

const ConfigServiceMock: IConfigService = {
  get: jest.fn(),
};

const UsersRepositoryMock: IUsersRepository = {
  find: jest.fn(),
  create: jest.fn(),
};

const container = new Container();
let configService: IConfigService;
let usersRepository: IUsersRepository;
let usersService: IUserService;

// выполняется перед всемии тестами
beforeAll(() => {
  container.bind<IUserService>(TYPES.UserService).to(UserService);
  container
    .bind<IConfigService>(TYPES.ConfigService)
    .toConstantValue(ConfigServiceMock);
  container
    .bind<IUsersRepository>(TYPES.UsersRepository)
    .toConstantValue(UsersRepositoryMock);

  configService = container.get<IConfigService>(TYPES.ConfigService);
  usersRepository = container.get<IUsersRepository>(TYPES.UsersRepository);
  usersService = container.get<IUserService>(TYPES.UserService);
});
