// **Описание**: Создайте простой Node.js скрипт, который использует встроенный модуль fs для синхронного чтения содержимого локального текстового файла и выводит его в консоль
//
// **Входные данные**: Локальный файл data.txt с произвольным текстовым содержимым
//
// **Выходные данные**: Содержимое файла data.txt выведенное в консоль
//
// **Ограничения**: Используйте только встроенные модули Node.js (fs, path), синхронное чтение файла
//
// **Примеры**:
// Содержимое data.txt: "Welcome to Node.js file system!"
// Выполнение: node app.js
// Output: Welcome to Node.js file system!

const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "data.txt");
const data = fs.readFileSync(filePath, "utf8");
console.log(data);
