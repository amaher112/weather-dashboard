var APIKey = "6c8259ad3f096de657ba0edf2d1ec551";
var city = document.getElementById("city");
var cardGroup = document.querySelector('.card-group');

function getWeather() {
  var cityInput = city.value;

   // Function to get coordinates
   fetch("https://api.openweathermap.org/geo/1.0/direct?q=" + cityInput + "&limit=1&appid=" + APIKey)
   .then((response) => response.json())
   .then((data) => {
     var lat = data[0].lat;
     var lon = data[0].lon;

    // Function to get weather information from coordinates
     fetch("https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + APIKey + "&units=imperial")
     .then((response) => response.json())
     .then(weatherData => {
       console.log(weatherData);
    
      //  Finds the first forecast at 12 noon
       var firstIndex = weatherData.list.findIndex(findFirstForecast);

      //  Loops through each 3-hour increment to find the 12 noon of each day
       for (var i= firstIndex; i < weatherData.list.length; i+=8) {
      
        var weatherDiv = document.createElement('div')
        weatherDiv.setAttribute('class', 'card')
        var weatherCardBody = document.createElement('div');
        weatherCardBody.setAttribute('class', 'card-body bg-info-subtle')
        
        // Creating elements for weather data
        var weatherDate = document.createElement('h5')
        weatherDate.setAttribute('class', 'card-title')
        var icon = document.createElement('img')
        icon.setAttribute('src', `https://openweathermap.org/img/wn/${weatherData.list[i].weather[0].icon}.png`)
        weatherDate.textContent = weatherData.list[i].dt_txt.split(' ')[0]
        var temp = document.createElement('h6');
        temp.textContent = "Temp: " + weatherData.list[i].main.temp + " °F"
        var wind = document.createElement('h6');
        wind.textContent = "Wind: " + weatherData.list[i].wind.speed + " MPH"
        var humidity = document.createElement('h6')
        humidity.textContent = "Humidity: " + weatherData.list[i].main.humidity + " %"
   
       
      //  Append weather data
        weatherCardBody.append(weatherDate, icon, temp, wind, humidity)
        weatherDiv.append(weatherCardBody)
        cardGroup.append(weatherDiv)
      
      
      }
       
      

    // First one in array is current weather
    // Rigth col will have two rows
    // left column has search
      
     })
     
   });

}

function findFirstForecast(singleWeatherData) {
  var hour = singleWeatherData.dt_txt.split(' ')
  return hour[1] == '12:00:00'
  
}

  var submitBtn = document.getElementById("submit");
submitBtn.addEventListener('click', getWeather)



// Icon
// console.log(`https://openweathermap.org/img/wn/${data.weather[0].icon}.png`);
