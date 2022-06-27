import Icon from "./media/main-logo.png";

function initalize() {
  const titleIcon = document.querySelector("#title-icon");
  titleIcon.src = Icon;
}

function disCurrTime(unixTime) {
  const domField = document.getElementById("today-date");

  let timestamp = new Date(unixTime * 1000);
  let day = timestamp.getDay();
  let date = timestamp.getDate();
  let month = timestamp.getMonth();
  let year = timestamp.getFullYear();

  //domField.textContent = `${day} ${date}, ${month} ${year}`;
  domField.textContent = timestamp.toDateString();
}

function displayData(basic, advanced) {
  initalize();
  disCurrTime(advanced.current.dt);
}

export { displayData };
