import { useEffect, useState } from "react";

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

  async function getWeatherForecast(): Promise<WeatherResponse> {
    const response = await fetch(
      "http://api.weatherapi.com/v1/forecast.json?key=60bb3afddbb347319a7133604260304&q=auto:ip&days=7",
    );

    if (!response.ok) {
      throw new Error("Failed to fetch weather");
    }

    return response.json();
  }
  useEffect(() => {
    async function loadWeather() {
      try {
        const data = await getWeatherForecast();
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

  return (
    <div>
      <h1>
        {weather.location.name}, {weather.location.country}
      </h1>

      {weather.forecast.forecastday.map((day) => (
        <div key={day.date}>
          <h2>{day.date}</h2>
          <p>{day.day.condition.text}</p>
          <p>Max: {day.day.maxtemp_c}°C</p>
          <p>Min: {day.day.mintemp_c}°C</p>
        </div>
      ))}
    </div>
  );
}
export default App;
