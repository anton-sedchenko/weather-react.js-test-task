import { createStore } from 'redux';

const defaultState = {
    weatherData: {
        cityName: '',
        cityLettersCode: '',
        dayOfWeek: '',
        dayOfMonth: 0,
        month: 0,
        time: '',
        weatherIcon: '',
        weatherDescription: '',
        tempInFahrenheit: 0,
        tempInCelsius: 0,
        weatherFeelsLike: '',
        windSpeed: '',
        humidity: 0,
        pressure: 0
    }
}

const GET_WEATHER_AT_DEFAULT_CITY = 'GET_WEATHER_AT_DEFAULT_CITY';
const GET_WEATHER_AT_GIVEN_CITY = 'GET_WEATHER_AT_GIVEN_CITY';

const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case GET_WEATHER_AT_DEFAULT_CITY:
            return { ...state, weatherData: action.payload };
        case GET_WEATHER_AT_GIVEN_CITY:
            return { ...state, weatherData: action.payload };
        default:
            return state;
    }
};

export const store = createStore(reducer);
export const setWeatherData = weatherData => ({type: GET_WEATHER_AT_GIVEN_CITY, payload: weatherData});
