import React from 'react';
import { Button, Input } from 'antd';
import './SearchBar.css';

const SearchBar = () => {
    return (
        <div className="header__search-bar">
            <Input className="header__search-bar-input" size="large" />
            <Button className="header__search-bar-button" type="primary" size="large">
                Add
            </Button>
        </div>
    );
};

export default SearchBar;
