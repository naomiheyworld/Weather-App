function changeCity(event) {
  event.preventDefault();
  let searchCity = document.querySelector("#search-city");
  let searchCityInput = document.querySelector("#search-city-input");
  let units = "metric";
  let apiKey = "b34ef3b4fee7b2098cbfab18c5c5867d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchCityInput.value}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(showNewCityWeather);
}
function showNewCityWeather(response) {
  document.querySelector(
    "h1"
  ).innerHTML = `${response.data.name}, ${response.data.sys.country}`;
  document.querySelector(".temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector(".description").innerHTML =
    response.data.weather[0].main;
}
function getCurrentLocationUrl(position) {
  navigator.geolocation.getCurrentPosition(getCurrentLocationWeather);
}

function getCurrentLocationWeather(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let apiKey = "b34ef3b4fee7b2098cbfab18c5c5867d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(displayCurrentLocationWeather);
}
function displayCurrentLocationWeather(response) {
  document.querySelector(
    "h1"
  ).innerHTML = `${response.data.name}, ${response.data.sys.country}`;
  document.querySelector(".temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector(".description").innerHTML =
    response.data.weather[0].main;
}

function showCelcius(event) {
  event.preventDefault();
  let celciusButton = document.querySelector("#celcius-button");
  let tempDisplay = document.querySelector(".temp");

  let celciusTemp = Math.round(((tempDisplay.innerHTML - 32) * 5) / 9);
  tempDisplay.innerHTML = `${celciusTemp}`;
}

function showFarenheit(event) {
  event.preventDefault();
  let farenheitButton = document.querySelector("#farenheit-button");
  let tempDisplay = document.querySelector(".temp");
  let farenheitTemp = Math.round((tempDisplay.innerHTML * 9) / 5 + 32);
  tempDisplay.innerHTML = `${farenheitTemp}`;
}

let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];
let month = months[now.getMonth()];
let day = days[now.getDay()];
let dates = now.getDate();
if (dates < 10) {
  dates = `0${dates}`;
}
let hour = now.getUTCHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minute = now.getUTCMinutes();
if (minute < 10) {
  minute = `0${minute}`;
}
let date = document.querySelector(".date");
date.innerHTML = `${day} ${month} ${dates}  ${hour}:${minute}`;

let searchCity = document.querySelector("#search-city");
let searchCityInput = document.querySelector("#search-city-input");
searchCity.addEventListener("submit", changeCity);

let celciusButton = document.querySelector("#celcius-button");
let tempDisplay = document.querySelector(".temp");
celciusButton.addEventListener("click", showCelcius);

let farenheitButton = document.querySelector("#farenheit-button");
farenheitButton.addEventListener("click", showFarenheit);

let currentLocationButton = document.querySelector("#current-location");
currentLocationButton.addEventListener("click", getCurrentLocationUrl);
