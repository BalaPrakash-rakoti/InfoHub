import React, { useEffect, useState } from "react";
import { api } from "../api";

export default function WeatherModule() {
  const [data, setData] = useState(null);
  const [query, setQuery] = useState("Hyderabad");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Map weather conditions to emojis
  const getIcon = (condition) => {
    if (!condition) return "🌈";
    const text = condition.toLowerCase();
    if (text.includes("clear")) return "☀️";
    if (text.includes("partly") || text.includes("cloud")) return "⛅";
    if (text.includes("overcast")) return "☁️";
    if (text.includes("rain") || text.includes("drizzle")) return "🌧️";
    if (text.includes("thunder")) return "⛈️";
    if (text.includes("snow")) return "❄️";
    if (text.includes("fog")) return "🌫️";
    return "🌈";
  };

  const fetchWeather = async () => {
    setIsLoading(true);
    setError("");
    try {
      const res = await api.get("/api/weather", { params: { q: query } });
      setData(res.data);
    } catch (err) {
      console.error("Weather fetch failed:", err);
      setError("Could not fetch weather data. Try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  return (
    <section className="card">
      <h2 className="heading text-center">🌍 Weather Dashboard</h2>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-4 mb-6">
        <input
          type="text"
          placeholder="Enter city name"
          className="border border-slate-200 rounded-xl p-2 text-center"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={fetchWeather} className="tab tab-active">
          🔍 Search
        </button>
      </div>

      {isLoading && <p className="text-center text-slate-500">Loading weather data...</p>}
      {error && <p className="text-center text-red-600">{error}</p>}

      {!isLoading && data && !error && (
        <div className="space-y-6">
          {/* Current Conditions */}
          <div className="text-center">
            <h3 className="text-2xl font-semibold">{data.location}</h3>
            <p className="text-5xl mt-3">
              {getIcon(data.current.condition)} {data.current.temp}°C
            </p>
            <p className="text-slate-700 mt-2 capitalize">{data.current.condition}</p>
            <div className="flex justify-center gap-6 mt-3 text-slate-600">
              <p>💧 {data.current.humidity}%</p>
              <p>🌬️ {data.current.wind_speed} m/s</p>
              <p>🥵 Feels like {data.current.feels_like}°C</p>
            </div>
          </div>

          {/* Hourly Forecast */}
          <div>
            <h4 className="text-lg font-semibold mb-2">🕒 Hourly Forecast</h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3 text-center">
              {data.hourly.map((hour, i) => (
                <div
                  key={i}
                  className="bg-slate-50 rounded-xl p-3 shadow-sm border border-slate-100"
                >
                  <p className="font-semibold text-slate-800">
                    {new Date(hour.time).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                  <p className="text-2xl">{getIcon(hour.condition)}</p>
                  <p>{hour.temp}°C</p>
                </div>
              ))}
            </div>
          </div>

          {/* Daily Forecast */}
          <div>
            <h4 className="text-lg font-semibold mb-2">📅 5-Day Forecast</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-3 text-center">
              {data.daily.map((day, i) => (
                <div
                  key={i}
                  className="bg-slate-50 rounded-xl p-3 shadow-sm border border-slate-100"
                >
                  <p className="font-semibold text-slate-800">
                    {new Date(day.date).toLocaleDateString([], {
                      weekday: "short",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                  <p className="text-2xl">{getIcon(day.condition)}</p>
                  <p className="text-sm text-slate-600">{day.condition}</p>
                  <p className="font-medium mt-1">
                    {day.min}° / {day.max}°C
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
