import "./style.css";
import { getDataFromLocation } from "./weatherAPIFunctions";
import { displayData, initalize } from "./domFunctions";
let unitMode = "metric";
const metricTemp = "\u00b0C";
const imperialTemp = "\u00b0F";
let currTemp = metricTemp;
let currCity = "Dubai";

const searchForm = document.getElementById("enterWeatherLocation");

searchForm.onsubmit = (e) => {
  e.preventDefault();
  searchWeather();
};

async function searchWeather() {
  const searchBox = document.getElementById("cityName");
  const weatherData = await getDataFromLocation(searchBox.value);
  currCity = weatherData.basic.name;
  displayData(weatherData.basic, weatherData.advanced);
  searchForm.reset();
}

export { unitMode, currTemp, currCity };

window.onload = async () => {
  let data = await getDataFromLocation("dubai");
  initalize(data.basic.coord.lat, data.basic.coord.lon);
  displayData(data.basic, data.advanced);
};
