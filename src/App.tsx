import { useEffect, useState } from "react";
import "./App.css";
import SearchBar from "../src/assets/SearchBar.tsx";

interface Location {
  name: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
}

interface Condition {
  text: string;
  icon: string;
}

interface Day {
  maxtemp_c: number;
  mintemp_c: number;
  avgtemp_c: number;
  condition: Condition;
}

interface ForecastDay {
  date: string;
  day: Day;
}

interface Forecast {
  forecastday: ForecastDay[];
}

interface WeatherResponse {
  location: Location;
  forecast: Forecast;
}

function App() {
  const [weather, setWeather] = useState<WeatherResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function getWeatherByCoords(
    lat: number,
    lon: number,
  ): Promise<WeatherResponse> {
    const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

    const response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${lat},${lon}&days=7`,
    );

    if (!response.ok) {
      throw new Error("Failed to fetch weather");
    }

    return response.json();
  }

  async function getCurrentPosition(): Promise<GeolocationPosition> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  }

  useEffect(() => {
    async function loadWeather() {
      try {
        const position = await getCurrentPosition();
        const { latitude, longitude } = position.coords;

        const data = await getWeatherByCoords(latitude, longitude);
        setWeather(data);
      } catch (err) {
        setError("Could not load");
      } finally {
        setLoading(false);
      }
    }

    loadWeather();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!weather) return <p>No weather data</p>;

  async function getWeatherByCity(city: string): Promise<WeatherResponse> {
    const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

    const response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=7`,
    );

    if (!response.ok) {
      throw new Error("Failed to fetch weather");
    }

    return response.json();
  }

  async function handleSearch(city: string) {
    try {
      setLoading(true);
      setError(null);

      const data = await getWeatherByCity(city);
      setWeather(data);
    } catch (err) {
      setError("Oops! Location not found.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h1 className="header">
        {weather.location.name}, {weather.location.country}
      </h1>
      <div className="weather-container">
        {weather.forecast.forecastday.map((day) => (
          <div key={day.date} className="weather-box">
            <h2>
              {" "}
              {new Date(day.date).toLocaleDateString("en-GB", {
                weekday: "long",
                day: "numeric",
                month: "short",
              })}
            </h2>
            <div className="icon-condition">
              <img className="icon" src={day.day.condition.icon} alt="" />
              <p className="condition">{day.day.condition.text}</p>
            </div>
            <p>High of {day.day.maxtemp_c}°C</p>
            <p>Low of {day.day.mintemp_c}°C</p>
          </div>
        ))}
      </div>
      <SearchBar onSearch={handleSearch} />
    </div>
  );
}

export default App;
