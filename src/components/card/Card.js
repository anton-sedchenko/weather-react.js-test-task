import React from 'react';
import './Card.css';

const Card = (weatherCard) => {
    return (
        <div className="card">
            <div className="card-header">
                <div className="card-header__location">
                    <b>{weatherCard.card.cityName}, {weatherCard.card.cityLettersCode}</b>
                    <div className="card-header__data">
                        <p>Fri, 19 February, 10:17</p>
                    </div>
                </div>
                <div className="card-header__weather-description">
                    {weatherCard.card.weatherDescription}
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
                            Feels like: {weatherCard.card.weatherFeelsLike}°C
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
