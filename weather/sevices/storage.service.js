import { homedir } from "os";
import { join, basename, dirname, extname, relative, resolve } from "path";

const filePath = join(homedir(), "weather-data.json");

const saveKeyValue = (key, value) => {
  console.log(dirname(filePath));
  console.log(basename(filePath));
  console.log(extname(filePath));
  // Определение относительного пути между двумя путями
  console.log(relative(filePath, dirname(filePath)));
  // Преобразует относительный или неполный путь к файлу в полный абсолютный путь
  console.log(resolve(filePath));
  console.log(resolve("../index.js"));
};

export { saveKeyValue };
