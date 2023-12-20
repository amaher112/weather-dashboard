var APIKey = "6c8259ad3f096de657ba0edf2d1ec551";
var city = document.getElementById("#city");
var lat = 39.1856597;
var lon = -78.1633341;
var geoCode =
  "https://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=1&appid=" + APIKey;
var requestUrl =
  "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + APIKey + "&units=imperial";

function getWeather() {
  // Store city input in local storage

 
}

  // Function to get coordinates
  fetch(geoCode)
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    lat = data[0].lat;
    lon = data[0].lon;
    console.log(lat);
    console.log(lon);
  });
  
  // Function to get weather info
  fetch(requestUrl)
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
  });

var submitBtn = document.getElementById("#submit");
submitBtn.addEventListener('click', getWeather)

// Icon
// console.log(`https://openweathermap.org/img/wn/${data.weather[0].icon}.png`);
