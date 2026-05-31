import type { Request, Response, NextFunction } from "express";
import { verify, type JwtPayload } from "jsonwebtoken";
import type { IMiddleware } from "./middleware.interface.ts";

export class AuthMiddleware implements IMiddleware {
  constructor(private secret: string) {}

  private async verifyJWT(jwt: string, secret: string): Promise<JwtPayload> {
    return new Promise((resolve, reject) => {
      verify(jwt, secret, (err, payload) => {
        if (err) {
          reject(err);
        }
        resolve(payload as JwtPayload);
      });
    });
  }

  async execute(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    if (req.headers.authorization) {
      try {
        const jwt = req.headers.authorization.split(" ")[1];
        const payload = await this.verifyJWT(jwt!, this.secret);
        req.user = payload.email;
        next();
      } catch {
        next();
      }
    } else {
      next();
    }
  }
}
