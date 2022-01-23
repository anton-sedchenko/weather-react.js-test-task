import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import LangSwitcher from '../langSwitcher/LangSwitcher';
import SearchBar from '../searchBar/SearchBar';
import WeatherCardsTable from '../weatherCardsTable/WeatherCardsTable';
import useGeolocation from '../../hooks/useGeolocation';
import { getAppSettings, METRIC_UNIT_SYSTEM, saveDefaultTempUnitToLocalStorage } from '../../utils/utils';
import { useDispatch } from 'react-redux';
import { findUserCity, getWeatherAtUsersLocation } from '../../actions/addWeatherCard';

const App = () => {
    const dispatch = useDispatch();

    if (!getAppSettings()) {
        saveDefaultTempUnitToLocalStorage(METRIC_UNIT_SYSTEM);
    }
    const location = useGeolocation();

    if (location.isLoaded) {
        // find user city when geolocation has been allowed. Saving city name to local storage app settings
        findUserCity(location);
        const cityName = getAppSettings().userCityLocation;
        dispatch(getWeatherAtUsersLocation(cityName));
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
