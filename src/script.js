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
  let cityTemp = Math.round(response.data.main.temp);
  let displayTemp = document.querySelector("#number-temp");
  let cityWeatherDescription = response.data.weather[0].main;
  let displayWeatherDescription = document.querySelector(
    "#weather-description"
  );
  let cityTempMax = Math.round(response.data.main.temp_max);
  let displayTempMax = document.querySelector("#temp-max");
  let cityTempMin = Math.round(response.data.main.temp_min);
  let displayTempMin = document.querySelector("#temp-min");
  let cityHumidity = Math.round(response.data.main.humidity);
  let displayHumidity = document.querySelector("#humidity");
  let cityWind = Math.round(response.data.wind.speed);
  let displayWind = document.querySelector("#wind-speed");

  let apiIcon = response.data.weather[0].icon;
  if (apiIcon === "01d") {
    document.getElementById("current-icon").className = "fas fa-sun";
  }
  if (apiIcon === "01n") {
    document.getElementById("current-icon").className = "fas fa-moon";
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
    document.getElementById("current-icon").className = "fas fa-cloud";
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
    document.getElementById("current-icon").className = "fas fa-poo-storm";
  }
  if (apiIcon === "13d" || apiIcon === "13n") {
    document.getElementById("current-icon").className = "fas fa-snowflake";
  }
  if (apiIcon === "50d" || apiIcon === "50n") {
    document.getElementById("current-icon").className = "fas fa-smog";
  }

  displayCity.innerHTML = `${cityName}`;
  displayTemp.innerHTML = `${cityTemp}°`;
  fahrenheitTemp = response.data.main.temp;
  displayWeatherDescription.innerHTML = `${cityWeatherDescription}`;
  displayTempMax.innerHTML = `High ${cityTempMax}° |`;
  displayTempMin.innerHTML = `Low ${cityTempMin}°`;
  displayHumidity.innerHTML = `Humidity ${cityHumidity}%`;
  displayWind.innerHTML = `Wind Speed ${cityWind} mph`;
}

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  forecastHTML =
    forecastHTML +
    `
    <div class="col-2">
      <i id="forecast-icon" class="fas fa-snowflake"></i>
      <div><strong>Wed</strong></div>
      <div>23° / 14°</div>
    </div>  
  `;
  forecastHTML =
    forecastHTML +
    `
    <div class="col-2">
      <i id="forecast-icon" class="fas fa-snowflake"></i>
      <div><strong>Wed</strong></div>
      <div>23° / 14°</div>
    </div>  
  `;
  forecastHTML =
    forecastHTML +
    `
    <div class="col-2">
      <i id="forecast-icon" class="fas fa-snowflake"></i>
      <div><strong>Wed</strong></div>
      <div>23° / 14°</div>
    </div>  
  `;
  forecastHTML =
    forecastHTML +
    `
    <div class="col-2">
      <i id="forecast-icon" class="fas fa-snowflake"></i>
      <div><strong>Wed</strong></div>
      <div>23° / 14°</div>
    </div>  
  `;
  forecastHTML =
    forecastHTML +
    `
    <div class="col-2">
      <i id="forecast-icon" class="fas fa-snowflake"></i>
      <div><strong>Wed</strong></div>
      <div>23° / 14°</div>
    </div>  
  `;
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
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

function displayCelsiusTemp(event) {
  event.preventDefault();

  let celsiusTemperature = Math.round(((fahrenheitTemp - 32) * 5) / 9);
  let displayTemp = document.querySelector("#number-temp");
  farenClick.classList.remove("active");
  celsiusClick.classList.add("active");
  displayTemp.innerHTML = `${celsiusTemperature}°`;
}

function displayFarenTemp(event) {
  event.preventDefault();
  let displayTemp = document.querySelector("#number-temp");
  celsiusClick.classList.remove("active");
  farenClick.classList.add("active");
  displayTemp.innerHTML = Math.round(fahrenheitTemp);
}

let fahrenheitTemp = null;

let celsiusClick = document.querySelector("#celsius-click");
celsiusClick.addEventListener("click", displayCelsiusTemp);

let farenClick = document.querySelector("#faren-click");
farenClick.addEventListener("click", displayFarenTemp);

searchCity("Los Angeles");
displayForecast();
