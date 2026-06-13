import axios from "axios";
import { getKeyValue } from "./storage.service";
import { WeatherResponse } from "./api.service.types";

const getWeather = async (city: string): Promise<WeatherResponse> => {
  const token = await getKeyValue("token");
  if (!token) throw new Error("Нет ключа API");

  try {
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
  } catch (error) {
    if (axios.isAxiosError(error)) {
      switch (error.response?.status) {
        case 401:
          throw new Error("Неверный API-ключ");
        case 404:
          throw new Error(`Город "${city}" не найден`);
        case 429:
          throw new Error("Превышен лимит запросов");
        default:
          throw new Error(
            error.response?.data?.message ??
              "Ошибка при получении данных о погоде",
          );
      }
    }

    throw new Error("Неизвестная ошибка");
  }
};

export { getWeather };
