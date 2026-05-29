# Prisma setup

### commands:

##### `npm i -D prisma`

##### `npm i @prisma/client`

##### `npx prisma init`

Инициализирует Prisma в проекте:

- создаёт папку `prisma/`
- создаёт файл `schema.prisma`
- добавляет базовую конфигурацию Prisma

Настройка schema.prisma:

```
datasource db {
  provider = "sqlite"
}
```

Описываем модель пользователя:

```
model UserModel {
  id Int @id @default(autoincrement())
  email String
  password String
  name String
}
```

Конфигурация `prisma.config.ts`. Настройка подключения к БД

```
datasource: {
  url: "file:./dev.db",
}
```

##### `npx prisma migrate dev`

Создаёт и применяет миграцию:

- анализирует изменения в schema.prisma
- создаёт SQL-миграцию
- обновляет структуру базы данных
- создаёт/обновляет SQLite-файл `dev.db`

Также Prisma может предложить имя миграции.

##### `npx prisma generate`

##### `npx prisma generate`

Генерирует Prisma Client на основе текущей схемы базы данных.
После выполнения команды можно использовать Prisma Client в коде для работы с БД.

Пример использования:

```
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // создание пользователя
  const user = await prisma.userModel.create({
    data: {
      email: "test@mail.com",
      password: "123456",
      name: "Alex",
    },
  });
}

main();
```

Prisma Client автоматически генерирует методы (`create`, `findMany`, `findUnique`, `update`, `delete`) на основе моделей из `schema.prisma`.
