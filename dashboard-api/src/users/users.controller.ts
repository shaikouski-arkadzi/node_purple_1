import { inject, injectable } from "inversify";
import type { NextFunction, Request, Response } from "express";
import { BaseController } from "../common/base.controller.ts";
import { HTTPError } from "../errors/http-error.class.ts";
import { TYPES } from "../types.ts";
import type { ILogger } from "../logger/logger.interface.ts";
import type { IUserController } from "./users.controller.interface.ts";
import type { UserLoginDto } from "./dto/user-login.dto.ts";
import type { UserRegisterDto } from "./dto/user-register.dto.ts";
import { User } from "./user.entity.ts";
import type { IUserService } from "./users.service.interface.ts";

@injectable()
export class UserController extends BaseController implements IUserController {
  constructor(
    @inject(TYPES.ILogger) private loggerService: ILogger,
    @inject(TYPES.UserService) private userService: IUserService,
  ) {
    super(loggerService);
    this.bindRoutes([
      {
        path: "/register",
        method: "post",
        func: this.register,
      },
      {
        path: "/login",
        method: "post",
        func: this.login,
      },
      {
        path: "/error",
        method: "post",
        func: this.error,
      },
    ]);
  }

  login(req: Request<{}, {}, UserLoginDto>, res: Response, next: NextFunction) {
    console.log(req.body);
    this.ok(res, "login");
  }

  async register(
    req: Request<{}, {}, UserRegisterDto>,
    res: Response,
    next: NextFunction,
  ) {
    const { body } = req;
    console.log(body);
    const result = await this.userService.createUser(body);
    if (!result) return next(new HTTPError(422, "User exists"));
    this.ok(res, result);
  }

  error(req: Request, res: Response, next: NextFunction) {
    next(new HTTPError(401, "Ошибка", "error"));
  }
}
