# Dependency Injection (DI) — Конспект

## Что такое Dependency Injection (DI)

**Dependency Injection (DI)** — это паттерн, при котором зависимости передаются объекту извне, а не создаются внутри него самостоятельно.

### Зачем нужен DI

- уменьшает связанность компонентов (coupling);
- упрощает тестирование;
- позволяет легко заменять реализации;
- делает код более гибким и расширяемым.

### Без DI

```ts
class UserService {
  private repository = new UserRepository();
}
```

### С DI

```ts
class UserService {
  constructor(private repository: UserRepository) {}
}
```

---

# Способы внедрения зависимостей

## 1. Constructor Injection

Зависимости передаются через конструктор.

```ts
class UserService {
  constructor(private repository: UserRepository) {}
}
```

### Особенности

- зависимость доступна всему классу;
- передается при создании объекта;
- наиболее распространенный способ DI.

---

## 2. Method Injection

Зависимость передается в конкретный метод.

```ts
class UserService {
  getUser(repository: UserRepository, id: string) {
    return repository.findById(id);
  }
}
```

### Особенности

- зависимость используется только внутри метода;
- передается во время вызова метода;
- подходит для редко используемых зависимостей.

---

# Composition Root

**Composition Root** — место, где создаются и связываются все зависимости приложения.

Обычно находится на самом верхнем уровне приложения:

- `main.ts`
- `index.ts`
- точка входа сервера

Пример:

```ts
const repository = new UserRepository();
const service = new UserService(repository);
```

### Назначение

- централизованная настройка зависимостей;
- удобное тестирование;
- контроль конфигурации приложения.

---

# Интерфейсы в DI

Интерфейсы помогают работать с абстракциями вместо конкретных реализаций.

## Причина №1

Описывают контракт без привязки к реализации.

```ts
interface IUserRepository {
  findById(id: string): User;
}
```

## Причина №2

Позволяют менять реализации без изменения кода потребителя.

```ts
class PostgresRepository implements IUserRepository {}
class MongoRepository implements IUserRepository {}
```

Потребителю без разницы, какая реализация используется.

---

# Inversion of Control (IoC)

**IoC (Inversion of Control)** — передача контроля над созданием и управлением объектами внешнему контейнеру или фреймворку.

Вместо:

```ts
const service = new UserService(new UserRepository());
```

контейнер создает объект автоматически.

---

# Dependency Inversion Principle (DIP)

Принцип из SOLID.

> Высокоуровневые и низкоуровневые модули должны зависеть от абстракций, а не друг от друга.

### Плохо

```ts
class UserService {
  constructor(private repository: PostgresRepository) {}
}
```

### Хорошо

```ts
class UserService {
  constructor(private repository: IUserRepository) {}
}
```

---

# Связь IoC и DIP

### IoC

Отвечает за:

- кто создает объекты;
- кто управляет зависимостями.

### DIP

Отвечает за:

- от чего должны зависеть классы.

То есть:

- DIP говорит **зависеть от абстракций**;
- IoC помогает **реализовать это на практике**.

---

# Основные функции IoC-контейнера

## 1. Создание и связывание зависимостей

Контейнер автоматически:

- создает объекты;
- внедряет нужные зависимости.

## 2. Управление жизненным циклом

Контролирует время жизни объектов:

- Singleton;
- Transient;
- Request Scope и т.д.

---

# Декораторы TypeScript

## 1. Декоратор класса

Работает с классом целиком.

```ts
@Injectable()
class UserService {}
```

---

## 2. Декоратор метода

Работает с методом.

```ts
class UserService {
  @Log()
  getUser() {}
}
```

---

## 3. Декоратор свойства

Работает со свойством.

```ts
class UserService {
  @Inject()
  repository!: UserRepository;
}
```

---

## 4. Декоратор параметра

Работает с параметром метода или конструктора.

```ts
constructor(
  @Inject("Repository")
  repository: IRepository
) {}
```

---

# Порядок работы нескольких декораторов

Допустим:

```ts
@A()
@B()
class UserService {}
```

## Инициализация

Происходит сверху вниз:

```text
A
B
```

## Выполнение

Происходит снизу вверх:

```text
B
A
```

Запоминается как принцип композиции функций.

---

# Reflect Metadata

Библиотека позволяет хранить метаданные в runtime.

## Сохранение метаданных

```ts
Reflect.defineMetadata(key, value, target);
```

## Получение метаданных

```ts
Reflect.getMetadata(key, target);
```

---

# Зачем Reflect Metadata нужен в DI

DI-фреймворки используют метаданные для:

- хранения информации о типах;
- определения зависимостей конструктора;
- автоматического создания объектов.

Пример:

```ts
constructor(
  repository: UserRepository
) {}
```

Контейнер может узнать тип `UserRepository` через метаданные.

---

# Почему нужен пакет reflect-metadata

TypeScript сам по себе не предоставляет реализацию API:

```ts
Reflect.defineMetadata();
Reflect.getMetadata();
```

Пакет `reflect-metadata` добавляет эти методы в runtime.

Подключение:

```ts
import "reflect-metadata";
```

---

# Зачем нужен emitDecoratorMetadata

В `tsconfig.json`:

```json
{
  "compilerOptions": {
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
  }
}
```

### Что делает

Заставляет TypeScript сохранять информацию о типах в скомпилированный JavaScript.

Без него контейнер не сможет узнать типы зависимостей.

---

# InversifyJS и Reflect Metadata

Схема работы:

```text
Декоратор
      ↓
emitDecoratorMetadata
      ↓
TypeScript сохраняет типы
      ↓
reflect-metadata хранит их в runtime
      ↓
Inversify читает метаданные
      ↓
IoC-контейнер создает зависимости
      ↓
DI выполняется автоматически
```

---

# Краткая шпаргалка

- DI — передача зависимостей извне.
- Constructor Injection — зависимость для всего класса.
- Method Injection — зависимость только для метода.
- Composition Root — место сборки всех зависимостей.
- Интерфейсы позволяют зависеть от абстракций.
- IoC — внешний контроль создания объектов.
- DIP — зависимость от абстракций, а не реализаций.
- IoC-контейнер создает объекты и управляет их жизненным циклом.
- Декораторы: class, method, property, parameter.
- Декораторы инициализируются сверху вниз, выполняются снизу вверх.
- Reflect.defineMetadata() — записывает метаданные.
- Reflect.getMetadata() — читает метаданные.
- reflect-metadata добавляет API метаданных в runtime.
- emitDecoratorMetadata сохраняет информацию о типах.
- InversifyJS использует декораторы + Reflect Metadata для автоматического DI.
