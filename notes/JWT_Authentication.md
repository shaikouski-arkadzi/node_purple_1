# JWT Authentication в Node.js — Конспект

## Что такое JWT

**JWT (JSON Web Token)** — компактный токен для безопасной передачи данных между клиентом и сервером. Обычно используется для аутентификации и авторизации.

JWT состоит из трех частей:

```text
Header.Payload.Signature
```

Пример:

```text
eyJhbGciOiJIUzI1NiJ9
.
eyJ1c2VySWQiOjF9
.
abc123xyz
```

---

# Структура JWT

## Header

Содержит информацию о типе токена и алгоритме подписи.

```json
{
  "alg": "HS256",
  "typ": "JWT"
}
```

---

## Payload

Содержит данные пользователя (**Claims**).

```json
{
  "userId": 1,
  "email": "admin@example.com",
  "role": "USER"
}
```

> Payload не шифруется, а только подписывается. Не храните в нем пароли или другую чувствительную информацию.

---

## Signature

Создается на основе:

```text
Base64Url(Header)
+
Base64Url(Payload)
+
Secret
```

Позволяет проверить:

- целостность токена;
- что токен действительно подписан вашим сервером;
- что данные не были изменены.

---

# Создание JWT

Для работы используется пакет:

```bash
npm install jsonwebtoken
```

---

## Метод `sign()`

```ts
jwt.sign(payload, secret, options);
```

---

## Пример

```ts
const token = jwt.sign(
  {
    userId: 123,
    role: "USER",
  },
  process.env.JWT_SECRET!,
  {
    expiresIn: "1h",
  },
);
```

---

## Аргументы `sign()`

### Payload

Данные пользователя.

```ts
{
  userId: 123,
  role: 'USER',
}
```

---

### Secret

Секретный ключ для подписи токена.

```ts
process.env.JWT_SECRET;
```

---

### Options

Дополнительные параметры.

```ts
{
  expiresIn: "1h";
}
```

Часто используются:

| Опция       | Описание                    |
| ----------- | --------------------------- |
| `expiresIn` | Время жизни токена          |
| `algorithm` | Алгоритм подписи            |
| `issuer`    | Кто выпустил токен          |
| `audience`  | Для кого предназначен токен |
| `subject`   | Идентификатор пользователя  |

---

## Алгоритм подписи

Наиболее распространённый алгоритм:

```text
HS256
```

Пример:

```ts
jwt.sign(payload, secret, {
  algorithm: "HS256",
});
```

---

# Хранение JWT Secret

## Где хранить

Секретный ключ должен храниться в переменных окружения.

Файл:

```text
.env
```

Содержимое:

```env
JWT_SECRET=super_secret_key
```

---

## Получение в коде

```ts
process.env.JWT_SECRET;
```

---

## Почему нельзя хранить секрет в коде

Плохой пример:

```ts
const secret = "123456";
```

Недостатки:

- попадёт в Git;
- сохранится в истории коммитов;
- станет доступен другим разработчикам;
- увеличивается риск компрометации токенов.

---

# JWT Middleware

## Назначение

Middleware проверяет JWT перед доступом к защищённым маршрутам.

Схема работы:

```text
Request
    ↓
JWT Middleware
    ↓
jwt.verify()
    ↓
req.user
    ↓
Controller
```

---

# Извлечение токена

Клиент отправляет заголовок:

```http
Authorization: Bearer eyJhbGciOiJIUzI1Ni...
```

---

## Шаг 1. Получить заголовок

```ts
const authHeader = req.headers.authorization;
```

---

## Шаг 2. Проверить формат

```ts
if (!authHeader?.startsWith("Bearer ")) {
  return res.status(401).json({
    message: "Unauthorized",
  });
}
```

---

## Шаг 3. Извлечь токен

```ts
const token = authHeader.split(" ")[1];
```

---

## Шаг 4. Проверить токен

```ts
const decoded = jwt.verify(token, process.env.JWT_SECRET!);
```

---

## Шаг 5. Сохранить пользователя

```ts
req.user = decoded;
```

---

# Полный пример Middleware

```ts
import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return res.sendStatus(401);
  }

  const token = authHeader.split(" ")[1];

  const decoded = jwt.verify(token, process.env.JWT_SECRET!);

  req.user = decoded;

  next();
};
```

---

# Проверка токена

Используется метод:

```ts
jwt.verify();
```

---

## Сигнатура

```ts
jwt.verify(token, secret);
```

---

## Пример

```ts
const decoded = jwt.verify(token, process.env.JWT_SECRET!);
```

---

## Что делает `verify()`

Проверяет:

- подпись токена;
- срок действия (`exp`);
- корректность структуры токена;
- алгоритм подписи.

Возвращает:

```ts
decoded payload
```

Если проверка не проходит — выбрасывает исключение.

Пример обработки:

```ts
try {
  const decoded = jwt.verify(token, process.env.JWT_SECRET!);
} catch {
  return res.sendStatus(401);
}
```

---

# Расширение Request в TypeScript

После работы middleware появляется новое свойство:

```ts
req.user;
```

Но TypeScript по умолчанию о нём не знает.

---

## `custom.d.ts`

```ts
import { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string | number;
        email: string;
        role?: string;
      } & JwtPayload;
    }
  }
}
```

---

## После расширения

```ts
req.user?.email;

req.user?.id;

req.user?.role;
```

Без ошибок TypeScript.

---

# Стандартные Claims JWT

Claims — специальные поля внутри Payload.

---

## `iat`

**Issued At**

Время создания токена.

```json
{
  "iat": 1718571000
}
```

---

## `exp`

**Expiration Time**

Время окончания действия токена.

```json
{
  "exp": 1718574600
}
```

---

## `sub`

**Subject**

Идентификатор пользователя.

```json
{
  "sub": "123"
}
```

---

## `iss`

**Issuer**

Кто выпустил токен.

```json
{
  "iss": "auth-service"
}
```

---

## `aud`

**Audience**

Для какого клиента предназначен токен.

```json
{
  "aud": "frontend"
}
```

---

# Типичный Payload

```json
{
  "sub": "1",
  "email": "admin@example.com",
  "role": "ADMIN",
  "iat": 1718571000,
  "exp": 1718574600
}
```

---

# Поток аутентификации

```text
Login
   ↓
jwt.sign()
   ↓
JWT Token
   ↓
Client
   ↓
Authorization: Bearer <token>
   ↓
authMiddleware
   ↓
jwt.verify()
   ↓
req.user
   ↓
Protected Route
```

---

# Краткая шпаргалка

## Создание токена

```ts
jwt.sign(payload, process.env.JWT_SECRET!, {
  expiresIn: "1h",
});
```

---

## Проверка токена

```ts
jwt.verify(token, process.env.JWT_SECRET!);
```

---

## Authorization Header

```http
Authorization: Bearer <token>
```

---

## Извлечение токена

```ts
const token = req.headers.authorization?.split(" ")[1];
```

---

## Добавление пользователя

```ts
req.user = decoded;
```

---

## Расширение Request

```ts
declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}
```

---

## JWT Secret

Файл `.env`:

```env
JWT_SECRET=my_secret_key
```

Получение:

```ts
process.env.JWT_SECRET;
```

---

## Основные Claims

| Claim | Описание                   |
| ----- | -------------------------- |
| `iat` | Время выпуска токена       |
| `exp` | Время окончания действия   |
| `sub` | Идентификатор пользователя |
| `iss` | Издатель токена            |
| `aud` | Получатель токена          |

---

# Лучшие практики

- Не храните пароли и другую чувствительную информацию в Payload.
- Используйте сложный и длинный `JWT_SECRET`.
- Храните секрет только в `.env`.
- Устанавливайте срок жизни токена (`expiresIn`).
- Всегда обрабатывайте ошибки `jwt.verify()` через `try/catch`.
- Для защищённых маршрутов используйте отдельный `authMiddleware`.
- При использовании Refresh Token храните Access Token с коротким временем жизни (например, 15–60 минут), а Refresh Token — отдельно и безопасно.

---

# Полезные методы

### Создание токена

```ts
jwt.sign(payload, secret, options);
```

### Проверка токена

```ts
jwt.verify(token, secret);
```

### Декодирование без проверки подписи

```ts
jwt.decode(token);
```

> `jwt.decode()` **не проверяет подпись токена** и не должен использоваться для аутентификации.
