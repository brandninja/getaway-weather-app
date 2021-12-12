let now = new Date();
let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let day = days[now.getDay()];
let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
let month = months[now.getMonth()];
let date = now.getDate();
let year = now.getFullYear();
let currentDate = document.querySelector("#current-date");
currentDate.innerHTML = `${day}, ${month} ${date}, ${year}`;

let localeTime = now.toLocaleTimeString(`en-US`);
let currentTime = document.querySelector("#current-time");
currentTime.innerHTML = `${localeTime}`;

//above this is the auto-updated date and time

function displayWeather(response) {
  let cityName = response.data.name;
  let displayCity = document.querySelector("#display-city");
  displayCity.innerHTML = `${cityName}`;

  let cityTemp = Math.round(response.data.main.temp);
  let displayTemp = document.querySelector("#number-temp");
  displayTemp.innerHTML = `${cityTemp}°`;

  let cityWeatherDescription = response.data.weather[0].main;
  let displayWeatherDescription = document.querySelector(
    "#weather-description"
  );
  displayWeatherDescription.innerHTML = `${cityWeatherDescription}`;

  let cityTempMax = Math.round(response.data.main.temp_max);
  let displayTempMax = document.querySelector("#temp-max");
  displayTempMax.innerHTML = `High ${cityTempMax}° |`;

  let cityTempMin = Math.round(response.data.main.temp_min);
  let displayTempMin = document.querySelector("#temp-min");
  displayTempMin.innerHTML = `Low ${cityTempMin}°`;

  let cityHumidity = Math.round(response.data.main.humidity);
  let displayHumidity = document.querySelector("#humidity");
  displayHumidity.innerHTML = `Humidity ${cityHumidity}%`;

  let cityWind = Math.round(response.data.wind.speed);
  let displayWind = document.querySelector("#wind-speed");
  displayWind.innerHTML = `Wind Speed ${cityWind} mph`;

  let apiIcon = response.data.weather[0].icon;
  if (apiIcon === "01d") {
    document.getElementById("current-icon").className = "fas fa-sun";
  }
  if (apiIcon === "01n") {
    document.getElementById("current-icon").className = "fas fa-moon-stars";
  }
  if (apiIcon === "02d") {
    document.getElementById("current-icon").className = "fas fa-cloud-sun";
  }
  if (apiIcon === "02n") {
    document.getElementById("current-icon").className = "fas fa-cloud-moon";
  }
  if (apiIcon === "03d" || apiIcon === "03n") {
    document.getElementById("current-icon").className = "fas fa-cloud";
  }
  if (apiIcon === "04d" || apiIcon === "04n") {
    document.getElementById("current-icon").className = "fas fa-clouds";
  }
  if (apiIcon === "09d" || apiIcon === "09n") {
    document.getElementById("current-icon").className =
      "fas fa-cloud-showers-heavy";
  }
  if (apiIcon === "10d") {
    document.getElementById("current-icon").className = "fas fa-cloud-sun-rain";
  }
  if (apiIcon === "10n") {
    document.getElementById("current-icon").className =
      "fas fa-cloud-moon-rain";
  }
  if (apiIcon === "11d" || apiIcon === "11n") {
    document.getElementById("current-icon").className = "fas fa-cloud-bolt";
  }
  if (apiIcon === "13d" || apiIcon === "13n") {
    document.getElementById("current-icon").className = "fas fa-snowflake";
  }
  if (apiIcon === "50d" || apiIcon === "50n") {
    document.getElementById("current-icon").className = "fas fa-cloud-fog";
  }
}

function searchCity(city) {
  let apiKey = "b3cdb6968572344c2ff1c9ddda2aeb03";
  let units = "imperial";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#destination-input").value;
  searchCity(city);
}

let letsGoButton = document.querySelector("#lets-go-button");
letsGoButton.addEventListener("submit", handleSubmit);

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "b3cdb6968572344c2ff1c9ddda2aeb03";
  let units = "imperial";
  let endpointUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  axios.get(endpointUrl).then(displayWeather);
}

function stayHome(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let stayHomeButton = document.querySelector("#stay-home-button");
stayHomeButton.addEventListener("click", stayHome);

searchCity("Los Angeles");

// below this line, change to F, change to C with fake data

//function changeToFaren(event) {
//  event.preventDefault();
//  let numberTemp = document.querySelector("#number-temp");
//  numberTemp.innerHTML = "17°";
// }

// let farenClick = document.querySelector("#faren-click");
// farenClick.addEventListener("click", changeToFaren);

// function changeToCelsius(event) {
//  event.preventDefault();
//  let numberTemp = document.querySelector("#number-temp");
//  numberTemp.innerHTML = "5°";
//  }
// let celsiusClick = document.querySelector("#celsius-click");
// celsiusClick.addEventListener("click", changeToCelsius);

//when a user searches for a city (example: New York), it should display the
//name of the city on the result page and the current temperature of the city.
//Add a Current Location button. When clicking on it, it uses the Geolocation API
//to get your GPS coordinates and display and the city and current temperature using the OpenWeather API.
