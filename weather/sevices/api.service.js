import axios from "axios";
import { getKeyValue } from "./storage.service.js";

const getWeather = async (city) => {
  const token = await getKeyValue("token");
  if (!token) throw new Error("Нет ключа API");

  const { data } = await axios.get(
    "https://api.openweathermap.org/data/2.5/weather",
    {
      params: {
        q: city,
        appid: token,
        units: "metric",
      },
    },
  );

  return data;
};

export { getWeather };
