function getWeather(response) {
  console.log(response);
  let cityInput = document.querySelector("#weather-city");
  cityInput.innerHTML = response.data.city;
  let currentTemperature = document.querySelector("#temperature");
  let temperature = response.data.temperature.current;
  currentTemperature.innerHTML = Math.round(temperature);
  let currentHumidity = document.querySelector("strong.humidity");
  let humidity = response.data.temperature.humidity;
  currentHumidity.innerHTML = Math.round(humidity);
  let currentWind = document.querySelector("strong.wind");
  let wind = response.data.wind.speed;
  currentWind.innerHTML = (wind);

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
