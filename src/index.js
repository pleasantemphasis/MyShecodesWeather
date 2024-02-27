

function getWeather(response) {
  let cityInput = document.querySelector("#weather-city");
  let currentTemperatureElement = document.querySelector("#temperature");
  let currentHumidityElement = document.querySelector("strong.humidity");
  let currentWindElement = document.querySelector("strong.wind");
  let currentConditionsElement = document.querySelector("#condition");
  let currentIconElement = document.querySelector("#currentTemperatureIcon");


  cityInput.innerHTML = response.data.city;

  let temperature = response.data.temperature.current;
  currentTemperatureElement.innerHTML = Math.round(temperature);
  
  let humidity = response.data.temperature.humidity;
  currentHumidityElement.innerHTML = Math.round(humidity);
  
  let wind = response.data.wind.speed;
  currentWindElement.innerHTML = Math.round(wind);
  
  let conditions = response.data.condition.description;
  currentConditionsElement.innerHTML = (conditions);

  currentIconElement.innerHTML =    
  `<img src="${response.data.condition.icon_url}" class="current-temperature-icon"/>` 

  let date = new Date(response.data.time * 1000);
  let currentDateElement = document.querySelector("#time");
  currentDateElement.innerHTML = formatDate(date);
  console.log(response.data);

  
  
}

function formatDate(date) {
let minutes = date.getMinutes();
let hours = date.getHours();
let days = [
"Sunday",
"Monday",
"Tuesday",
"Wedensday",
"Thursday",
"Friday",
"Saturday"];
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

let searchBarElement = document.querySelector("#search-bar");
searchBarElement.addEventListener("submit", searchBarInput);

search("London");
