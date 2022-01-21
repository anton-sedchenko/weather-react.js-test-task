export const METRIC_UNIT_SYSTEM = 'metric';
export const IMPERIAL_UNIT_SYSTEM = 'imperial';

export const getDate = () => {
    const date = new Date();
    const daysOfWeek = {
        0: 'Sun',
        1: 'Mon',
        2: 'Tue',
        3: 'Wed',
        4: 'Thu',
        5: 'Fri',
        6: 'Sat'
    }
    const currentDayOfWeek = date.getDay();
    const dayOfWeek = daysOfWeek[currentDayOfWeek];
    const dayOfMonth = date.getDate();
    const months = {
        0: 'January',
        1: 'February',
        2: 'March',
        3: 'April',
        4: 'May',
        5: 'June',
        6: 'July',
        7: 'August',
        8: 'September',
        9: 'October',
        10: 'November',
        11: 'December'
    }
    const currentMonth = date.getMonth();
    const month = months[currentMonth];
    let hours = date.getHours();
    let minutes = date.getMinutes();

    if (hours < 10) {
        hours = '0' + hours;
    }

    if (minutes < 10) {
        minutes = '0' + minutes;
    }

    return `${dayOfWeek}, ${dayOfMonth} ${month}, ${hours}:${minutes}`;
}

export const saveDefaultTempUnitToLocalStorage = (metricConstant) => {
    const weatherAppSettings = {
        tempUnit: metricConstant,
        userCityLocation: ''
    }

    localStorage.setItem('weatherAppSettings', JSON.stringify(weatherAppSettings));
    console.log(JSON.parse(localStorage.getItem('weatherAppSettings')))
}

export const getAppSettings = () => JSON.parse(localStorage.getItem('weatherAppSettings'));

export const switchTempAppSettings = (metricConstant) => {
    localStorage.setItem('weatherAppSettings', JSON.stringify({
        ...getAppSettings(),
        tempUnit: metricConstant
    }));
}

const fahrenheitToCelsius = (fahrenheit) => {
    const FORMULA_CONSTANT_1 = 32;
    const FORMULA_CONSTANT_2 = 5/9;

    return Math.round((fahrenheit - FORMULA_CONSTANT_1) * FORMULA_CONSTANT_2);
}

const celsiusToFahrenheit = (celsius) => {
    const FORMULA_CONSTANT_1 = 32;
    const FORMULA_CONSTANT_2 = 5/9;

    return Math.round((celsius * FORMULA_CONSTANT_2) + FORMULA_CONSTANT_1);
}

const defineTemp = (fetchedData) => {
    switch (fetchedData.tempUnit) {
        case METRIC_UNIT_SYSTEM:
            return ({
                ...fetchedData,
                tempInCelsius: Math.round(fetchedData.main.temp),
                tempInFahrenheit: Math.round(celsiusToFahrenheit(fetchedData.main.temp)),
                weatherFeelsLikeInCelsius: Math.round(fetchedData.main.feels_like) + '°C',
                weatherFeelsLikeInFahrenheit: Math.round(celsiusToFahrenheit(fetchedData.main.feels_like)) + '°F'
            });
        case IMPERIAL_UNIT_SYSTEM:
            return ({
                ...fetchedData,
                tempInCelsius: Math.round(fahrenheitToCelsius(fetchedData.main.temp)),
                tempInFahrenheit: Math.round(fetchedData.main.temp),
                weatherFeelsLikeInCelsius: Math.round(fahrenheitToCelsius(fetchedData.main.feels_like)) + '°C',
                weatherFeelsLikeInFahrenheit: Math.round(fetchedData.main.feels_like) + '°F'
            });
        default:
            return fetchedData;
    }
}

export const formNewCard = (fetchedData) => {
    const cardData = defineTemp(fetchedData);

    return {
        cityName: cardData.name,
        cityLettersCode: cardData.sys.country,
        date: getDate(),
        weatherIcon: `http://openweathermap.org/img/wn/${cardData.weather[0].icon}@2x.png`,
        weatherDescription: cardData.weather[0].description,
        mainTemp: cardData.main.temp,
        tempInFahrenheit: cardData.tempInFahrenheit,
        tempInCelsius: cardData.tempInCelsius,
        // weatherFeelsLike: Math.round(cardData.main.feels_like) + '°F',
        weatherFeelsLikeInCelsius: cardData.weatherFeelsLikeInCelsius,
        weatherFeelsLikeInFahrenheit: cardData.weatherFeelsLikeInFahrenheit,
        windSpeed: `${cardData.wind.speed} m/s`,
        humidity: cardData.main.humidity,
        pressure: cardData.main.pressure,
        cod: cardData.cod,
        id: Date.now()
    }
}
