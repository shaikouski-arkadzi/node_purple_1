import type { Request, Response, NextFunction } from "express";
import { plainToClass, type ClassConstructor } from "class-transformer";
import { validate } from "class-validator";
import type { IMiddleware } from "./middleware.interface.ts";

export class ValidateMiddleware implements IMiddleware {
  constructor(private classToValidate: ClassConstructor<object>) {}

  execute({ body }: Request, res: Response, next: NextFunction): void {
    const instance = plainToClass(this.classToValidate, body);
    validate(instance).then((errors) => {
      if (errors.length > 0) res.status(422).send(errors);
      next();
    });
  }
}
