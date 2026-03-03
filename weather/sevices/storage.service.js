import { homedir } from "os";
import { join, basename, dirname, extname, relative, resolve } from "path";
import { promises } from "fs";

const filePath = join(homedir(), "weather-data.json");

const saveKeyValue = async (key, value) => {
  // console.log(dirname(filePath));
  // console.log(basename(filePath));
  // console.log(extname(filePath));
  // Определение относительного пути между двумя путями
  // console.log(relative(filePath, dirname(filePath)));
  // Преобразует относительный или неполный путь к файлу в полный абсолютный путь
  // console.log(resolve(filePath));
  // console.log(resolve("../index.js"));

  let data = {};
  if (await isExist(filePath)) {
    const file = await promises.readFile(filePath);
    data = JSON.parse(file);
  }
  data[key] = value;
  await promises.writeFile(filePath, JSON.stringify(data));
};

const getKeyValue = async (key) => {
  if (await isExist(filePath)) {
    const file = await promises.readFile(filePath);
    const data = JSON.parse(file);
    return data[key];
  } else return undefined;
};

const isExist = async (path) => {
  try {
    await promises.stat(path);
    return true;
  } catch (e) {
    return false;
  }
};

export { saveKeyValue, getKeyValue };
