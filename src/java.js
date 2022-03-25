https: function formatDate(timestamp) {
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

function formatDay(timestamp) {
  console.log(timestamp);
  let days = ["Sun", "Mon", "Tues", "Wed", "Thu", "Fri", "Sat"];
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  return `${days[day]}`;
}

function handleRequest(event) {
  event.preventDefault();
  let city = document.querySelector("#search-engine").value;
  search(city);
}

function search(city) {
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
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
  let urlCurrentLocation = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(urlCurrentLocation).then(showWeather);
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
  formatDate(response.data.dt * 1000);
  getForecast(response.data.coord);
}

function getForecast(response) {
  let url = `https://api.openweathermap.org/data/2.5/onecall?lat=${response.lat}&lon=${response.lon}&exclude={part}&appid=${apiKey}&units=metric`;
  axios.get(url).then(displayForecast);
}

function displayForecast(response) {
  let forecastDay = response.data.daily;
  let days = ["Sun", "Mon", "Tue", "Wed", "Fri"];
  let forecast = document.querySelector("#weather-forecast");
  let forecastHTML = ``;

  forecastDay.forEach(function (forecastDay, index) {
    if (index > 0 && index < 6) {
      forecastHTML =
        forecastHTML +
        `     <div class="col-2">
                    <div class="card">
                      <div class="card-body">
                        <h5 class="card-title">${formatDay(forecastDay.dt)}</h5>
                        <img src="http://openweathermap.org/img/wn/${
                          forecastDay.weather[0].icon
                        }@2x.png" class="forecast-weather-icon"></img>
                        <p class="card-text five-day-forecast">
                          <span class="max-temp">${Math.round(
                            forecastDay.temp.max
                          )}°</span>
                          <span class="min-temp">${Math.round(
                            forecastDay.temp.min
                          )}°</span>
                        </p>
                      </div>
                    </div>
                  </div>
      
            `;
    }
  });

  forecast.innerHTML = forecastHTML;
}

let form = document.querySelector("form");
form.addEventListener("submit", handleRequest);

let localWeather = document.querySelector("#local");
localWeather.addEventListener("click", currentLocationWeather);

let apiKey = "6058dab818729bfcd7473650aa63148c";

search("London");
