import type { Request, Response, NextFunction, Router } from "express";
import type { IMiddleware } from "./middleware.interface.ts";

export interface IRoute {
  path: string;
  func: (req: Request, res: Response, next: NextFunction) => void;
  method: keyof Pick<Router, "get" | "post" | "delete" | "patch" | "put">;
  middlewares?: IMiddleware[];
}
