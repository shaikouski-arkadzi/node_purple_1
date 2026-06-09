#!/usr/bin/env node

import { getArgs } from "./helpers/args.js";
import { getWeather } from "./sevices/api.service.js";
import {
  printHelp,
  printSuccess,
  printError,
  printWeather,
} from "./sevices/log.service.js";
import {
  saveKeyValue,
  TOKEN_DICTIONARY,
  getKeyValue,
} from "./sevices/storage.service.js";

const saveToken = async (token) => {
  if (!token.length) {
    printError("Не передан token");
    return;
  }
  try {
    await saveKeyValue(TOKEN_DICTIONARY.token, token);
    printSuccess("Токен сохранён");
  } catch (e) {
    printError(e.message);
  }
};

const saveCities = async (cities) => {
  const cityList = cities
    .split(",")
    .map((city) => city.trim())
    .filter(Boolean);

  if (!cityList.length) {
    printError("Не переданы города");
    return;
  }

  try {
    await saveKeyValue(TOKEN_DICTIONARY.cities, cityList);
    printSuccess("Города сохранены");
  } catch (e) {
    printError(e.message);
  }
};

const getForecast = async () => {
  try {
    const cities = (await getKeyValue(TOKEN_DICTIONARY.cities)) || [];

    if (!cities.length) {
      throw new Error("Города не настроены");
    }

    const lang = (await getKeyValue(TOKEN_DICTIONARY.lang)) || "ru";

    for (const city of cities) {
      const weather = await getWeather(city, lang);
      printWeather(weather, lang);
      console.log("-----------------------");
    }
  } catch (e) {
    if (e?.response?.status === 404) {
      printError("Неверно указан город");
    } else if (e?.response?.status === 401) {
      printError("Неверно указан токен");
    } else {
      printError(e.message);
    }
  }
};

const saveLang = async (lang) => {
  const allowed = ["ru", "en"];

  if (!allowed.includes(lang)) {
    printError("Допустимые языки: ru, en");
    return;
  }

  try {
    await saveKeyValue(TOKEN_DICTIONARY.lang, lang);
    printSuccess("Язык сохранён");
  } catch (e) {
    printError(e.message);
  }
};

const initCLI = () => {
  const args = getArgs(process.argv);
  console.log(args);
  if (args.h) {
    return printHelp();
  }
  if (args.s) {
    return saveCities(args.s);
  }
  if (args.t) {
    return saveToken(args.t);
  }
  if (args.l) {
    return saveLang(args.l);
  }
  return getForecast();
};

initCLI();
