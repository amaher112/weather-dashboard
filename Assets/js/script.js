var APIKey = "6c8259ad3f096de657ba0edf2d1ec551";
var cityInput = document.getElementById("city");
var cardGroup = document.querySelector('.card-group');
var currentWeather = document.querySelector('.current-weather');


function getSearchHistory() {
  var searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];
  console.log("Search History:", searchHistory);

   // Display the search history on the page
   displaySearchHistory();

}
getSearchHistory();

function displaySearchHistory(searchHistory) {
  var searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];
  var searchHistoryList = document.getElementById("past-city");
  // Clear previous entries
  searchHistoryList.innerHTML = "";


  // Loop through the search history and create list items with event listeners
  for (var i = 0; i < searchHistory.length; i++) {
    var listItem = document.createElement("li");
    listItem.textContent = searchHistory[i];
    // Attach a click event listener to each list item
    listItem.addEventListener("click", function () {
      // Fetch and display weather data for the clicked city
      var cityInput = this.textContent
      getWeather(cityInput);
      console.log(cityInput)
    
    });
    if (searchHistory[i] != "") {
    searchHistoryList.append(listItem);
     } }

}


function getWeather() {
  cardGroup.textContent = '';
  var cityName = cityInput.value;
  

   // Function to get coordinates
   fetch("https://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "&limit=1&appid=" + APIKey)
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
        
        // Creating elements for current weather data
        var city = document.createElement('h2');
        city.textContent = currentWeatherData.name
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

        // Appends current weather data
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
        weatherCardBody.setAttribute('class', 'card-body text-bg-dark bg-gradient rounded-3 p-3 m-2')
        // border border-primary-subtle
        
        
        // Creating elements for forecast data
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

     })
     
   });
   saveCity();
   getSearchHistory();

}

function saveCity() {
  var searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];
  var cityName = cityInput.value;

  if (!searchHistory.includes(cityName)) {
    searchHistory.push(cityName);
    localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
    displaySearchHistory();
}
console.log(cityName)
}


function findFirstForecast(singleWeatherData) {
  var hour = singleWeatherData.dt_txt.split(' ')
  return hour[1] == '12:00:00'
}

  var submitBtn = document.getElementById("submit");
submitBtn.addEventListener('click', getWeather)

