import axios from "axios";
import { getKeyValue } from "./storage.service";
import { WeatherResponse } from "./api.service.types";

const getWeather = async (city: string): Promise<WeatherResponse> => {
  const token = await getKeyValue("token");
  if (!token) throw new Error("Нет ключа API");

  const { data } = await axios.get<WeatherResponse>(
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
