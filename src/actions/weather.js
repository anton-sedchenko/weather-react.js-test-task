import { addWeatherCard } from '../store/weatherCardsReducer';
import { formNewCard } from '../utils/utils';

export const fetchWeather = (city) => {
    const WEATHER_API_KEY = '5c0e50347ce7db91c41880823ed60683';

    return function(dispatch) {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${WEATHER_API_KEY}`)
            .then(response => response.json())
            .then(data => dispatch(addWeatherCard(formNewCard(data))))
            .catch(error => alert('city not found'))
    }
}
