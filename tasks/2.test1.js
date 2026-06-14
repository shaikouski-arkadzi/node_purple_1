// **Описание**: Написать тест, который использует afterAll для очистки состояния после завершения группы тестов
// **Входные данные**: В describe создайте группу тестов, которые работают с временными файлами
// **Выходные данные**: Три теста проверяют создание, чтение и запись файла, а afterAll удаляет временный файл
// **Ограничения**:
// - Используйте describe для группировки тестов
// - Создайте объект fileManager с методами create, read, write и delete
// - В afterAll вызовите delete для очистки
// - Напишите три теста: создание файла, чтение содержимого, запись данных
// - Используйте expect и toBе/toEqual для проверок
// **Примеры**:
// Входные данные: fileManager.create('test.txt')
// Output: 'created'
// Входные данные: fileManager.read('test.txt')
// Output: 'default content'
// Входные данные: fileManager.write('test.txt', 'new data')
// Output: 'written'

// Ваш код здесь

var fs = require("fs");

describe("Work with files", () => {
  const filename = "test.txt";

  const fileManager = {
    create: (filename) => {
      fs.writeFileSync(filename, "default content");
      return "created";
    },
    read: (filename) => {
      return fs.readFileSync(filename, "utf8");
    },
    write: (filename, data) => {
      fs.writeFileSync(filename, data);
      return "written";
    },
    delete: (filename) => {
      fs.unlinkSync(filename);
    },
  };

  afterAll(() => fileManager.delete(filename));

  it("should create file", () => {
    expect(fileManager.create(filename)).toBe("created");
    expect(fs.existsSync(filename)).toBe(true);
  });

  it("should read default content", () => {
    fileManager.create(filename);
    expect(fileManager.read(filename)).toBe("default content");
  });

  it("should write new data", () => {
    expect(fileManager.write(filename, "new data")).toBe("written");
    expect(fileManager.read(filename)).toEqual("new data");
  });
});
