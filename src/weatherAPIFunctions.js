import { unitMode } from "./index.js";

async function getCoords(location) {
  const requestURL = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=20f7632ffc2c022654e4093c6947b4f4`;
  const reponse = await fetch(requestURL, { mode: "cors" });
  const basicData = await reponse.json();
  return basicData;
}

async function getForecast(lat, long) {
  const requestURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&units=${unitMode}&exclude=minutely,alerts&appid=20f7632ffc2c022654e4093c6947b4f4`;
  const response = await fetch(requestURL, { mode: "cors" });
  const forecastData = await response.json();
  return forecastData;
}

async function getDataFromLocation(location) {
  const basicData = await getCoords(location);
  const lat = basicData.coord.lat;
  const long = basicData.coord.lon;
  const forecastData = await getForecast(lat, long);

  return { basic: basicData, advanced: forecastData };
}

export { getDataFromLocation };
