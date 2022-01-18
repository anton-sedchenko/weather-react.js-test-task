import React from 'react';
import './App.css';
import LangSwitcher from "../langSwitcher/LangSwitcher";
import SearchBar from "../searchBar/SearchBar";
import SearchingHistoryScreen from "../searchingHistoryScreen/SearchingHistoryScreen";

const App = () => {
    return (
        <div className="app-wrapper">
            <header className="app-header">
                <div className="header__lang-switcher-wrapper">
                    <LangSwitcher />
                </div>
                <SearchBar />
            </header>
            <main>
                <SearchingHistoryScreen />
            </main>
        </div>
    );
};

export default App;
