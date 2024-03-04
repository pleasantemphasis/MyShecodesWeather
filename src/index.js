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

  console.log(response);

  currentTimeElement.innerHTML = formatDate(date);
  currentIconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="current-temperature-icon" />`;
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

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");
  let days = ["Tue", "Wed", "Thu", "Fri", "Sat"];
  let forecastHtml = "";
  days.forEach(function (day) {
    forecastHtml = 
    forecastHtml +
    `
<div class="row">
<div class="coloumns">
  <div class="forecast-day">${day}</div>
  <img
    src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/broken-clouds-night.png"
    alt=""
    width="38"
  />
  <div class="forecast-temperatures" id="forecast">
    <span class="forecast-temperature-max"> 18° </span>
    <span class="forecast-temperature-min"> -12° </span>
  </div>
</div>
</div>
`;
  });
  forecastElement.innerHTML = forecastHtml;
}


let searchBarElement = document.querySelector("#search-bar");
searchBarElement.addEventListener("submit", searchBarInput);

search("London");
displayForecast();
