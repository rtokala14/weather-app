import Icon from "./media/main-logo.png";
import { currCity, currTemp, unitMode } from "./index";
import { getDataFromLocation } from "./weatherAPIFunctions";
import { displayMapInit } from "./mapFunctions";

let map = null;

const unitButton = document.getElementById("unitButton");
unitButton.onclick = async () => {
  if (unitMode == "metric") {
    unitMode = "imperial";
    currTemp = "\u00b0F";
    unitButton.textContent = "\u00b0F";
  } else if (unitMode == "imperial") {
    unitMode = "metric";
    currTemp = "\u00b0C";
    unitButton.textContent = "\u00b0C";
  }
  let data = await getDataFromLocation(currCity);
  displayData(data.basic, data.advanced);
};

function initalize(lat, lon) {
  const titleIcon = document.querySelector("#title-icon");
  titleIcon.src = Icon;

  map = displayMapInit(lat, lon);
}

function disCurrTime(unixTime) {
  const domField = document.getElementById("today-date");

  let timestamp = new Date(unixTime * 1000);
  /*let day = timestamp.getDay();
  let date = timestamp.getDate();
  let month = timestamp.getMonth();
  let year = timestamp.getFullYear();
  */

  //domField.textContent = `${day} ${date}, ${month} ${year}`;
  domField.textContent = timestamp.toDateString();
}

function displaySummary(basic, advanced) {
  const city = document.getElementById("summary-city");
  city.textContent = basic.name;

  const status = document.getElementById("summary-status");
  status.textContent = basic.weather[0].description;

  const feels = document.getElementById("summary-feels");
  feels.textContent = `Feels like: ${Math.round(
    basic.main.feels_like
  )}${currTemp}`;

  const main_temp = document.getElementById("main-temp");
  main_temp.textContent = `${Math.round(basic.main.temp)}${currTemp}`;

  const min_temp = document.getElementById("min-temp");
  min_temp.textContent = `Min: ${Math.round(basic.main.temp_min)}${currTemp}`;

  const max_temp = document.getElementById("max-temp");
  max_temp.textContent = `Max: ${Math.round(basic.main.temp_max)}${currTemp}`;
}

function addEntry(text) {
  const item = document.createElement("div");
  item.className = "text-lg p-4";
  item.textContent = text;
  return item;
}

function displayAdditional(data) {
  const container = document.getElementById("additional-info");

  container.textContent = "";

  container.appendChild(addEntry(`Humidity: ${data.main.humidity}%`));
  let time = new Date(data.sys.sunrise * 1000);
  container.appendChild(addEntry(`Sunrise: ${time.toTimeString()}`));
  let time2 = new Date(data.sys.sunset * 1000);
  container.appendChild(addEntry(`Sunset: ${time2.toTimeString()}`));
  container.appendChild(addEntry(`Wind Speed: ${data.wind.speed}`));
}

function displayData(basic, advanced) {
  disCurrTime(advanced.current.dt);
  console.log(basic, advanced);

  displaySummary(basic, advanced);

  displayAdditional(basic);

  map.panTo([basic.coord.lat, basic.coord.lon]);
}

export { displayData, initalize };
