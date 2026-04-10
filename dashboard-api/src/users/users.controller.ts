import type { NextFunction, Request, Response } from "express";
import { BaseController } from "../common/base.controller.js";
import type { LoggerService } from "../logger/logger.service.js";
import { HTTPError } from "../errors/http-error.class.js";

export class UserController extends BaseController {
  constructor(logger: LoggerService) {
    super(logger);
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
