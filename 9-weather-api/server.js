import express from "express";
import dotenv from "dotenv";
import { getWeather } from "./sevices/api.service";

dotenv.config();

const app = express();
const PORT = 3000;

app.get("/weather", async (req, res) => {
  try {
    const { city, lang = "ru" } = req.query;

    if (!city) {
      return res.status(400).json({
        error: "Parameter 'city' is required",
      });
    }

    const weather = await getWeather(city, lang);

    res.json(weather);
  } catch (e) {
    if (e?.response?.status === 404) {
      return res.status(404).json({
        error: "City not found",
      });
    }

    if (e?.response?.status === 401) {
      return res.status(401).json({
        error: "Invalid API key",
      });
    }

    res.status(500).json({
      error: e.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
