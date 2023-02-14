
//https://api.openweathermap.org/data/2.5/weather?q=tokyo&appid=3d8f98d5c7903b8c1d632c49e81ebaa8

let apikey = "3d8f98d5c7903b8c1d632c49e81ebaa8";
let input = document.getElementById("city");


const successCallback = (position) => {
    console.log(position.coords.latitude);
    console.log(position.coords.longitude);
    fetchWeather(position.coords.latitude, position.coords.longitude, null)
};

const errorCallback = (error) => {
    document.querySelector(".city_name").innerHTML = `Your Location Not available`;
};

navigator.geolocation.getCurrentPosition(successCallback, errorCallback);


function fetchWeather(lat, lon, c) {
    let city = document.getElementById("city").value;
    let req = new XMLHttpRequest();
    console.log(city);
    req.open("GET" , getLink(lat , lon , c));
    req.send();
    document.cookie = "SameSite=None; Secure"; // cookies allowed in third-party : HTTPS only
    req.onload = function () {
        if (this.readyState == 4 && this.status == 200) {

            let JsData = JSON.parse(this.responseText);


            const { name } = JsData;
            const { icon, description, main } = JsData.weather[0];
            const { temp, humidity } = JsData.main;
            const { speed } = JsData.wind;
            const { country } = JsData.sys;
            document.getElementById("city").setAttribute("placeholder", name);
            
            console.log(name, icon, description, temp, humidity, speed, country);

            document.querySelector(".city_name").innerHTML = `Weather in ${name} / ${country}`;

            document.querySelector(".temp").innerHTML = `${temp} &#8451; || ${main} `;

            document.querySelector(".description").innerHTML = description;
            document.querySelector(".speed").innerHTML = `Speed Wind: ${speed} Km/h`;

            document.querySelector(".icon").src = `http://openweathermap.org/img/wn/${icon}@2x.png`;

            document.querySelector(".himadity").innerHTML = `Humidity : ${humidity}%`;

        }
        else {
            document.querySelector(".city_name").innerHTML = `You entered the wrong city name`;
        }
    }
}

input.addEventListener('keyup', function (event) {
    if (event.key == "Enter")
        fetchWeather(0 , 0 , event.target.value);
});



function getLink(lon , lat , city) {
    
    if(city != null || city ==" ")
        return `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apikey}`;
    return `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apikey}`;
}
