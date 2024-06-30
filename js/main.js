let nameToday = document.getElementById("nameToday")
let numToday = document.getElementById("numToday")
let munthToday = document.getElementById("munthToday") 
let todayLocation = document.getElementById("todayLocation")
let todayTemp = document.getElementById("todayTemp")
let imgTemp = document.getElementById("imgTemp")
let textTemp = document.getElementById("textTemp")
let humidity = document.getElementById("humidity")
let wind = document.getElementById("wind")
let windDirection = document.getElementById("windDirection")

let nextDay = document.getElementsByClassName("nextDay");
let nextImgTemp = document.getElementsByClassName("nextImgTemp")
let maxDegree = document.getElementsByClassName("maxDegree")
let minDegree = document.getElementsByClassName("minDegree")
let condText = document.getElementsByClassName("condText")


let searchInput = document.getElementById("search")


async function getData(city){
    let weatherReasponse = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=6c8037c12c5146189ea195033242206&q=${city}&days=3`)
    let weatherData = await weatherReasponse.json()
    return weatherData
}
function displayTodayData(data){

    let todayDate = new Date()
    nameToday.innerHTML = todayDate.toLocaleDateString("en-us" , {weekday:"long"})
    numToday.innerHTML = todayDate.getDate()
    munthToday.innerHTML = todayDate.toLocaleDateString("en-us" , {month:"short"})
    todayLocation.innerHTML = data.location.name
    todayTemp.innerHTML = data.current.temp_c + `<sup>o</sup>c`
    imgTemp.setAttribute("src" ,"https:" + data.current.condition.icon)
    textTemp.innerHTML = data.current.condition.text
    humidity.innerHTML = data.current.humidity + "%"
    wind.innerHTML = data.current.wind_kph + "km/h"
    windDirection.innerHTML = data.current.wind_dir
}
function displayNextDayData(data){
    let forecastData = data.forecast.forecastday
    console.log(forecastData);
    for(let i =0 ; i < 2 ; i++){
        let nextDate = new Date(forecastData[i+1].date)
        nextDay[i].innerHTML = nextDate.toLocaleString('en-us',{weekday:'long'});
        maxDegree[i].innerHTML = forecastData[i+1].day.maxtemp_c + `<sup>o</sup>c`
        minDegree[i].innerHTML = forecastData[i+1].day.mintemp_c + `<sup>o</sup>c`
        condText[i].innerHTML = forecastData[i+1].day.condition.text
        nextImgTemp[i].setAttribute("src" , "https:" + forecastData[i+1].day.condition.icon)
    }
}

async function startApp(city="cairo"){
    let weatherData = await getData(city)
    displayTodayData(weatherData)
    displayNextDayData(weatherData)
    
}
startApp()

searchInput.addEventListener("input" , function(){
    startApp(searchInput.value)
})