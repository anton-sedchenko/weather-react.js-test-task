import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button } from 'antd';
import './SearchBar.css';
import { fetchWeather } from "../../actions/addWeatherCard";
import { useTranslation } from 'react-i18next';

const SearchBar = () => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const [inputValue, setInputValue] = useState('');
    const [selectedCities, setSelectedCities] = useState(JSON.parse(localStorage.getItem('selectedCities')) || []);
    const onAutocompleteItemClick = (e) => {
        setInputValue(e.target.textContent);
        dispatch(fetchWeather(e.target.textContent));
        setInputValue('');
    }

    return (
        <div className="header__search-container">
            <div className="header__search-bar-wrapper">
                <input
                    type="text"
                    className="header__search-bar"
                    value={inputValue}
                    onChange={(event) => {setInputValue(event.target.value)}}
                />
                <ul className="autocomplete">
                    {
                        inputValue
                        ? selectedCities.map((cityName, i) => {
                            return (
                                <li
                                    className="autocomplete__item"
                                    key={i}
                                    onClick={onAutocompleteItemClick}
                                >
                                    {cityName}
                                </li>
                            )
                        })
                        : null
                    }
                </ul>
            </div>
            <Button
                className="header__search-bar-button"
                type="primary" size="large"
                onClick={() => {
                    setSelectedCities((selectedCities) => {
                        if (selectedCities.some((item) => item === inputValue)) {
                            return selectedCities;
                        }

                        return [...selectedCities, inputValue];
                    });

                    dispatch(fetchWeather(inputValue));
                    setInputValue('');
                }}
            >
                {t('Add')}
            </Button>
        </div>

    );
};

export default SearchBar;
