function changeCity(event) {
  event.preventDefault();
  let searchCity = document.querySelector("#search-city");
  let searchCityInput = document.querySelector("#search-city-input");
  let units = "metric";
  let apiKey = "b34ef3b4fee7b2098cbfab18c5c5867d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchCityInput.value}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(showNewCityWeather);

  apiUrl=`https://api.openweathermap.org/data/2.5/forecast?q=${searchCityInput.value}&units=${units}&appid=${apiKey}`;
axios.get(apiUrl).then(showForecast);
  
}
function showNewCityWeather(response) {
  document.querySelector(
    "h1"
  ).innerHTML = `${response.data.name}, ${response.data.sys.country}`;
  document.querySelector(".temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector(".symbol").innerHTML=`°C`
  document.querySelector(".description").innerHTML =
    response.data.weather[0].main;
    celciusTemperature=response.data.main.temp;
    let weatherIconElement= document.querySelector("#weather-icon")
    weatherIconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`)
    weatherIconElement.setAttribute("alt", response.data.weather[0].main)
    let humidity = document.querySelector(".humidity");
  let windSpeed = document.querySelector(".wind-speed");
  let maxTemp = document.querySelector(".max-temp");
  humidity.innerHTML = response.data.main.humidity;
  windSpeed.innerHTML = Math.round(response.data.wind.speed);
  maxTemp.innerHTML = Math.round(response.data.main.temp_max);

}

function findDefaultCity(city) {
  let units="metric"
  let apiKey = "b34ef3b4fee7b2098cbfab18c5c5867d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(showNewCityWeather);
  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(showForecast);
}
function showForecast(response) {
  let forecast = null;
  let forecastElement = document.querySelector("#forecast-cols");
  forecastElement.innerHTML = null;
  for (let index = 0; index < 4; index++) {
    forecast = response.data.list[index];
    let iconElement = forecast.weather[0].icon;
    forecastElement.innerHTML += `
    
    <div class="col-3 text-center">
    <div class="forecast-time">
    <p>time</p>
       </div>                             <img class="forecast-icon" src="http://openweathermap.org/img/wn/${iconElement}@2x.png"></img>
                                    <p>${forecast.weather[0].description}</p>
                                    <p><strong>${Math.round(
                                      forecast.main.temp_max
                                    )}</strong></p>
      <p>${Math.round(forecast.main.temp_min)}</p>
                                </div>`;
  }
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
  apiUrl=`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=${units}&appid=${apiKey}`;
axios.get(apiUrl).then(showForecast);
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
    document.querySelector(".symbol").innerHTML=`°C`
let weatherIconElement= document.querySelector("#weather-icon")
    weatherIconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`)
    weatherIconElement.setAttribute("alt", response.data.weather[0].main)
  }

function showCelcius(event) {
  event.preventDefault();
  let celciusButton = document.querySelector("#celcius-button");
  let tempDisplay = document.querySelector(".temp");
  let celciusTemp = Math.round(celciusTemperature);
  tempDisplay.innerHTML = `${celciusTemp}`;
  let symbolElement= document.querySelector(".symbol")
  symbolElement.innerHTML= "°C";
}

function showFarenheit(event) {
  event.preventDefault();
  let farenheitButton = document.querySelector("#farenheit-button");
  let tempDisplay = document.querySelector(".temp");
  let farenheitTemp = Math.round((celciusTemperature * 9) / 5 + 32);
  tempDisplay.innerHTML = `${farenheitTemp}`;
  let symbolElement= document.querySelector(".symbol")
  symbolElement.innerHTML= "°F";
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

let celciusTemperature= null
findDefaultCity("glasgow");