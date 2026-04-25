import { injectable } from "inversify";
import type { UserLoginDto } from "./dto/user-login.dto.ts";
import type { UserRegisterDto } from "./dto/user-register.dto.ts";
import { User } from "./user.entity.ts";
import type { IUserService } from "./users.service.interface.ts";

@injectable()
export class UserService implements IUserService {
  async createUser({
    email,
    name,
    password,
  }: UserRegisterDto): Promise<User | null> {
    const newUser = new User(email, name);
    await newUser.setPassword(password);
    return null;
  }

  async validateUser(dto: UserLoginDto): Promise<boolean> {
    return true;
  }
}
