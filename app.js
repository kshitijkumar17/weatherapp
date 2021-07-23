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

// ----------- SEARCH ---------------
var button = document.querySelector('.search-icon');
var inputValue = document.querySelector('.search-bar');

inputValue.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
      button.click();
      document.activeElement.blur();
    }
});

button.addEventListener('click', function(){
    let api = `https://api.openweathermap.org/data/2.5/weather?q=`+inputValue.value+`&appid=${key}`;
    console.log(api);
    console.log(inputValue);

    fetch(api)
    .then(function(response){
    let data = response.json();
    return data;
    })
    .then(function(data){
        console.log(data.cod);
        if(data.cod === '404'){
            notificationElement.innerHTML = `<p>${data.message}`;
            notificationElement.style.display = 'block';
            iconElement.innerHTML = ``;
            tempElement.innerHTML = ``;
            descElement.innerHTML = ``;
            locationElement.innerHTML = ``;
        } else{
        weather.temperature.value = Math.floor(data.main.temp - KELVIN);
        weather.description = data.weather[0].description;
        weather.iconId = data.weather[0].icon;
        weather.city = data.name;
        weather.country = data.sys.country;

        weatherIcon.style.display = "block";
        tempValue.style.display = "block";
        tempDesc.style.display = "block";
        tempLocation.style.display = "block";
        notificationElement.style.display = 'none';

        iconElement.innerHTML = `<img src="icons/${weather.iconId}.png"/>`;
        tempElement.innerHTML = `${weather.temperature.value}° <span>C</span>`;
        descElement.innerHTML = weather.description;
        locationElement.innerHTML = `${weather.city}, ${weather.country}`;
        }
    });
});