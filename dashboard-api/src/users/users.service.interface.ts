import type { UserLoginDto } from "./dto/user-login.dto.ts";
import type { UserRegisterDto } from "./dto/user-register.dto.ts";
import type { User } from "./user.entity.ts";

export interface IUserService {
  createUser: (dto: UserRegisterDto) => Promise<User | null>;
  validateUser: (dto: UserLoginDto) => Promise<boolean>;
}
