import "./style.css";
import { getDataFromLocation } from "./weatherAPIFunctions";
import { displayData } from "./domFunctions";
let unitMode = "metric";
const metricTemp = "\u00b0C";
let currTemp = metricTemp;

const searchForm = document.getElementById("enterWeatherLocation");

searchForm.onsubmit = (e) => {
  e.preventDefault();
  searchWeather();
};

async function searchWeather() {
  const searchBox = document.getElementById("cityName");
  const weatherData = await getDataFromLocation(searchBox.value);
  displayData(weatherData.basic, weatherData.advanced);
  searchForm.reset();
}

export { unitMode, currTemp };

window.onload = async () => {
  let data = await getDataFromLocation("dubai");
  displayData(data.basic, data.advanced);
};
