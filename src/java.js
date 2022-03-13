//👨‍🏫 Your task
//In your project, when a user searches for a city (example: New York), it should display the name of the city
//on the result page and the current temperature of the city.
//Please note: there's no need to include a temperature conversion at the moment. This will be taught later on in the course.
//🙀 Bonus point:
//Add a Current Location button. When clicking on it, it uses the Geolocation API to get your GPS coordinates
//and display and the city and current temperature using the OpenWeather API.

function searchCity(event) {
  event.preventDefault();
  let city = document.querySelector("#search-engine").value;
  let searchedCity = document.querySelector("#searched-city");
  searchedCity.innerHTML = `${city}`;
}

function todayDate() {
  let header = document.querySelector("header");
  console.log(`${days[day]} ${hour}:${minutes}`);
  header.innerHTML = `${days[day]} ${hour}:${minutes}`;
}

function showWeather(response) {
  let temp = Math.round(response.data.main.temp);
  let todayWeather = document.querySelector("#today-weather");
  todayWeather.innerHTML = temp;
}

function weatherLocation(event) {
  event.preventDefault();
  let city = document.querySelector("#search-engine").value;
  let searchedCity = document.querySelector("#searched-city");
  searchedCity.innerHTML = `${city}`;
  let units = "metric";
  let apiKey = "6058dab818729bfcd7473650aa63148c";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(url).then(showWeather);
}

function currentLocationWeather(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(currentCoords);
}

function currentCoords(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let apiKey = "6058dab818729bfcd7473650aa63148c";
  //api.openweathermap.org/data/2.5/weather?
  let urlCurrentLocation = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(urlCurrentLocation).then(displayCurrentWeather);
}

function displayCurrentWeather(response) {
  let tempLocal = Math.round(response.data.main.temp);
  let city = response.data.name;
  let todayWeather = document.querySelector("#today-weather");
  let searchedCity = document.querySelector("#searched-city");
  searchedCity.innerHTML = `${city}`;
  todayWeather.innerHTML = tempLocal;
}

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let date = new Date();
let day = date.getDay();
let hour = date.getHours();
let minutes = date.getMinutes();
todayDate();

let todayWeather = document.querySelector("#today-weather");
let initialWeather = 15;
todayWeather.innerHTML = `${initialWeather}`;

let form = document.querySelector("form");
form.addEventListener("submit", searchCity);
form.addEventListener("submit", weatherLocation);

let localWeather = document.querySelector("#local");
localWeather.addEventListener("click", currentLocationWeather);

// let farenheit = document.querySelector(".farenheit");
// farenheit.addEventListener("click", farenheitWeather);

// let celsius = document.querySelector(".celsius");
// celsius.addEventListener("click", celsiusWeather);
