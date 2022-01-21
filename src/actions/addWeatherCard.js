import { addWeatherCard } from '../store/weatherCardsReducer';
import { formNewCard, getAppSettings } from '../utils/utils';

export const getWeatherAtUsersLocation = (position) => {
    const WEATHER_API_KEY = '5c0e50347ce7db91c41880823ed60683';
    const tempUnit = getAppSettings().tempUnit;

    return function(dispatch) {
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${position.lat}&lon=${position.lng}&units=${tempUnit}&appid=${WEATHER_API_KEY}`)
            .then(response => response.json())
            .then(data => {
                const userCity = data.name;
                const dataWithTempUnit = {...data, tempUnit: tempUnit}

                localStorage.setItem('weatherAppSettings', JSON.stringify({
                    ...getAppSettings(),
                    userCityLocation: userCity
                }));
                dispatch(addWeatherCard(formNewCard(dataWithTempUnit)));
            })
            .catch(error => console.log(error))
    }
}

export const fetchWeather = (city) => {
    const WEATHER_API_KEY = '5c0e50347ce7db91c41880823ed60683';

    return function(dispatch) {
        const tempUnit = getAppSettings().tempUnit;

        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${tempUnit}&appid=${WEATHER_API_KEY}`)
            .then(response => response.json())
            .then(data => {
                const dataWithTempUnit = {...data, tempUnit: tempUnit}
                dispatch(addWeatherCard(formNewCard(dataWithTempUnit)))
            })
            .catch(error => alert('city not found'))
    }
}
