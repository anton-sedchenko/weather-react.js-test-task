// import { getWeatherData } from '../store/weatherReducer';
import { addWeatherCard } from "../store/weatherCardsReducer";
import { getDate, fahrenheitToCelsius } from "../utils/utils";

export const fetchWeather = (city) => {
    const WEATHER_API_KEY = '5c0e50347ce7db91c41880823ed60683';

    return function(dispatch) {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${WEATHER_API_KEY}`)
            .then(response => response.json())
            .then(data => {

                    const newCard = {
                        cityName: data.name,
                        cityLettersCode: data.sys.country,
                        date: getDate(),
                        weatherIcon: `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
                        weatherDescription: data.weather[0].description,
                        tempInFahrenheit: Math.round(data.main.temp),
                        tempInCelsius: fahrenheitToCelsius(data.main.temp),
                        weatherFeelsLike: Math.round(data.main.feels_like) + '°F',
                        windSpeed: `${data.wind.speed} m/s`,
                        humidity: data.main.humidity,
                        pressure: data.main.pressure,
                        cod: data.cod,
                        id: Date.now()
                    }

                    // dispatch(getWeatherData(data));
                    dispatch(addWeatherCard(newCard));
                }
            )
            .catch(error => alert('city not found'))
    }

}
