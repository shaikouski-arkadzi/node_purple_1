import { messages } from "../dictionaries/index.js";

const printError = (error) => {
  console.log(`Error: ${error}`);
};

const printSuccess = (message) => {
  console.log(`Success: ${message}`);
};

const printHelp = () => {
  console.log(`
    Использование:

    -h                помощь
    -t [TOKEN]        сохранить API токен
    -s [CITY1,CITY2]  сохранить города
    -l [ru|en]        установить язык

    Примеры:

    weather -t API_KEY
    weather -s Moscow,London,Paris
    weather -l en
    weather
  `);
};

const printWeather = (res, lang = "ru") => {
  const t = messages[lang];

  console.log(`
    ${t.weather} ${res.name}: ${res.weather[0].description}
    ${t.temperature}: ${res.main.temp}°C (${t.feelsLike} ${res.main.feels_like}°C)
    ${t.humidity}: ${res.main.humidity}%
    ${t.wind}: ${res.wind.speed} m/s
  `);
};

export { printError, printSuccess, printHelp, printWeather };
