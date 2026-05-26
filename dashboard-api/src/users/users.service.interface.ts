import type { UserModel } from "@prisma/client";
import type { UserLoginDto } from "./dto/user-login.dto.ts";
import type { UserRegisterDto } from "./dto/user-register.dto.ts";

export interface IUserService {
  createUser: (dto: UserRegisterDto) => Promise<UserModel | null>;
  validateUser: (dto: UserLoginDto) => Promise<boolean>;
}
