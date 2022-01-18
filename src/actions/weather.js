export const getWeather = (city) => {
    const WAETHER_API_KEY = '5c0e50347ce7db91c41880823ed60683';

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${WAETHER_API_KEY}`)
        .then(response => response.json())
        .then(data => {
            const weatherData = {
                cityName: data.name,
                cityLettersCode: data.sys.country,
                // dayOfWeek: dow,
                // dayOfMonth: dom,
                // month: m,
                // time: t,
                weatherIcon: data.weather[0].icon,
                weatherDescription: data.weather[0].description,
                tempInFahrenheit: data.main.temp,
                // tempInCelsius: tempInCelcius,
                weatherFeelsLike: data.main.feels_like,
                windSpeed: `${data.wind.speed} m/s`,
                humidity: data.main.humidity,
                pressure: data.main.pressure
            }
            console.log(weatherData);

            return weatherData;
    })
    .catch(error => console.log(error))
}
