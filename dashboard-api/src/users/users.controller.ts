import { inject, injectable } from "inversify";
import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { BaseController } from "../common/base.controller.ts";
import { HTTPError } from "../errors/http-error.class.ts";
import { TYPES } from "../types.ts";
import type { ILogger } from "../logger/logger.interface.ts";
import type { IUserController } from "./users.controller.interface.ts";
import { UserLoginDto } from "./dto/user-login.dto.ts";
import { UserRegisterDto } from "./dto/user-register.dto.ts";
import type { IUserService } from "./users.service.interface.ts";
import { ValidateMiddleware } from "../common/validate.middleware.ts";
import type { IConfigService } from "../config/config.service.interface.ts";

@injectable()
export class UserController extends BaseController implements IUserController {
  constructor(
    @inject(TYPES.ILogger) private loggerService: ILogger,
    @inject(TYPES.UserService) private userService: IUserService,
    @inject(TYPES.ConfigService) private configService: IConfigService,
  ) {
    super(loggerService);
    this.bindRoutes([
      {
        path: "/register",
        method: "post",
        func: this.register,
        middlewares: [new ValidateMiddleware(UserRegisterDto)],
      },
      {
        path: "/login",
        method: "post",
        func: this.login,
        middlewares: [new ValidateMiddleware(UserLoginDto)],
      },
      {
        path: "/info",
        method: "get",
        func: this.info,
      },
      {
        path: "/error",
        method: "post",
        func: this.error,
      },
    ]);
  }

  async login(
    req: Request<{}, {}, UserLoginDto>,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const result = await this.userService.validateUser(req.body);
    if (!result) return next(new HTTPError(401, "Ошибка авторизации", "error"));
    const jwt = await this.signJWT(
      req.body.email,
      this.configService.get("SECRET"),
    );
    this.ok(res, { jwt });
  }

  async register(
    req: Request<{}, {}, UserRegisterDto>,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const { body } = req;
    console.log(body);
    const result = await this.userService.createUser(body);
    if (!result) return next(new HTTPError(422, "User exists"));
    this.ok(res, result);
  }

  async info(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { user } = req;
    console.log(user);

    this.ok(res, { email: user });
  }

  error(req: Request, res: Response, next: NextFunction) {
    return next(new HTTPError(401, "Ошибка", "error"));
  }

  private signJWT(email: string, secret: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      jwt.sign(
        { email, iat: Math.floor(Date.now() / 1000) },
        secret,
        {
          algorithm: "HS256",
        },
        (err, token) => {
          if (err) {
            reject(err);
          }
          resolve(token as string);
        },
      );
    });
  }
}
