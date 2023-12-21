var APIKey = "6c8259ad3f096de657ba0edf2d1ec551";
var city = document.getElementById("city");
var cardGroup = document.querySelector('.card-group');

function getWeather() {
  var cityInput = city.value;
  console.log(cityInput);

   // Function to get coordinates
   fetch("https://api.openweathermap.org/geo/1.0/direct?q=" + cityInput + "&limit=1&appid=" + APIKey)
   .then((response) => response.json())
   .then((data) => {
     var lat = data[0].lat;
     var lon = data[0].lon;
     console.log({lat, lon});
     fetch("https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + APIKey + "&units=imperial")
     .then((response) => response.json())
     .then(weatherData => {
       console.log(weatherData);
       console.log(weatherData.list[0].dt_txt)
       

       var firstIndex = weatherData.list.findIndex(findFirstForecast);
       console.log(firstIndex)
       for (var i= firstIndex; i < weatherData.list.length; i++) {
        console.log(i)
        console.log(weatherData.list.length)
        var weatherDiv = document.createElement('div')
        weatherDiv.setAttribute('class', 'card')
        var weatherCardBody = document.createElement('div');
        weatherCardBody.setAttribute('class', 'card-body bg-info-subtle')
        var weatherDate = document.createElement('h5')
        weatherDate.setAttribute('class', 'card-title')
        var icon = document.createElement('img')
        icon.setAttribute('src', `https://openweathermap.org/img/wn/${weatherData.list[i].weather[0].icon}.png`)
        weatherDate.textContent = weatherData.list[i].dt_txt.split(' ')[0]
        weatherCardBody.append(weatherDate)
        weatherCardBody.append(icon)

        weatherDiv.append(weatherCardBody)
        cardGroup.append(weatherDiv)
        console.log(cardGroup)
        i=i+7
      }
       
      
    //  Add more h5 tags for wind, temp , append on 39
    // First one in array is current weather
    // Rigth col will have two rows
    // left column has search
       // Need to get temp, wind and humidity
     })
     
   });

}

function findFirstForecast(singleWeatherData) {
  console.log('insidestring')
  var hour = singleWeatherData.dt_txt.split(' ')
  return hour[1] == '12:00:00'
  
}

  var submitBtn = document.getElementById("submit");
submitBtn.addEventListener('click', getWeather)



// Icon
// console.log(`https://openweathermap.org/img/wn/${data.weather[0].icon}.png`);
