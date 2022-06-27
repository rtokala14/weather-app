async function getDataFromLocation(location) {
  const requestURL = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=458d904b9b107250ccc645f8417f034d`;

  const reponse = await fetch(requestURL, { mode: "cors" });
  const weatherData = await reponse.json();

  return weatherData;
}

export { getDataFromLocation };
