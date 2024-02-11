function getWeather(response) {
    let cityInput = document.querySelector ("#weather-city");
cityInput.innerHTML = response.data.city;
    let currentTemperature = document.querySelector("#temperature");
    let temperature = response.data.temperature.current;
currentTemperature.innerHTML = Math.round(temperature);
}

function search(city) {
let apiKey = "a3425b1067eb6bfaf0f312bt33bce3o1";
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&unit=metric`;
axios.get(apiUrl).then(getWeather);
}
function searchBarInput(event) {
    event.preventDefault()
let searchInput = document.querySelector("#search-bar-box");
search(searchInput.value);
}

let searchBarElement = document.querySelector("#search-bar");
searchBarElement.addEventListener("submit", searchBarInput);

search("London");

