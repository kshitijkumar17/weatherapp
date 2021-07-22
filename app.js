//test api = 96f6ba150dbfde1782395bffef95d6a2
//my api = 72cfa2bbd2fc81a3d59a12588251c8e8

const iconElement = document.querySelector('.weather-icon');
const tempElement = document.querySelector('.temperature-value p');
const descElement = document.querySelector('.temperature-description');
const locationElement = document.querySelector('.location p');
const notificationElement = document.querySelector('.notification');

const weatherIcon = document.getElementById("weatherIcon");
const tempValue = document.getElementById("tempValue");
const tempDesc = document.getElementById("tempDesc");
const tempLocation = document.getElementById("tempLocation");

const weather = {};
weather.temperature = {
    unit: 'celsius'
};

const KELVIN = 273;
const key = '72cfa2bbd2fc81a3d59a12588251c8e8';

//Display weather
function displayWeather(){
    iconElement.innerHTML = `<img src="icons/${weather.iconId}.png"/>`;
    tempElement.innerHTML = `${weather.temperature.value}° <span>C</span>`;
    descElement.innerHTML = weather.description;
    locationElement.innerHTML = `${weather.city}, ${weather.country}`;
}

// ----------- SEARCH ---------------
var button = document.querySelector('.search-icon');

button.addEventListener('click', function(){
    var inputValue = document.querySelector('.search-bar');
    let api = `https://api.openweathermap.org/data/2.5/weather?q=`+inputValue.value+`&appid=${key}`;
    console.log(api);
    console.log(inputValue);
    weatherIcon.style.display = "block";
    tempValue.style.display = "block";
    tempDesc.style.display = "block";
    tempLocation.style.display = "block";

    fetch(api)
    .then(function(response){
    let data = response.json();
    return data;
    })
    .then(function(data){
        weather.temperature.value = Math.floor(data.main.temp - KELVIN);
        weather.description = data.weather[0].description;
        weather.iconId = data.weather[0].icon;
        weather.city = data.name;
        weather.country = data.sys.country;
    })
    .then(function(){
        displayWeather();
    });
});