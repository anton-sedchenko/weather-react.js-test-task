const defaultState = {
    weatherCards: []
};

const ADD_WEATHER_CARD = 'ADD_WEATHER_CARD';
const REMOVE_WEATHER_CARD = 'REMOVE_WEATHER_CARD';
const SAVE_USER_COORDS = 'SAVE_USER_COORDS';

export const weatherCardsReducer = (state = defaultState, action) => {
    switch (action.type) {
        case ADD_WEATHER_CARD:
            state.weatherCards.unshift(action.payload);

            return {weatherCards: [...state.weatherCards]};
        case REMOVE_WEATHER_CARD:
            // const newWeatherCards = [...state.weatherCards].filter(card => card.id !== action.payload.cardId);
            //
            // return {...state, weatherCards: newWeatherCards};
        case SAVE_USER_COORDS:
            return {...state, MY_COORDS: action.payload};
        default:
            return state;
    }
};

export const addWeatherCard = payload => ({type: ADD_WEATHER_CARD, payload});
export const removeWeatherCard = payload => ({type: ADD_WEATHER_CARD, payload});
export const saveUserCoords = payload => ({type: SAVE_USER_COORDS, payload});
