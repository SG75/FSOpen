import { useState, useEffect } from "react";
import Filter from "./Filter";
import DisplayCountry from "./DisplayCountry";
import axios from "axios";

const App = () => {
  const [searchCountry, setSearchCountry] = useState("");
  const [allCountries, setAllCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [weather, setWeather] = useState(null);
  const [weatherStatus, setWeatherStatus] = useState("idle");
  const [weatherError, setWeatherError] = useState("");

  // console.log(countryDetails);

  useEffect(() => {
    if (!selectedCountry) return;

    const coordinates = selectedCountry.capitalInfo?.latlng;

    if (!coordinates || coordinates.length < 2) {
      setWeatherStatus("error");
      setWeatherError("capital coordinates are unavailable.");
      return;
    }

    let cancelled = false;
    const [latitude, longitude] = coordinates;
    console.log(coordinates);

    const fetchWeather = async () => {
      setWeatherStatus("loading");
      setWeatherError("");
      try {
        const response = await axios.get(
          "https://api.openweathermap.org/data/2.5/weather",
          {
            params: {
              lat: latitude,
              lon: longitude,
              appid: import.meta.env.VITE_OPENWEATHER_API_KEY,
              units: "metric",
            },
          },
        );
        console.log(response.data);
        if (!cancelled) {
          setWeather(response.data);
          setWeatherStatus("success");
        }
      } catch (error) {
        if (!cancelled) {
          setWeatherError("could not fetch weather data.");
          setWeatherStatus("error");
        }
      }
    };
    fetchWeather();

    return () => {
      cancelled = true;
    };
  }, [selectedCountry]);

  useEffect(() => {
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then((response) => {
        setAllCountries(response.data);
      });
  }, []);

  const filteredCountries = allCountries.filter((country) =>
    country.name.common
      .toLowerCase()
      .includes(searchCountry.toLowerCase().trim()),
  );

  return (
    <>
      <div className="container">
        <h1>Countries</h1>
        <Filter
          searchCountry={searchCountry}
          setSearchCountry={setSearchCountry}
          setSelectedCountry={setSelectedCountry}
        />
        {searchCountry.trim() !== "" && (
          <div className="filterResults">
            {filteredCountries.length > 10 ? (
              <p>Too many matches, specify another filter</p>
            ) : filteredCountries.length > 1 ? (
              filteredCountries.map((country) => (
                <p key={country.cca3}>
                  {country.name.common}
                  <button
                    className="showBtn"
                    onClick={() => setSelectedCountry(country)}
                  >
                    Show
                  </button>
                </p>
              ))
            ) : filteredCountries.length === 1 ? (
              <DisplayCountry country={filteredCountries[0]} />
            ) : (
              <p>No Countries found</p>
            )}
          </div>
        )}
        {selectedCountry && <DisplayCountry country={selectedCountry} />}

        {selectedCountry && (
          <div className="weather">
            <h2>Weather in {selectedCountry.capital?.[0]}</h2>
            {weatherStatus === "error" && <p>{weatherError}</p>}
            {weatherStatus === "success" && weather && (
              <>
                <h3>{weather.main.temp} °C</h3>
                <p>{weather.weather[0].description}</p>
                <img
                  src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                  alt={weather.weather[0].description}
                />
                <p>Feels Like: {weather.main.feels_like} °C</p>
                <p>Humidity: {weather.main.humidity} %</p>
                <p>Wind speed: {weather.wind.speed} m/s</p>
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default App;
