//👨‍🏫 Your task
//In your project, when a user searches for a city (example: New York), it should display the name of the city
//on the result page and the current temperature of the city.
//Please note: there's no need to include a temperature conversion at the moment. This will be taught later on in the course.
//🙀 Bonus point:
//Add a Current Location button. When clicking on it, it uses the Geolocation API to get your GPS coordinates
//and display and the city and current temperature using the OpenWeather API.

function formatDate(timestamp) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let date = new Date(timestamp);
  let day = date.getDay();
  let hour = date.getHours();
  if (hour < 10) {
    return `0${hour}`;
  }

  let minutes = date.getMinutes();
  if (minutes < 10) {
    return `0${minutes}`;
  }

  document.querySelector(
    "#date-time"
  ).innerHTML = `${days[day]} ${hour}:${minutes}`;
}

function showWeather(response) {
  document.querySelector("#today-weather").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#searched-city").innerHTML = response.data.name;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#weather-conditions").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#wind-speed").innerHTML = Math.round(
    response.data.wind.speed
  );
  let iconElement = document.querySelector("#today-weather-icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  celsiusTemperature = response.data.main.temp;
  formatDate(response.data.dt * 1000);
}

function search(city) {
  let apiKey = "6058dab818729bfcd7473650aa63148c";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(url).then(showWeather);
}

function handleRequest(event) {
  event.preventDefault();
  let city = document.querySelector("#search-engine").value;
  search(city);
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
  axios.get(urlCurrentLocation).then(showWeather);
}

function convertToFahrenheit(event) {
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemp = (celsiusTemperature * 9) / 5 + 32;
  document.querySelector("#today-weather").innerHTML =
    Math.round(fahrenheitTemp);
}

function convertToCelsius(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  document.querySelector("#today-weather").innerHTML =
    Math.round(celsiusTemperature);
}

search("Paris");

let form = document.querySelector("form");
form.addEventListener("submit", handleRequest);

let localWeather = document.querySelector("#local");
localWeather.addEventListener("click", currentLocationWeather);

let celsiusTemperature = null;

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", convertToCelsius);
let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

// let farenheit = document.querySelector(".farenheit");
// farenheit.addEventListener("click", farenheitWeather);

// let celsius = document.querySelector(".celsius");
// celsius.addEventListener("click", celsiusWeather);
