const defaultState = {
    weatherCards: []
};

const ADD_WEATHER_CARD = 'ADD_WEATHER_CARD';
const REMOVE_WEATHER_CARD = 'REMOVE_WEATHER_CARD';

export const weatherCardsReducer = (state = defaultState, action) => {
    switch (action.type) {
        case ADD_WEATHER_CARD:

            return {...state, weatherCards: [...state.weatherCards, action.payload]};
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
