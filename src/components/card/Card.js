import React from 'react';
import './Card.css';

const Card = (weatherCard) => {
    return (
        <div className="card">
            <div className="card-header">
                <div className="card-header__location-container">
                    <span className="card-header__location">{weatherCard.card.cityName}, {weatherCard.card.cityLettersCode}</span>
                    <div className="card-header__data">
                        <p>{weatherCard.card.date}</p>
                    </div>
                </div>
                <div className="card-header__weather-description-container">
                    <img className="card-header__weather-icon" src={weatherCard.card.weatherIcon} alt="weather icon"/>
                    <span className="card-header__weather-description">{weatherCard.card.weatherDescription}</span>
                </div>
                <div className="card-header__remove-btn-wrapper">
                    <span className="card-header__remove-btn">x</span>
                </div>
            </div>
            <div className="graph">
                <p>graph</p>
            </div>
            <div className="card-footer">
                <div className="card-footer__temp-container">
                    <div className="card-footer__temp-container-real">
                        <span className="card-footer__temp">
                            {weatherCard.card.tempInFahrenheit}
                        </span>
                        <span className="card-footer__celsius-btn">°C</span>
                        <span className="card-footer__temp-divider">|</span>
                        <span className="card-footer__fahrenheit-btn">°F</span>
                    </div>
                    <div className="card-footer__temp-container-feelings">
                        <span className="card-footer__temp-feels-like">
                            Feels like: {weatherCard.card.weatherFeelsLike}
                        </span>
                    </div>
                </div>
                <div className="card-footer__other-info-container">
                    <p className="card-footer__other-info">
                        Wind:
                        <span className="card-footer__wind">
                            {weatherCard.card.windSpeed}
                        </span>
                    </p>
                    <p className="card-footer__other-info">
                        Humidity:
                        <span className="card-footer__humidity">
                            {weatherCard.card.humidity}%
                        </span>
                    </p>
                    <p className="card-footer__other-info">
                        Pressure:
                        <span className="card-footer__pressure">
                            {weatherCard.card.pressure}Pa
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Card;
