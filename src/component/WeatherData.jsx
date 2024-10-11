import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./WeatherData.css";
import "./Loader.css";
import clear from "../Assets/clear.png";
import cloud from "../Assets/cloud.png";
import drizzle from "../Assets/drizzle.png";
import haze from "../Assets/haze.png";
import snow from "../Assets/snow.png";
import rain from "../Assets/rain.png";
import overcast from "../Assets/overcast.webp";
import thunderstormWithRain from "../Assets/thunderstorm_Rain.webp";
import dust from "../Assets/dust.webp";

const WeatherData = () => {
  const [city, setCity] = useState();
  const [weatherData, setWeatherData] = useState(null);
  const [loader, setLoader] = useState(false);

  const api_key = "7607141be0350ea995d492fe344ce08b";
  const fetchData = async (event) => {
    event.preventDefault(); // Prevent the default form submission
    setLoader(true);
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`
      );
      setWeatherData(response.data);
      console.log(response.data);
    } catch (err) {
      console.log(err);
      toast.error("Unable to fetch data ! Please Try again ");
    }
    setLoader(false);
  };

  // Destruct properties from api
  const { main, name, weather, sys, wind, dt } = weatherData || {};
  const weatherInfo = weather ? weather[0] : {};
  const { description } = weatherInfo;
  const sunriseTime = sys
    ? new Date(sys.sunrise * 1000).toLocaleTimeString()
    : "";
  const sunsetTime = sys
    ? new Date(sys.sunset * 1000).toLocaleTimeString()
    : "";

  const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    const day = String(date.getDate()).padStart(2, "0"); // Add leading zero if needed
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const date = dt ? formatDate(dt) : "";

  // Convert temperature from Kelvin to Celsius
  const tempInCelsius = main?.temp ? (main.temp - 273.15).toFixed(2) : "";

  const getWeatherImage = (condition) => {
    switch (condition) {
      case "clear sky":
        return clear;
      case "few clouds":
        return cloud;
      case "broken clouds":
        return cloud;
      case "scattered clouds":
        return cloud;
      case "light rain":
        return rain;
      case "moderate rain":
        return rain;
      case "heavy intensity rain":
        return rain;
      case "haze":
        return haze;
      case "light snow":
        return snow;
      case "heavy snow":
        return snow;
      case "light intensity drizzle":
        return drizzle;
      case "heavy intensity drizzle":
        return drizzle;
      case "overcast clouds":
        return overcast;
      case "thunderstorm with light rain":
        return thunderstormWithRain;
      case "thunderstorm with heavy rain":
        return thunderstormWithRain;
      case "dust":
        return dust;
      default:
        return null; // Or a default image
    }
  };
  return (
    <>
      <form
        className="flex justify-center items-center mt-2"
        onSubmit={fetchData}
      >
        <input
          type="text"
          name="input"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="border-2 border-blue-400 p-3 w-full sm:w-3/4 md:w-2/3 lg:w-1/3 rounded placeholder:font-bold"
          placeholder="Enter your city here"
        />
        <button
          type="submit"
          className="bg-white p-3 border-blue-400 border-2 ml-2 font-semibold rounded"
        >
          Get weather
        </button>
      </form>

      {loader ? (
        <div className="loader"></div>
      ) : (
        weatherData && (
          <div
            className={`mt-2 mx-auto p-6 rounded-lg sm:w-3/4 md:w-2/3 lg:w-1/3 xl:w-1/3 text-white shadow-lg ${
              tempInCelsius >= 30 ? "bg-red-400" : "bg-blue-400"
            }`}
          >
            <h2 className="text-3xl font-bold font-serif mb-1 text-center">
              <i className="fa-solid fa-location-dot"></i> {name}
            </h2>
            <p className="text-center text-base font-sans font-bold">{date}</p>
            <div className="flex justify-center items-center mt-2">
              <img
                src={getWeatherImage(description)}
                alt={description}
                className="w-[100px] sm:w-[120px] lg:w-[130px]"
              />
              <p className="font-sans text-4xl sm:text-5xl text-center font-bold">
                {tempInCelsius}°C
              </p>
            </div>
            <p className="text-xl sm:text-2xl text-center font-bold mt-[-8px] mb-1">
              {description}
            </p>
            <p className="text-base text-center mb-1">
              Feels Like: {main.feels_like}
            </p>

            <div className="flex flex-wrap justify-between mt-4">
              <div className="text-center">
                <i className="fa-solid fa-wind bg-blue-600 px-2 py-2 rounded-full text-black"></i>
                <p className="font-bold text-lg">{wind.speed} Km/h</p>
                <p className="font-bold text-base">Wind Speed</p>
              </div>
              <div className="text-center">
                <img
                  src="https://creazilla-store.fra1.digitaloceanspaces.com/icons/3231113/humidity-icon-md.png"
                  className="w-[30px] bg-blue-600 p-1 rounded-full"
                />
                <p className="font-bold text-lg">{main.humidity}%</p>
                <p className="font-bold text-base">Humidity</p>
              </div>
              <div className="text-center">
                <img
                  src="https://cdn0.iconfinder.com/data/icons/weather-forecast-18/40/Precipitation_Humidity_Waves_Water_Weather_Forecast-128.png"
                  className="w-[30px] bg-blue-600 p-1 rounded-full"
                />
                <p className="font-bold text-lg">{main.pressure} M/B</p>
                <p className="font-bold text-base">Pressure</p>
              </div>
            </div>

            <div className="flex justify-between mt-2">
              <div className="text-center">
                <p className="font-bold text-lg">Sunrise ☀</p>
                <p>{sunriseTime}</p>
              </div>
              <div className="text-center">
                <p className="font-bold text-lg">Sunset 🌜</p>
                <p>{sunsetTime}</p>
              </div>
            </div>
          </div>
        )
      )}
    </>
  );
};

export default WeatherData;
