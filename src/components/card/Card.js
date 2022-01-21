import React, { useState } from 'react';
import './Card.css';
import { getAppSettings, IMPERIAL_UNIT_SYSTEM, METRIC_UNIT_SYSTEM, switchTempAppSettings } from "../../utils/utils";

const Card = (cardData) => {
    const tempUnitInAppSettings = getAppSettings().tempUnit;
    const [tempUnit, setTempUnit] = useState(tempUnitInAppSettings);
    const currentCityTemp = {
        celsius: cardData.card.tempInCelsius,
        fahrenheit: cardData.card.tempInFahrenheit,
        feelsLikeInCelsius: cardData.card.weatherFeelsLikeInCelsius,
        feelsLikeInFahrenheit: cardData.card.weatherFeelsLikeInFahrenheit,
    }
    const activeTempBtnStyle ={};
    if (tempUnit === METRIC_UNIT_SYSTEM) {
        activeTempBtnStyle.isCelsiusBtnActive = {color: 'black'};
        activeTempBtnStyle.isFahrenheitBtnActive = {color: ''};
    } else {
        activeTempBtnStyle.isCelsiusBtnActive = {color: ''};
        activeTempBtnStyle.isFahrenheitBtnActive = {color: 'black'};
    }

    return (
        <div className="card">
            <div className="card-header">
                <div className="card-header__location-container">
                    <span className="card-header__location">{cardData.card.cityName}, {cardData.card.cityLettersCode}</span>
                    <div className="card-header__data">
                        <p>{cardData.card.date}</p>
                    </div>
                </div>
                <div className="card-header__weather-description-container">
                    <img className="card-header__weather-icon" src={cardData.card.weatherIcon} alt="weather icon"/>
                    <span className="card-header__weather-description">{cardData.card.weatherDescription}</span>
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
                            {
                                tempUnit === METRIC_UNIT_SYSTEM
                                ? currentCityTemp.celsius
                                : currentCityTemp.fahrenheit
                            }
                        </span>
                        <span
                            className="card-footer__celsius-btn"
                            style={activeTempBtnStyle.isCelsiusBtnActive}
                            onClick={() => {
                                setTempUnit(METRIC_UNIT_SYSTEM);
                                switchTempAppSettings(METRIC_UNIT_SYSTEM);
                            }}
                        >
                            °C
                        </span>
                        <span className="card-footer__temp-divider">|</span>
                        <span
                            className="card-footer__fahrenheit-btn"
                            style={activeTempBtnStyle.isFahrenheitBtnActive}
                            onClick={() => {
                                setTempUnit(IMPERIAL_UNIT_SYSTEM);
                                switchTempAppSettings(IMPERIAL_UNIT_SYSTEM);
                            }}
                        >
                            °F
                        </span>
                    </div>
                    <div className="card-footer__temp-container-feelings">
                        <span className="card-footer__temp-feels-like">
                            Feels like:
                            {
                                tempUnit === METRIC_UNIT_SYSTEM
                                    ? currentCityTemp.feelsLikeInCelsius
                                    : currentCityTemp.feelsLikeInFahrenheit
                            }
                        </span>
                    </div>
                </div>
                <div className="card-footer__other-info-container">
                    <p className="card-footer__other-info">
                        Wind:
                        <span className="card-footer__wind">
                            {cardData.card.windSpeed}
                        </span>
                    </p>
                    <p className="card-footer__other-info">
                        Humidity:
                        <span className="card-footer__humidity">
                            {cardData.card.humidity}%
                        </span>
                    </p>
                    <p className="card-footer__other-info">
                        Pressure:
                        <span className="card-footer__pressure">
                            {cardData.card.pressure}Pa
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Card;
