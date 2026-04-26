import { type Response, Router } from "express";
import { injectable } from "inversify";
import type { IRoute } from "./route.interface.ts";
import type { ILogger } from "../logger/logger.interface.ts";

/**
 * Базовый абстрактный контроллер для Express-приложения.
 *
 * Предоставляет:
 * - экземпляр Router
 * - стандартные методы HTTP-ответов
 * - механизм привязки маршрутов
 * - логирование маршрутов
 *
 * Все контроллеры приложения должны наследоваться от этого класса
 * для обеспечения единого подхода к маршрутизации и отправке ответов.
 *
 * @abstract
 */
@injectable()
export abstract class BaseController {
  /**
   * Внутренний экземпляр Express Router.
   *
   * Используется для регистрации маршрутов контроллера.
   *
   * @private
   * @readonly
   */
  private readonly _router: Router;

  /**
   * Создает базовый контроллер.
   *
   * @param logger Сервис логирования, используемый для регистрации маршрутов
   */
  constructor(private logger: ILogger) {
    this._router = Router();
  }

  /**
   * Возвращает экземпляр Express Router.
   *
   * Используется для подключения контроллера к приложению.
   *
   * @returns Router Express
   *
   * @example
   * app.use("/users", userController.router);
   */
  get router(): Router {
    return this._router;
  }

  /**
   * Отправляет JSON-ответ с указанным HTTP статус-кодом.
   *
   * @typeParam T Тип тела ответа
   *
   * @param res Объект ответа Express
   * @param code HTTP статус-код
   * @param message Тело ответа
   *
   * @returns Express Response
   *
   * @example
   * this.send(res, 200, { success: true });
   */
  send<T>(res: Response, code: number, message: T) {
    res.type("application/json");
    return res.status(code).json(message);
  }

  /**
   * Отправляет HTTP 200 OK.
   *
   * Используется для успешного ответа.
   *
   * @typeParam T Тип тела ответа
   *
   * @param res Объект ответа Express
   * @param message Тело ответа
   *
   * @example
   * this.ok(res, { users: [] });
   */
  ok<T>(res: Response, message: T) {
    return this.send<T>(res, 200, message);
  }

  /**
   * Отправляет HTTP 201 Created.
   *
   * Обычно используется после успешного создания ресурса.
   *
   * @param res Объект ответа Express
   *
   * @example
   * this.created(res);
   */
  created(res: Response) {
    return res.sendStatus(201);
  }

  /**
   * Привязывает маршруты контроллера к Express Router.
   *
   * Метод автоматически:
   * - логирует каждый маршрут
   * - привязывает контекст контроллера (bind)
   * - регистрирует маршрут в Express Router
   *
   * @protected
   *
   * @param routes Массив маршрутов
   *
   * @example
   * this.bindRoutes([
   *   { path: "/login", method: "post", func: this.login },
   *   { path: "/register", method: "post", func: this.register }
   * ]);
   */
  protected bindRoutes(routes: IRoute[]) {
    for (const route of routes) {
      this.logger.log(`[${route.method}] ${route.path}`);
      const middleware = route.middlewares?.map((m) => m.execute.bind(m));
      const handler = route.func.bind(this);
      const pipeline = middleware ? [...middleware, handler] : handler;
      this.router[route.method](route.path, pipeline);
    }
  }
}
