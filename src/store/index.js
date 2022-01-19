import {createStore, combineReducers, applyMiddleware} from 'redux';
// import { weatherReducer } from './weatherReducer';
import { weatherCardsReducer } from "./weatherCardsReducer";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
    // weatherData: weatherReducer,
    weatherCards: weatherCardsReducer
})

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
