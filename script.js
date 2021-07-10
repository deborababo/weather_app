// Get elements that we need to change
// Need to be organized by order of display
let searchWeather=document.querySelector(".weather_search");
let btnSubmit=document.querySelector(".btn_submit");
// left content box
let city=document.querySelector(".show_city");
let cityIndex=document.querySelector(".country_index");
let day=document.querySelector(".weather_info_date");
let weatherDescription=document.querySelector(".weather_description");
let image=document.querySelector(".weather_info_icon");
let temperature=document.querySelector(".temperature_today>.value");
let highTemp=document.querySelector(".high>.value");
let lowTemp=document.querySelector(".low>.value");
// right content box
let humidity=document.querySelector(".humidity>.value");
let feel=document.querySelector(".feel>.value");
// let chanceRain=document.querySelector(".chanceRain>.value"); não sei colocar...não consigo ter o daily.rain
let wind=document.querySelector(".wind>.value");
// weekly forecast
let forecastBlock = document.querySelector(".weather__forecast");

// API Weather today info
let weatherAPIKey='3287922d2ec933293d71446df73efb63'
let weatherBaseEndPoint = 'https://api.openweathermap.org/data/2.5/weather?units=metric&appid='+weatherAPIKey
// API forescast
let forecastEndPoint='https://api.openweathermap.org/data/2.5/forecast?units=metric&appid='+weatherAPIKey;

// Get weather info
let getWeatherByCityName= async (city) =>{
    let endpoint= weatherBaseEndPoint+'&q='+city;
    let response= await fetch(endpoint)
    let weather= await response.json()
    return weather
}

let getForecastByCityID=async (id)=>{
  let endpoint=forecastEndPoint+'&id='+id
  let result= await fetch(endpoint)
  let forecast= await result.json()
  let forecastList= forecast.list;
  let daily=[];

  forecastList.forEach(day=>{
    let date= new Date(day.dt_txt.replace(' ','T'))
    let hours = date.getHours();
    if(hours=== 12){
      daily.push(day);
    }
  })

console.log(daily)
}

//estas duas podem ter uma so função em x das linhas de codigo 
// Search city by press down enter key
searchWeather.addEventListener('keydown', async (event)=>{
    if(event.keyCode===13){
       let weather= await getWeatherByCityName(searchWeather.value);
       let cityID=weather.id;
       updateCurrentWeather(weather);
       searchWeather.value="";
       getForecastByCityID(cityID);
    }
})
// Search city by clicking the search icon
btnSubmit.addEventListener('click', async (event)=>{
    let weather= await getWeatherByCityName(searchWeather.value);
    let cityID=weather.id;
    updateCurrentWeather(weather);
    searchWeather.value="";
    getForecastByCityID(cityID);
})

let updateCurrentWeather= (data)=>{
  console.log(data)
  // left content box
    city.innerHTML= `<div>${data.name} <sup>${data.sys.country}</sup></div>`
    day.innerHTML=formatDate(new Date(), data.timezone);
    weatherDescription.textContent=data.weather[0].description;
    // icon
    temperature.textContent=Math.round(data.main.temp); //arredondar as casas
    highTemp.textContent=Math.round(data.main.temp_max);
    lowTemp.textContent=Math.round(data.main.temp_min);

    // right box content
    feel.textContent=Math.round(data.main.feels_like); //arredondar as casas
    humidity.textContent=data.main.humidity;
    // chanceRain.textContent=`${Math.round(data.rain[0].pop * 100)}%`; não funciona pq n tenho onde ir buscar....
    let windDirection;
    let deg = data.wind.deg;
    if(deg > 45 && deg <= 135) {
        windDirection = 'East';
    } else if(deg > 135 && deg <= 225) {
        windDirection = 'South';
    } else if(deg > 225 && deg <= 315) {
        windDirection = 'West';
    } else {
        windDirection = 'North';
    }
    wind.textContent = `${windDirection}, ${(data.wind.speed)}`; //verificar unidades

    // falta ajeitar as casa decimais e colocar no wind speed o NW, N, South, etc (tirar desta funçaõ e fazer uma aparte e dps só chamar)
}
// update forecast

let updateForecast=(forecast)=>{
  
}

// Have city current date and time
function formatDate(date, timezone) {
  let localOffsetInMs = date.getTimezoneOffset() * 60 * 1000;
  let targetOffsetInMs = timezone * 1000;
  let targetTimestamp = date.getTime() + localOffsetInMs + targetOffsetInMs;

  let now = new Date(targetTimestamp);

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = days[now.getDay()];
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "October",
    "November",
    "December"
  ];
  let month = months[now.getMonth()];
  let dayIndex = now.getDate();

  let year = now.getFullYear();

  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let currentTime = `${hours}:${minutes}`;
  day.innerHTML = `${day}, ${dayIndex} ${month} ${year}  ${currentTime}`;

  let formattedDate = `${day}, ${dayIndex} ${month} ${year} - Local Time: ${currentTime}`;

  return formattedDate;
}

//Set city by user geolocation
// Default city //

