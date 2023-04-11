// get weather data
let zipCode = 76904;
function fetchWeatherData(zipCode){
    $.ajax({
        url:"https://api.openweathermap.org/data/2.5/weather",
        type: "GET",
        data: {
            APPID: openWeather,
            zip: zipCode,
            units: "imperial",
        }
    }).done(function(data){
        console.log(data);
        let html = "";

        const currentDate = new Date(data.dt * 1000).toLocaleDateString();
        html += '<div id="weatherInfoBody" class="container">';
        html += '<p>Todays Weather: ' + currentDate + '</p>';
        // // html += '<div>';
        // html += '<img src="https://openweathermap.org/img/w/' + data.weather[0].icon + '.png">';
        // // html += '</div>';
        html += '<p >Conditions: ' + data.weather[0].description + ' </p>';
        html += '<p>Temp: ' + parseInt(data.main.temp) + '&#8457; </p>';
        html += '<p>High: ' + parseInt(data.main.temp_max) + '&#8457; </p>';
        html += '<p>Low: ' + parseInt(data.main.temp_min) + '&#8457; </p>';
        html += '</div>';
        // html += '<p>Humidity: ' + data.humidity + '% </p>';


        document.getElementById("weatherInfo").innerHTML = html;

    })
}

fetchWeatherData(zipCode);

$.get('events.json').done(function (data){
    console.log(data);
    renderEvents(data);
})
    .catch(function(error){
        console.error(error);
    });

function renderEvent(event, id){
    let eventInfo = "";


    eventInfo += '<div class="col">'
    eventInfo += '<div  id="' + id + '">';
    eventInfo += '<div class="card">';
    eventInfo += '<div class="row g-0">';
    eventInfo += '<div class="col-md-4">';
    eventInfo += '<img src="' + event.image + '" class="img-fluid rounded-start" alt="eventImage"> ';
    eventInfo += '</div>';
    eventInfo += '<div class="col-md-8">';
    eventInfo += '<div class="card-body">'
    eventInfo += '<h2>' + event.title + '</h2>';
    // eventInfo += '<h6> When: ' + event.date + '</h6>';
    eventInfo += '<p> Where: <a href="' + event.location + '" target="_blank"><i class="fa-solid fa-map-location-dot"></i></a></p>';
    eventInfo += '<p>' + event.desc + '</p>';
    eventInfo += '<div id="icons area">';
    eventInfo += '<a href="'+ event.facebook + '" target="_blank">';
    eventInfo += '<i class="fa-brands fa-facebook" style="margin: 1em;"></i>';
    eventInfo += '</a>';
    eventInfo += '<a href="'+ event.instagram + '" target="_blank">';
    eventInfo += '<i class="fa-brands fa-instagram" style="margin: 1em;"></i>';
    eventInfo += '</a>';
    eventInfo += '<a href="mailto:'+ event.email + '" target="_blank">';
    eventInfo += '<i class="fa-solid fa-envelope" style="margin: 1em;"></i>';
    eventInfo += '</a>';
    eventInfo += '<a href="'+ event.website + '" target="_blank">';
    eventInfo += '<i class="fa-solid fa-info" style="margin: 1em;"></i>';
    eventInfo += '</a>';
    eventInfo += '</div>';
    eventInfo += '</div>';
    eventInfo += '</div>';
    eventInfo += '</div>';
    eventInfo += '</div>';

    return eventInfo;
}

function renderEvents(events){
    let eventInfo = '';
    for(let i = events.length -1; i>=0; i--){
        let id = 'event-' + i;
        eventInfo += renderEvent(events[i], id);
    }
    document.getElementById('cardsRow').innerHTML = eventInfo;
}