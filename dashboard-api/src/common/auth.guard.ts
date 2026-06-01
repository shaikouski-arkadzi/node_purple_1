import type { Request, Response, NextFunction } from "express";
import type { IMiddleware } from "./middleware.interface.ts";

export class AuthGuard implements IMiddleware {
  execute(req: Request, res: Response, next: NextFunction): void {
    if (req.user) {
      return next();
    }
    res.status(401).send({ error: "Вы не авторизованы" });
  }
}
