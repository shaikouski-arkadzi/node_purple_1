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

describe("Users service", () => {
  it("Create user", async () => {
    configService.get = jest.fn().mockReturnValueOnce("1");
    usersRepository.create = jest.fn().mockImplementationOnce(
      (user: User): UserModel => ({
        name: user.name,
        email: user.email,
        password: user.password,
        id: 1,
      }),
    );
    const createdUser = await usersService.createUser({
      email: "a@email.com",
      name: "Ark",
      password: "123",
    });
    expect(createdUser?.id).toEqual(1);
    expect(createdUser?.password).not.toEqual(1);
  });

  it("Validate user - success", async () => {
    const createdUser = await usersService.createUser({
      email: "a@email.com",
      name: "Ark",
      password: "123",
    });

    usersRepository.find = jest.fn().mockReturnValueOnce(createdUser);
    const res = await usersService.validateUser({
      email: "a@email.com",
      password: "123",
    });
    expect(res).toBeTruthy();
  });
});
