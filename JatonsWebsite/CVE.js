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

        html += '<h6>Todays Weather: ' + currentDate + '</h6>';
        html += '<div>';
        html += '<img src="https://openweathermap.org/img/w/' + data.weather[0].icon + '.png">';
        html += '</div>';
        html += '<p >Conditions: ' + data.weather[0].description + ' </p>';
        html += '<p>Temp: ' + parseInt(data.main.temp) + '&#8457; </p>';
        html += '<p>High: ' + parseInt(data.main.temp_max) + '&#8457; </p>';
        html += '<p>Low: ' + parseInt(data.main.temp_min) + '&#8457; </p>';

        // html += '<p>Humidity: ' + data.humidity + '% </p>';


        document.getElementById("weatherInfo").innerHTML = html;

    })
}

fetchWeatherData(zipCode);

$.get('events.json').done(function (data){
    let eventInfo = "";

    const firstData= data[0];

    eventInfo += '<h4>' + firstData.title + '</h4>';
    eventInfo += '<h6>' + firstData.date + '</h6>';
    eventInfo += '<p>' + firstData.desc + '</p>';


    $("#firstCard").append(eventInfo);
})