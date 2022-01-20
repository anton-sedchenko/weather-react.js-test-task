import React from 'react';
import './App.css';
import LangSwitcher from "../langSwitcher/LangSwitcher";
import SearchBar from "../searchBar/SearchBar";
import WeatherCardsTable from "../weatherCardsTable/WeatherCardsTable";
import useGeolocation from "../../hooks/useGeolocation";
import { addWeatherCard } from "../../store/weatherCardsReducer";
import { formNewCard } from "../../utils/utils";
import { useDispatch } from "react-redux";

const App = () => {
    const dispatch = useDispatch();
    const location = useGeolocation();
    const getWeatherAtUsersLocation = (position) => {
        const WEATHER_API_KEY = '5c0e50347ce7db91c41880823ed60683';

        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${position.lat}&lon=${position.lng}&appid=${WEATHER_API_KEY}`)
            .then(response => response.json())
            .then(data => {
                const userCity = data.name;

                localStorage.setItem('userCityLocation', userCity);
                dispatch(addWeatherCard(formNewCard(data)));
            })
            .catch(error => console.log(error))
    }

    if (location.isLoaded) {
        getWeatherAtUsersLocation(location);
    }

    return (
        <div className="app-wrapper">
            <header className="app-header">
                <div className="header__lang-switcher-wrapper">
                    <LangSwitcher />
                </div>
                <SearchBar />
            </header>
            <main>
                <WeatherCardsTable />
            </main>
        </div>
    );
};

export default App;
