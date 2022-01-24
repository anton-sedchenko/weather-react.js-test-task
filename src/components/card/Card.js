import React, { useState } from 'react';
import { AreaChart, Area, XAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import './Card.css';
import {
    getAppSettings,
    IMPERIAL_UNIT_SYSTEM,
    METRIC_UNIT_SYSTEM,
    switchTempAppSettings
} from '../../utils/utils';
import { useTranslation } from 'react-i18next';
import { removeWeatherCard } from '../../store/index';
import { useDispatch } from 'react-redux';

const Card = (cardData) => {
    const dispatch = useDispatch();
    const {t} = useTranslation();
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

    const graphData = cardData.card.forecastData.list.map(item => {
        const date = item.dt_txt.slice(5, 10).split('-').reverse().join('.');

        return ({
            name: date,
            temp: Math.round(item.main.temp)
        });
    });

    const deleteCardHandler = () => {
        dispatch(removeWeatherCard(cardData.card));
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
                    <span
                        className="card-header__remove-btn"
                        onClick={deleteCardHandler}
                    >
                        x
                    </span>
                </div>
            </div>
            <div className="graph">
                <div style={{ width: '100%', height: '120px' }}>
                    <ResponsiveContainer>
                        <AreaChart
                            data={graphData}
                            margin={{
                                top: 0,
                                right: 0,
                                left: 0,
                                bottom: 0,
                            }}
                            layout="horizontal"
                        >
                            <defs>
                                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <XAxis dataKey="name" />
                            <Tooltip />
                            <Area type="monotone" dataKey="temp" stroke="none" fillOpacity={1} fill="url(#colorUv)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
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
                            {t('Feels like')}
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
                        {t('Wind')}
                        <span className="card-footer__wind">
                            {cardData.card.windSpeed}
                        </span>
                    </p>
                    <p className="card-footer__other-info">
                        {t('Humidity')}
                        <span className="card-footer__humidity">
                            {cardData.card.humidity}%
                        </span>
                    </p>
                    <p className="card-footer__other-info">
                        {t('Pressure')}
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
