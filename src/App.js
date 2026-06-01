import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

import {
  WiDaySunny,
  WiCloudy,
  WiRain,
  WiSnow
} from "react-icons/wi";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

function App() {
  const API_KEY = "5c2512b1f6d9f00e1bb09960469d76f9";

  const [city, setCity] = useState("London");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [time, setTime] = useState(new Date());

  const fetchWeather = async () => {
    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );

      setWeather(res.data);
      setError("");
    } catch {
      setError("City not found");
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const chartData = [
    { day: "Mon", temp: 22 },
    { day: "Tue", temp: 25 },
    { day: "Wed", temp: 28 },
    { day: "Thu", temp: 24 },
    { day: "Fri", temp: 26 },
    { day: "Sat", temp: 30 },
    { day: "Sun", temp: 27 }
  ];

  return (
    <div className="dashboard">

      {/* LEFT SIDEBAR */}

      <div className="sidebar">
        <h2>☁ Weather</h2>

        <input
          type="text"
          placeholder="Search city..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />

        <button onClick={fetchWeather}>
          Search
        </button>

        {error && <p>{error}</p>}

        {weather && (
          <>
            <div className="weather-icon">
              {weather.weather[0].main === "Clear" ? (
                <WiDaySunny size={80} />
              ) : weather.weather[0].main === "Clouds" ? (
                <WiCloudy size={80} />
              ) : weather.weather[0].main === "Rain" ? (
                <WiRain size={80} />
              ) : (
                <WiSnow size={80} />
              )}
            </div>

            <h1>{weather.main.temp}°C</h1>
            <h3>{weather.name}</h3>
            <p>{weather.weather[0].description}</p>

            <div className="forecast-list">
              <div className="forecast-card">Mon 24°</div>
              <div className="forecast-card">Tue 22°</div>
              <div className="forecast-card">Wed 25°</div>
              <div className="forecast-card">Thu 27°</div>
              <div className="forecast-card">Fri 29°</div>
            </div>
          </>
        )}
      </div>

      {/* MAIN CONTENT */}

      <div className="main-content">

        {weather && (
          <div className="hero-card">

            <div>
              <h3>
                {time.getHours() < 12
                  ? "Good Morning ☀️"
                  : time.getHours() < 18
                  ? "Good Afternoon 🌤️"
                  : "Good Evening 🌙"}
              </h3>

              <h1>{weather.main.temp}°C</h1>

              <p>{weather.weather[0].description}</p>

              <span>
                Feels Like {weather.main.feels_like}°C
              </span>

              <p>📍 {weather.name}</p>
            </div>

            <div className="hero-time">
              {time.toLocaleTimeString()}
            </div>

          </div>
        )}

        <h2>Temperature Overview</h2>

        <div className="chart-box">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="temp"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="cards">

          <div className="card">
            <h3>Air Quality</h3>
            <h1>89</h1>
            <p>Good</p>
          </div>

          <div className="card">
            <h3>UV Index</h3>
            <h1>5.2</h1>
            <p>Moderate</p>
          </div>

          <div className="card">
            <h3>Wind Status</h3>

            {weather && (
              <h1>{weather.wind.speed} m/s</h1>
            )}
          </div>

          <div className="card">
            <h3>Humidity</h3>

            {weather && (
              <h1>{weather.main.humidity}%</h1>
            )}
          </div>

          <div className="card">
            <h3>Sunrise 🌅</h3>

            {weather && (
              <h1>
                {new Date(
                  weather.sys.sunrise * 1000
                ).toLocaleTimeString()}
              </h1>
            )}
          </div>

          <div className="card">
            <h3>Sunset 🌇</h3>

            {weather && (
              <h1>
                {new Date(
                  weather.sys.sunset * 1000
                ).toLocaleTimeString()}
              </h1>
            )}
          </div>

        </div>
      </div>

      {/* RIGHT PANEL */}

      <div className="right-panel">

        <h2>Other Cities</h2>

        <div className="city-card">
          <h3>Islamabad</h3>
          <p>26°C</p>
        </div>

        <div className="city-card">
          <h3>Lahore</h3>
          <p>38°C</p>
        </div>

        <div className="city-card">
          <h3>Quetta</h3>
          <p>24°C</p>
        </div>

        <div className="city-card">
          <h3>Murree</h3>
          <p>21°C</p>
        </div>

      </div>

    </div>
  );
}

export default App;