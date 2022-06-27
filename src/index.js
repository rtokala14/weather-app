import "./style.css";
import { getDataFromLocation } from "./weatherAPIFunctions";

const searchForm = document.getElementById("enterWeatherLocation");

searchForm.onsubmit = (e) => {
  e.preventDefault();
  searchWeather();
};

async function searchWeather() {
  const searchBox = document.getElementById("cityName");
  const weatherData = await getDataFromLocation(searchBox.value);
  console.log(weatherData);
  searchForm.reset();
}
