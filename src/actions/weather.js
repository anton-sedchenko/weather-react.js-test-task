// import { getWeatherData } from '../store/weatherReducer';
import {addWeatherCard} from "../store/weatherCardsReducer";

export const fetchWeather = (city) => {
    const WEATHER_API_KEY = '5c0e50347ce7db91c41880823ed60683';

    return function(dispatch) {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${WEATHER_API_KEY}`)
            .then(response => response.json())
            .then(data => {
                    const newCard = {
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
