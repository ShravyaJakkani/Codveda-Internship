import React, { useState } from "react";
import "./index.css";

const API_KEY = "bd7ca7b4e2df56cc5ba3bb9fe65eb85a"; // Replace with your OpenWeatherMap key

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);

  const fetchWeather = async () => {
    if (!city) return;

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`

    );
    const data = await response.json();
    console.log(data);
    console.log(weather);

    if (data.cod === 200) {
      setWeather(data);
    } else {
      alert("City not found.");
    }
  };

  const weatherType = weather && weather.weather && weather.weather[0] ? weather.weather[0].main.toLowerCase(): "default";

  return (
    
    <div className={`app ${weatherType}`}>
      <div className="search-box">
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={fetchWeather}>Get Weather</button>
      </div>

      {weather && (
        <div className="weather-info">
          <h2>{weather.name}</h2>
          <p>{weather.weather[0].main}</p>
          <h3>{Math.round(weather.main.temp)}°C</h3>
        </div>
      )}
    </div>
  );
  
  
}

export default App;