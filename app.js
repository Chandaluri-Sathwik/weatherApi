const key="02a4968bd3604d0f9d845504242105";
let input=document.querySelector(".searchInput");
let button=document.querySelector(".search-icon");
let weatherImg=document.querySelector(".weatherImg");
let currentTemp=document.querySelector(".currentTemp");
let feelsLykTemp=document.querySelector(".feelsLykTemp");
let locationdisp=document.querySelector(".location");
let weatherDesc=document.querySelector(".condition");
let forecastEl=document.querySelector(".forecast");

button.addEventListener("click",displayWeather);
input.addEventListener("keydown", function(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        button.click();
    }
});

async function displayWeather(){
    let searchInput=input.value.trim();
    const url=`https://api.weatherapi.com/v1/current.json?key=${key}&q=${searchInput}`;
    const res = await fetch(url);
    const data = await res.json();
    weatherDesc.innerText=data.current.condition.text;
    locationdisp.innerText=data.location.name;
    feelsLykTemp.innerHTML=`${data.current.feelslike_c}&deg;c`
    currentTemp.innerHTML=`${data.current.temp_c}&deg;c`
    weatherImg.src=data.current.condition.icon;
    displayForecast(data.current.last_updated);
}

async function displayForecast(timese){
    let searchInput=input.value.trim();
    const url=`https://api.weatherapi.com/v1/forecast.json?key=${key}&q=${searchInput}`;
    const res = await fetch(url);
    const data = await res.json();
    hourArr=data.forecast.forecastday[0].hour;
    forecastEl.innerHTML="";
    hourArr.forEach((hr)=>{
        if(hr.time>timese){
            hourreq=hr.time.slice(11);
            console.log(hr);
            forecastEl.innerHTML+=`<div class="forecastinner">
            <p>${hourreq}</p>
            <img src="${hr.condition.icon}" alt="weatherImage" class="weather2">
            <p>${hr.temp_c}&deg;c</p>
            </div>
            `
        
        }
    })

}