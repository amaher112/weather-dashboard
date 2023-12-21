var APIKey = "6c8259ad3f096de657ba0edf2d1ec551";
var city = document.getElementById("city");
var cardGroup = document.querySelector('.card-group');
var currentWeather = document.querySelector('.current-weather');
var pastCities = ['']

function getWeather() {
  cardGroup.textContent = '';
  var cityInput = city.value;
  localStorage.setItem('savedCities', cityInput);
  

   // Function to get coordinates
   fetch("https://api.openweathermap.org/geo/1.0/direct?q=" + cityInput + "&limit=1&appid=" + APIKey)
   .then((response) => response.json())
   .then((data) => {
     var lat = data[0].lat;
     var lon = data[0].lon;

    //  Function to get current weather data from coordinates
     fetch("https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=" + APIKey + "&units=imperial")
      .then((response) => response.json())
      .then((currentWeatherData) => { 
        console.log(currentWeatherData)
        currentWeather.textContent = " ";
        var city = document.createElement('h2');
        city.textContent = cityInput;
        var currentDate = document.createElement('h2')
        currentDate.textContent = dayjs().format('MM/DD/YYYY');
        var currentIcon = document.createElement('img')
        currentIcon.setAttribute('src', `https://openweathermap.org/img/wn/${currentWeatherData.weather[0].icon}.png`)
        var currentTemp = document.createElement('h6')
        currentTemp.textContent = "Temp: " + currentWeatherData.main.temp + " °F"
        var currentWind = document.createElement('h6');
        currentWind.textContent = "Wind: " + currentWeatherData.wind.speed + " MPH"
        var currentHumidity = document.createElement('h6')
        currentHumidity.textContent = "Humidity: " + currentWeatherData.main.humidity + " %"
        currentWeather.append(city, currentDate, currentIcon, currentTemp, currentWind, currentHumidity)
  })

    // Function to get weather forecast information from coordinates
     fetch("https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + APIKey + "&units=imperial")
     .then((response) => response.json())
     .then(forecastData => {
       console.log(forecastData);

      //  Finds the first forecast at 12 noon
       var firstIndex = forecastData.list.findIndex(findFirstForecast);

      //  Loops through each 3-hour increment to find the 12 noon of each day
       for (var i= firstIndex; i < forecastData.list.length; i+=8) {
      
        var weatherDiv = document.createElement('div')
        weatherDiv.setAttribute('class', 'card')
        var weatherCardBody = document.createElement('div');
        weatherCardBody.setAttribute('class', 'card-body bg-info-subtle')
        
        // Creating elements for weather data
        var weatherDate = document.createElement('h5')
        weatherDate.setAttribute('class', 'card-title')
        var icon = document.createElement('img')
        icon.setAttribute('src', `https://openweathermap.org/img/wn/${forecastData.list[i].weather[0].icon}.png`)
        weatherDate.textContent = forecastData.list[i].dt_txt.split(' ')[0]
        var temp = document.createElement('h6');
        temp.textContent = "Temp: " + forecastData.list[i].main.temp + " °F"
        var wind = document.createElement('h6');
        wind.textContent = "Wind: " + forecastData.list[i].wind.speed + " MPH"
        var humidity = document.createElement('h6')
        humidity.textContent = "Humidity: " + forecastData.list[i].main.humidity + " %"
   
      //  Append forecast data
        weatherCardBody.append(weatherDate, icon, temp, wind, humidity)
        weatherDiv.append(weatherCardBody)
        cardGroup.append(weatherDiv)
      }
       
    // First one in array is current weather
    // For local storage, key will be the city and value will be an object with all the weather data
    // Rigth col will have two rows
    // left column has search
      
    // Create a key of saved cities 
    // Can loop through array of cities
    // event listener can be 'get weather'

     })
     
   });

}

function findFirstForecast(singleWeatherData) {
  var hour = singleWeatherData.dt_txt.split(' ')
  return hour[1] == '12:00:00'
  
}

  var submitBtn = document.getElementById("submit");
submitBtn.addEventListener('click', getWeather)

