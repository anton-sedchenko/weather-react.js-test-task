import { addWeatherCard } from '../store/index';
import { formNewCard,
    getAppSettings,
    getCurrentCityLocation,
    getCurrentLanguage,
    WEATHER_API_KEY
} from '../utils/utils';

const getForecast = (cityName, tempUnit) => {
    return fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=${tempUnit}&appid=${WEATHER_API_KEY}`)
        .then(response => response.json())
        .then(forecastData => {

            return forecastData;
        })
        .catch(error => console.log('forecast not found'))
}

const getWeather = (cityName, tempUnit) => {
    const lang = getCurrentLanguage();

    return fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=${tempUnit}&appid=${WEATHER_API_KEY}&lang=${lang}`)
        .then(response => response.json())
        .then(data => {

            return data;
        })
        .catch(error => console.log(error))
}

// find and save user city only when first come and geo allowed
export const findUserCity = (location) => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lng}&appid=${WEATHER_API_KEY}`)
        .then(response => response.json())
        .then(data => {
            const userCity = data.name;

            localStorage.setItem('weatherAppSettings', JSON.stringify({
                ...getAppSettings(),
                userCityLocation: userCity
            }));
        })
        .catch(error => console.log(error));
}

// display city where user located at the moment if geo allowed
export const getWeatherAtUsersLocation = () => {
    const tempUnit = getAppSettings().tempUnit;
    const cityName = getCurrentCityLocation();

    return function(dispatch) {
        Promise.all([getWeather(cityName, tempUnit), getForecast(cityName, tempUnit)]).then(response => {
            const weatherDataResponse = response[0];
            const tempUnit = getAppSettings().tempUnit;
            const forecastData = response[1];
            const newData = {...weatherDataResponse, tempUnit: tempUnit, forecastData: forecastData}

            dispatch(addWeatherCard(formNewCard(newData)));
        }, reason => {
            console.log(reason)
        });
    }
}

export const fetchWeather = (searchedCity) => {
    return function(dispatch) {
        const tempUnit = getAppSettings().tempUnit;

        Promise.all([getWeather(searchedCity, tempUnit), getForecast(searchedCity, tempUnit)]).then(response => {
            const weatherDataResponse = response[0];
            const tempUnit = getAppSettings().tempUnit;
            const selectedCities = JSON.parse(localStorage.getItem('selectedCities')) || [];
            const forecastData = response[1];
            const newData = {...weatherDataResponse, tempUnit: tempUnit, forecastData: forecastData}

            localStorage.setItem('selectedCities', JSON.stringify([...selectedCities, weatherDataResponse.name]));
            dispatch(addWeatherCard(formNewCard(newData)));
        }, reason => {
            console.log(reason)
        });
    }
}
