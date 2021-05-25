// Get elements that we need to change
let searchWeather=document.querySelector(".weather_search")
let city=document.querySelector(".show_city")
let cityIndex=document.querySelector(".country_index")
let day=document.querySelector(".weather_info_date")

let weatherAPIKey='3287922d2ec933293d71446df73efb63'
let weatherBaseEndPoint = 'https://api.openweathermap.org/data/2.5/weather?appid='+weatherAPIKey

let getWeatherByCityName= async (city) =>{
    let endpoint= weatherBaseEndPoint+'&q='+city;
    let response= await fetch(endpoint)
    let weather= await response.json()
    return weather
}

searchWeather.addEventListener('keydown', async (event)=>{
    if(event.keyCode===13){
       let weather= await getWeatherByCityName(searchWeather.value)
       updateCurrentWeather(weather);
    }
})

// esta função não está a colocar o país como superior
let updateCurrentWeather= (data)=>{
    city.textContent= data.name+' | '+data.sys.country
    day.textContent=dayOfWeek();
}

//Set day of the week
let dayOfWeek =()=>{
    return new Date().toLocaleDateString('en-EN', {'weekday':"long", })
}




//Format date and hours
// function formatDate(timestamp) {
// 	// calculate the date

// 	let date = new Date(timestamp);
// 	let hours = date.getHours();
// 	let minutes = date.getMinutes();
// 	let days = [
// 		"Sunday",
// 		"Monday",
// 		"Tuesday",
// 		"Wednesday",
// 		"Thursday",
// 		"Friday",
// 		"Saturday",
// 	];
// 	let day = days[date.getDay()];
// 	return `${day} ${hours}:${minutes}`;
// }