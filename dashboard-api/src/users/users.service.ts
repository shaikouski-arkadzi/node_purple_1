import { inject, injectable } from "inversify";
import type { UserModel } from "@prisma/client";
import type { UserLoginDto } from "./dto/user-login.dto.ts";
import type { UserRegisterDto } from "./dto/user-register.dto.ts";
import { User } from "./user.entity.ts";
import type { IUserService } from "./users.service.interface.ts";
import { TYPES } from "../types.ts";
import type { IConfigService } from "../config/config.service.interface.ts";
import type { IUsersRepository } from "./users.repository.interface.ts";

@injectable()
export class UserService implements IUserService {
  constructor(
    @inject(TYPES.ConfigService) private configService: IConfigService,
    @inject(TYPES.UsersRepository) private usersRepository: IUsersRepository,
  ) {}

  async createUser({
    email,
    name,
    password,
  }: UserRegisterDto): Promise<UserModel | null> {
    const newUser = new User(email, name);
    const salt = this.configService.get<number>("SALT");
    console.log(salt);
    await newUser.setPassword(password, salt);
    const existedUser = await this.usersRepository.find(email);
    if (existedUser) return null;
    return this.usersRepository.create(newUser);
  }

  async validateUser(dto: UserLoginDto): Promise<boolean> {
    return true;
  }
}
