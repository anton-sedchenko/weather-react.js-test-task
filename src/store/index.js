import {createStore, applyMiddleware} from 'redux';
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

const defaultState = {
    weatherCards: []
};

const ADD_WEATHER_CARD = 'ADD_WEATHER_CARD';
const REMOVE_WEATHER_CARD = 'REMOVE_WEATHER_CARD';

const weatherCardsReducer = (state = defaultState, action) => {
    switch (action.type) {
        case ADD_WEATHER_CARD:
            state.weatherCards.unshift(action.payload);

            return {weatherCards: [...state.weatherCards]};
        case REMOVE_WEATHER_CARD:
            const newWeatherCards = [...state.weatherCards].filter(card => card.id !== action.payload.id);

            return {...state, weatherCards: newWeatherCards};
        default:
            return state;
    }
};

export const addWeatherCard = payload => ({type: ADD_WEATHER_CARD, payload});
export const removeWeatherCard = payload => ({type: REMOVE_WEATHER_CARD, payload});

export const store = createStore(weatherCardsReducer, composeWithDevTools(applyMiddleware(thunk)));
