import { inject, injectable } from "inversify";
import type { NextFunction, Request, Response } from "express";
import { BaseController } from "../common/base.controller.ts";
import { HTTPError } from "../errors/http-error.class.ts";
import { TYPES } from "../types.ts";
import type { ILogger } from "../logger/logger.interface.ts";

@injectable()
export class UserController extends BaseController {
  constructor(@inject(TYPES.ILogger) private loggerService: ILogger) {
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

  login(req: Request, res: Response, next: NextFunction) {
    this.ok(res, "login");
  }

  register(req: Request, res: Response, next: NextFunction) {
    this.ok(res, "register");
  }

  error(req: Request, res: Response, next: NextFunction) {
    next(new HTTPError(401, "Ошибка", "error"));
  }
}
