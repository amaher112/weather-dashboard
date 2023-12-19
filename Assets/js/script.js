var APIKey = "6c8259ad3f096de657ba0edf2d1ec551";
var city = document.getElementById('#city');
var lat;
var lon;
var geoCode =
  "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=3&appid=" + APIKey;
var requestUrl =
  "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" +  APIKey;


function getWeather() {
    // Store city input in local storage
    // Add dayjs
    
    fetch(geoCode) 
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
    })
}

 
  
    var submitBtn = document.getElementById('#submit');
    submitBtn.addEventListener('click', getWeather)