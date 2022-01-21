import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { weatherCardsReducer } from "./weatherCardsReducer";

const rootReducer = combineReducers({
    weatherCards: weatherCardsReducer
})

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
