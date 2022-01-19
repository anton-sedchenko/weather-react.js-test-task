import React, { useEffect } from 'react';
import './App.css';
import LangSwitcher from "../langSwitcher/LangSwitcher";
import SearchBar from "../searchBar/SearchBar";
import WeatherCardsTable from "../weatherCardsTable/WeatherCardsTable";
import { getUserLocation } from "../../actions/userLocation";

const App = () => {
    useEffect(() => {
        getUserLocation();
    });

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
