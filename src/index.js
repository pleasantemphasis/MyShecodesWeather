function getWeather(response) {
  let cityInput = document.querySelector("#weather-city");
  let currentTemperatureElement = document.querySelector("#temperature");
  let currentHumidityElement = document.querySelector("strong.humidity");
  let currentWindElement = document.querySelector("strong.wind");
  let currentConditionsElement = document.querySelector("#condition");
  let currentTimeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  let currentIconElement = document.querySelector("#current-temperature-icon");

  cityInput.innerHTML = response.data.city;

  let temperature = response.data.temperature.current;
  currentTemperatureElement.innerHTML = Math.round(temperature);

  let humidity = response.data.temperature.humidity;
  currentHumidityElement.innerHTML = Math.round(humidity);

  let wind = response.data.wind.speed;
  currentWindElement.innerHTML = Math.round(wind);

  let conditions = response.data.condition.description;
  currentConditionsElement.innerHTML = conditions;

  currentTimeElement.innerHTML = formatDate(date);
  currentIconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="current-temperature-icon" />`;
  getForecast(response.data.city);


  if (date.getHours() < 12) {
    let background = document.querySelector("body");
    background.classList.add("morning-gradient");
  } else if (date.getHours() >= 12 && date.getHours() <18) {
    let background = document.querySelector("body");
    background.classList.add("day-gradient");
  } else if (date.getHours() >= 18) {
    let background = document.querySelector("body");
    background.classList.add("night-gradient");
  }
}


function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day}, ${hours}:${minutes}`;
}

function search(city) {
  let apiKey = "a3425b1067eb6bfaf0f312bt33bce3o1";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&unit=metric`;
  axios.get(apiUrl).then(getWeather);
}

function searchBarInput(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-bar-box");
  search(searchInput.value);
}

function getForecast(city) {
  let apiKey = "a3425b1067eb6bfaf0f312bt33bce3o1";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metrics`;
  axios(apiUrl).then(displayForecast);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 10000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];

  return days[date.getDay()];
}

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  let forecastHtml = "";
  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `
<div class="row">
<div class="coloumns">
  <div class="forecast-day">${formatDay(day.time)}</div>
  <img class="forecast-image"
    src="${day.condition.icon_url}"
    alt="${day.condition.description}" 
  />
  <div class="forecast-temperatures" id="forecast">
    <span class="forecast-temperature-max">${Math.round(
      day.temperature.maximum
    )}° </span>
    <span class="forecast-temperature-min"> ${Math.round(
      day.temperature.minimum
    )}° </span>
  </div>
</div>
</div>
`;
    }
  });
  forecastElement.innerHTML = forecastHtml;
}

let searchBarElement = document.querySelector("#search-bar");
searchBarElement.addEventListener("submit", searchBarInput);

search("London");

displayForecast();
