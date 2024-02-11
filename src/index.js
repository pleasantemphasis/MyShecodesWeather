function searchBarInput(event) {
    event.preventDefault()
let searchInput = document.querySelector("#search-bar-box");
let cityInput = document.querySelector ("#weather-city");
cityInput.innerHTML = searchInput.value;
}

let searchBarElement = document.querySelector("#search-bar");
searchBarElement.addEventListener("submit", searchBarInput);

