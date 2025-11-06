// server/server.js
const express = require("express");
const cors = require("cors");
const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

//-----------------------------------------
// WEATHER API — Open-Meteo (no key needed)
//-----------------------------------------
app.get("/api/weather", async (req, res) => {
  try {
    const { q } = req.query;
    let lat, lon, locationName;

    // Get coordinates using Open-Meteo Geocoding API if a city name is provided
    if (q) {
      const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
        q
      )}&count=1`;
      const { data: geoData } = await axios.get(geoUrl);

      if (!geoData.results || geoData.results.length === 0) {
        return res.status(404).json({ error: "City not found." });
      }

      const city = geoData.results[0];
      lat = city.latitude;
      lon = city.longitude;
      locationName = `${city.name}, ${city.country_code}`;
    } else {
      // Default: Hyderabad
      lat = 17.385;
      lon = 78.4867;
      locationName = "Hyderabad, IN";
    }

    // Fetch weather info from Open-Meteo API
    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,weather_code&hourly=temperature_2m,weather_code,apparent_temperature,wind_speed_10m,relative_humidity_2m&daily=temperature_2m_max,temperature_2m_min,weather_code,apparent_temperature_max,apparent_temperature_min,wind_speed_10m_max,wind_speed_10m_min&timezone=auto`;
    const { data: w } = await axios.get(weatherUrl);

    // Weather code mapping (WMO)
    const WMO = {
      0: "Clear sky",
      1: "Mainly clear",
      2: "Partly cloudy",
      3: "Overcast",
      45: "Fog",
      48: "Depositing rime fog",
      51: "Light drizzle",
      53: "Moderate drizzle",
      55: "Dense drizzle",
      61: "Slight rain",
      63: "Moderate rain",
      65: "Heavy rain",
      71: "Slight snow",
      73: "Moderate snow",
      75: "Heavy snow",
      80: "Rain showers",
      81: "Rain showers",
      82: "Heavy rain showers",
      95: "Thunderstorm",
    };

    res.json({
      provider: "open-meteo",
      location: locationName,
      timestamp: Date.now(),
      current: {
        temp: w.current.temperature_2m,
        feels_like: w.current.apparent_temperature,
        humidity: w.current.relative_humidity_2m,
        wind_speed: w.current.wind_speed_10m,
        condition: WMO[w.current.weather_code] || "Unknown",
      },
      hourly: w.hourly.time.slice(0, 12).map((t, i) => ({
        time: t,
        temp: w.hourly.temperature_2m[i],
        condition: WMO[w.hourly.weather_code[i]] || "Unknown",
      })),
      daily: w.daily.time.slice(0, 5).map((t, i) => ({
        date: t,
        min: w.daily.temperature_2m_min[i],
        max: w.daily.temperature_2m_max[i],
        condition: WMO[w.daily.weather_code[i]] || "Unknown",
      })),
    });
  } catch (err) {
    console.error("Weather API error:", err.message);
    res.status(500).json({ error: "Could not fetch weather data." });
  }
});

//-----------------------------------------
// QUOTE API
//-----------------------------------------
app.get("/api/quote", async (req, res) => {
  try {
    const { data } = await axios.get("https://api.quotable.io/random");
    res.json({ quote: `${data.content} — ${data.author}` });
  } catch (err) {
    const fallback = [
      "Believe you can and you're halfway there. — Theodore Roosevelt",
      "Do one thing every day that scares you. — Eleanor Roosevelt",
      "The harder you work for something, the greater you'll feel when you achieve it.",
    ];
    res.json({ quote: fallback[Math.floor(Math.random() * fallback.length)] });
  }
});

//-----------------------------------------
// CURRENCY API (INR → USD, EUR)
//-----------------------------------------
app.get("/api/currency", async (req, res) => {
  try {
    const amount = parseFloat(req.query.amount || "0");
    if (isNaN(amount) || amount <= 0)
      return res.status(400).json({ error: "Invalid amount." });

    try {
      const { data } = await axios.get(
        "https://api.exchangerate.host/latest?base=INR&symbols=USD,EUR"
      );
      const usd = (amount * data.rates.USD).toFixed(2);
      const eur = (amount * data.rates.EUR).toFixed(2);
      res.json({ amount, usd, eur, provider: "exchangerate.host" });
    } catch {
      const { data } = await axios.get("https://open.er-api.com/v6/latest/INR");
      const usd = (amount * data.rates.USD).toFixed(2);
      const eur = (amount * data.rates.EUR).toFixed(2);
      res.json({ amount, usd, eur, provider: "open.er-api.com (fallback)" });
    }
  } catch (err) {
    res.status(500).json({ error: "Could not fetch currency rates." });
  }
});

//-----------------------------------------
// SERVER START
//-----------------------------------------
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
