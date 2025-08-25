const apiKey = "24711bafc701e6334e1691f418f44026";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric";

async function getWeather(city) {
    let response = await fetch(apiUrl + `&appid=${apiKey}` + `&q=${city}`);
    
    if( response.status == 404) {
        document.querySelector(".error-text").style.display = "block";
        document.querySelector(".data").style.display = "none";
    } 
    else if(response.ok) {
        let data = await response.json();
        console.log(data);
        updateElement(".city-name", data.name);
        updateElement(".temp", Math.round(data.main.temp) + '°C')
        updateElement(".humidity", Math.round(data.main.humidity) + '%')
        updateElement(".wind", Math.round(data.wind.speed) + ' km/h');
        setWeatherIcon(data.weather[0].main);

        document.querySelector(".error-text").style.display = "none";
        document.querySelector(".data").style.display = "block";
    }
}

function updateElement(selector, newValue) {
    let element = document.querySelector(selector);
    element.classList.add("hide");
    element.addEventListener("transitionend", function handler() {
        element.innerHTML = newValue;
        element.classList.remove("hide");
        element.removeEventListener("transitionend", handler);
    });
}

function setWeatherIcon(weatherStatus) {
    let weatherIcon = document.querySelector(".weather-icon");
    weatherIcon.classList.add("hide");
    weatherIcon.addEventListener("transitionend", function handler() {
        if(weatherStatus == 'Clouds') {
            weatherIcon.src = "images/clouds.png";
        } else if (weatherStatus == 'Clear') {
            weatherIcon.src = "images/clear.png";
        } else if(weatherStatus == 'Rain') {
            weatherIcon.src = "images/rain.png";
        } else if(weatherStatus == 'Drizzle') {
            weatherIcon.src = "images/drizzle.png";
        } else if (weatherStatus == 'Mist') {
            weatherIcon.src = "images/mist.png";
        }

        weatherIcon.classList.remove("hide");
        weatherIcon.removeEventListener("transitionend", handler);
    });

}

let searchBox = document.querySelector(".search input");
let searchButton = document.querySelector(".search button");

searchButton.addEventListener('click', () => {
    if(searchBox.value != null && searchBox.value.trim() != '') {
        getWeather(searchBox.value);
    }
})

