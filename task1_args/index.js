// **Описание**: Создайте простой Node.js скрипт, который использует условный require для импорта модуля только при выполнении определенного условия на основе аргумента командной строки
//
// **Входные данные**: Аргумент командной строки (строка) - режим работы приложения
//
// **Выходные данные**: Сообщение в консоли в зависимости от переданного режима
//
// **Ограничения**: Используйте только встроенные возможности Node.js, условный require внутри блока if
//
// **Примеры**:
// Выполнение: node app.js production
// Output: Running in production mode
//
// Выполнение: node app.js development
// Output: Development tools loaded
// Debug mode activated
//
// Выполнение: node app.js
// Output: No mode specified, using default

// Ваш код здесь
const mode = process.argv[2];

if (!mode) console.log("No mode specified, using default");
if (mode === "production") console.log("Running in production mode");
if (mode === "development") {
  console.log("Development tools loaded");
  const { request } = require("http");
}
