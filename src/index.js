function refreshWeather(response) {
  let temperatureElement = document.querySelector("#weather-app-temp");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#city");
  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#wind-speed");
  let iconElement = document.querySelector("#icon");

  cityElement.innerHTML = response.data.city;
  timeElement.innerHTML = formatDate(date);
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windSpeedElement.innerHTML = `${response.data.wind.speed}km/h`;
  iconElement.innerHTML = `<img
      src="${response.data.condition.icon_url}"
      class="weather-app-icon"
    />`;
  temperatureElement.innerHTML = Math.round(temperature);
}

function formatDate(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let days = [
    `Sunday`,
    `Monday`,
    `Tuesday`,
    `Wednesday`,
    `Thursday`,
    `Friday`,
    `Saturday`,
  ];

  let day = days[date.getDay()];
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day} ${hours}:${minutes}`;
}

function searchCity(city) {
  //make the API call and update the interface

  let apiKey = "a4a3o83044e30bf2e965a940tb084f55";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(refreshWeather);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");

  searchCity(searchInput.value);
}

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");

  let days = ["Tue", `Wed`, `Thu`, `Fri`, `Sat`];
  let forecastHtml = "";

  days.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      `
          <div class="weather-forecast">
            <div class="forecast-day">${day}</div>
            <div class="forecast-icon">🌤️</div>
            <div class="forecast-temp">
              <span class="forecast-temp-max">18°</span>
              <span class="forecast-temp-min">12°</span>
            </div>
          </div>`;
  });
  forecastElement.innerHTML = forecastHtml;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("London");
displayForecast();
