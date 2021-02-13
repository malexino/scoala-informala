let urlWeather = 'https://api.openweathermap.org/data/2.5/weather?q=';
let urlForecast = 'https://api.openweathermap.org/data/2.5/forecast?appid=';
let urlForecast2 = '&units=metric&q=';
let iconSrc = 'http://openweathermap.org/img/w/';
let iconUrl = "https://openweathermap.org/img/wn/";
let key = '018c9f82aefbfe33c4a781ddb759e604';
let urlMap = 'https://maps.google.com/maps?q=';
let urlMap2 = '&t=&z=13&ie=UTF8&iwloc=&output=embed';
function getWeather (city) {
	city = document.querySelector('#oras').value;
	fetch(urlWeather + city + '&appid=' + key)  
	.then(function(resp) { return resp.json() })
	.then(function(data) { drawWeather(data); })
	.catch(function() {
		
	});
}
function drawWeather (d) {
	let temp = Math.round(parseFloat(d.main.temp)-273.15);
	let tempMin = Math.round(parseFloat(d.main.temp_min)-273.15);
	let tempMax = Math.round(parseFloat(d.main.temp_max)-273.15);
	let icon = iconSrc + d.weather[0].icon + '.png';
	let mapping = urlMap + d.name + urlMap2;
	document.getElementById('location').innerHTML = 'in'+ '&nbsp;' + d.name;
	document.getElementById('description').innerHTML = d.weather[0].description;
	document.getElementById('humidity').innerHTML = d.main.humidity;
	document.getElementById('pressure').innerHTML = d.main.pressure;
	document.getElementById('temp').innerHTML = temp + '&deg;';
	document.getElementById('tempMin').innerHTML = tempMin + '&deg;';
	document.getElementById('tempMax').innerHTML = tempMax + '&deg;';
	document.getElementById('iconImg').src = icon;
	document.getElementById('gmap_canvas').src = mapping;
	document.querySelector('.mapouter').classList.remove("hidden");
}
function getForecast (city) {
	city = document.querySelector('#oras').value;
	fetch(urlForecast + key + urlForecast2 + city)  
	.then(function(resp) { return resp.json() })
	.then(function(data) { drawForecast(data); })
	.catch(function() {
		
	});
}
function drawForecast (data) {
	document.getElementById('locationForecast').innerHTML = 'in'+ '&nbsp;' + data.city.name;
	let lista = data.list;
    let allDays = document.querySelectorAll(".days");
    let indexDays = 0;
    let dataCurenta = lista[0].dt_txt.substr(0, 10);
    allDays[indexDays].innerHTML = `<p class="data">Date : ${dataCurenta}</p>`;
    for (let i = 0; i < lista.length; i++) {
        let icon = iconUrl + lista[i]['weather'][0]['icon'] + ".png";
        let dataLista = lista[i].dt_txt.substr(0, 10);
        if (dataLista === dataCurenta) {
            allDays[indexDays].innerHTML += `
                <div><span><img src="${icon}"></span></div>
                <div>Hour: <span>${lista[i].dt_txt.substr(11, 5)}</span></div>
                <div>Temperature: <span>${lista[i].main.temp + " &#8451;"}</span></div>
                <div class="description">Description: <span>${lista[i].weather[0].description}</span></div>`;
        } else {
            indexDays += 1;
            dataCurenta = dataLista;
            allDays[indexDays].innerHTML = `<p class="data">Date : <span>${dataCurenta}</span></p>`
            i--;
        }
    }
}