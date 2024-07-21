async function fetchWeather() {
    const location = document.getElementById('locationInput').value;
    const apiKey = '3a0f226a98cc4137bb991524242007';
    const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

function displayWeather(data) {
    const weatherDataDiv = document.getElementById('weatherData');
    weatherDataDiv.innerHTML = `
        <p>Location: ${data.location.name}, ${data.location.region}, ${data.location.country}</p>
        <p>Temperature: ${data.current.temp_c}°C</p>
        <p>Condition: ${data.current.condition.text}</p>
        <img src="${data.current.condition.icon}" alt="Weather icon">
    `;
}
function displayWeather(data) {
    const weatherDataDiv = document.getElementById('weatherData');
    weatherDataDiv.innerHTML = `
        <p><strong>Location:</strong> ${data.location.name}, ${data.location.region}, ${data.location.country}</p>
        <p><strong>Temperature:</strong> ${data.current.temp_c}°C</p>
        <p><strong>Condition:</strong> ${data.current.condition.text}</p>
        <p><strong>Wind Speed:</strong> ${data.current.wind_kph} kph</p>
        <p><strong>Humidity:</strong> ${data.current.humidity}%</p>
        <p><strong>Precipitation:</strong> ${data.current.precip_mm} mm</p>
        <p><strong>UV Index:</strong> ${data.current.uv}</p>
        <img src="${data.current.condition.icon}" alt="Weather icon">
    `;
    setWeatherBackground(data.current.condition.text.toLowerCase());
}
async function fetchWeather() {
    const location = document.getElementById('locationInput').value;
    const apiKey = '3a0f226a98cc4137bb991524242007';
    const urlCurrent = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}`;
    const urlForecast = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=3`;

    try {
        const responseCurrent = await fetch(urlCurrent);
        const dataCurrent = await responseCurrent.json();
        displayWeather(dataCurrent);

        const responseForecast = await fetch(urlForecast);
        const dataForecast = await responseForecast.json();
        displayForecast(dataForecast);
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

function displayForecast(data) {
    const forecastDiv = document.createElement('div');
    forecastDiv.classList.add('forecast');
    data.forecast.forecastday.forEach(day => {
        const forecastDay = document.createElement('div');
        forecastDay.classList.add('forecast-day');
        forecastDay.innerHTML = `
            <p><strong>${new Date(day.date).toDateString()}</strong></p>
            <p>${day.day.avgtemp_c}°C</p>
            <img src="${day.day.condition.icon}" alt="Weather icon">
            <p>${day.day.condition.text}</p>
        `;
        forecastDiv.appendChild(forecastDay);
    });
    document.getElementById('weatherData').appendChild(forecastDiv);
}
