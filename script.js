const apiKey = 'ba0ae10386df505bc4a214cadf0f2b17'; // Ensure there are no spaces around the API key

async function fetchWeatherData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        alert('Weather data not found or unable to fetch data!');
        console.error('Error fetching weather data:', error);
    }
}

function displayWeather(data) {
    const weatherInfo = document.querySelector('.weather-info');
    const icon = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    const details = `
        <h2>${data.name}</h2>
        <p>${data.weather[0].description}</p>
        <p>Temperature: ${data.main.temp} °C</p>
        <p>Humidity: ${data.main.humidity} %</p>
        <p>Wind Speed: ${data.wind.speed} m/s</p>
    `;
    weatherInfo.innerHTML = `
        <div class="weather-item">
            <img src="${icon}" alt="Weather Icon" class="weather-icon">
            <div class="weather-details">${details}</div>
        </div>
    `;
}

function getWeatherByLocation() {
    const location = document.getElementById('location-input').value;
    if (location) {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`;
        fetchWeatherData(url);
    } else {
        alert('Please enter a location');
    }
}

function getWeatherByCurrentLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
            fetchWeatherData(url);
        }, error => {
            alert('Unable to retrieve your location');
            console.error('Error retrieving location:', error);
        });
    } else {
        alert('Geolocation is not supported by this browser.');
    }
}
