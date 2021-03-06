import React from 'react';
import Card from '../card/Card';
import './WeatherCardsTable.css';
import { useSelector } from 'react-redux';
import {
    CSSTransition,
    TransitionGroup,
} from 'react-transition-group';

const WeatherCardsTable = () => {
    const weatherCardsAtStore = useSelector(state => state.weatherCards || []);

    return (
        <div className="weather-cards-container">
            {
                weatherCardsAtStore.length > 0
                &&
                <TransitionGroup component={null}>
                    {weatherCardsAtStore.map((card) => {

                        return (
                            <CSSTransition
                                in={true}
                                key={card.id}
                                timeout={ 700 }
                                classNames="weather-card"
                            >
                                <div className="card-wrapper">
                                    <Card card={card} />
                                </div>
                            </CSSTransition>)
                    }) }
                </TransitionGroup>
            }
        </div>
    );
};

export default WeatherCardsTable;
