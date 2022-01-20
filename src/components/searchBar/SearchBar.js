import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button } from 'antd';
import './SearchBar.css';
import { fetchWeather } from "../../actions/weather";

const SearchBar = () => {
    const dispatch = useDispatch();
    const [inputValue, setInputValue] = useState('');

    return (
        <div className="header__search-bar">
            <input
                className="header__search-bar-input"
                onChange={(event) => setInputValue(event.target.value)}
                value={inputValue}
            />
            <Button
                className="header__search-bar-button"
                type="primary" size="large"
                onClick={() => dispatch(fetchWeather(inputValue))}
            >
                Add
            </Button>
        </div>

    );
};

export default SearchBar;
