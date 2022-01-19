const defaultState = {
    weatherCards: [
        {
            cityName: 'dnipro',
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
            pressure: 0,
            id: new Date()
        }
    ]
};

const ADD_WEATHER_CARD = 'ADD_WEATHER_CARD';
const REMOVE_WEATHER_CARD = 'REMOVE_WEATHER_CARD';

export const weatherCardsReducer = (state = defaultState, action) => {
    switch (action.type) {
        case ADD_WEATHER_CARD:
            const weatherData = action.payload;

            const newCard = {
                ...weatherData, id: Date.now()
            };

            return {...state, weatherCards: [...state.weatherCards, newCard]};
        case REMOVE_WEATHER_CARD:
            // const newWeatherCards = [...state.weatherCards].filter(card => card.id !== action.payload.cardId);
            //
            // return {...state, weatherCards: newWeatherCards};
        default:
            return state;
    }
};

export const addWeatherCard = payload => ({type: ADD_WEATHER_CARD, payload});
export const removeWeatherCard = payload => ({type: ADD_WEATHER_CARD, payload});
