export const METRIC_UNIT_SYSTEM = 'metric';
export const IMPERIAL_UNIT_SYSTEM = 'imperial';

export const getDate = () => {
    const date = new Date();
    const lang = getCurrentLanguage();
    const daysOfWeek = {
        En: {
            0: 'Sun',
            1: 'Mon',
            2: 'Tue',
            3: 'Wed',
            4: 'Thu',
            5: 'Fri',
            6: 'Sat'
        },
        Ua: {
            0: 'Вс',
            1: 'Пн',
            2: 'Вт',
            3: 'Ср',
            4: 'Чт',
            5: 'Пт',
            6: 'Сб'
        },
        He: {
            0: 'א',
            1: 'ב',
            2: 'ג',
            3: 'ד',
            4: 'ה',
            5: 'ו',
            6: 'ש'
        }
    }
    const currentDayOfWeek = date.getDay();
    const dayOfWeek = daysOfWeek[lang][currentDayOfWeek];
    const dayOfMonth = date.getDate();
    const months = {
        En: {
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
        },
        Ua: {
            0: 'Січень',
            1: 'Лютий',
            2: 'Березнь',
            3: 'Квітень',
            4: 'Травень',
            5: 'Червень',
            6: 'Липень',
            7: 'Серпень',
            8: 'Вересень',
            9: 'Жовтень',
            10: 'Листопад',
            11: 'Грудень'
        },
        He: {
            0: 'יָנוּאַר',
            1: 'פֶבּרוּאַר',
            2: 'מֶרץ',
            3: 'אַפּרִיל',
            4: 'מַאי',
            5: 'יוּנִי',
            6: 'יוּלִי',
            7: 'אוֹגוּסט',
            8: 'סֶפּטֶמבֶּר',
            9: 'אוֹקטוֹבֶּר',
            10: 'נוֹבֶמבֶּר',
            11: 'דֶצֶמבֶּר'
        }
    }
    const currentMonth = date.getMonth();
    const month = months[lang][currentMonth];
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
}

export const getAppSettings = () => JSON.parse(localStorage.getItem('weatherAppSettings'));

export const getCurrentLanguage = () => {
    const currentLanguageCode = localStorage.getItem('i18nextLng') || 'en';
    const currentLanguage = currentLanguageCode.charAt(0).toUpperCase() + currentLanguageCode.slice(1);

    return currentLanguage;
}

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
        weatherFeelsLikeInCelsius: cardData.weatherFeelsLikeInCelsius,
        weatherFeelsLikeInFahrenheit: cardData.weatherFeelsLikeInFahrenheit,
        windSpeed: `${cardData.wind.speed} m/s`,
        humidity: cardData.main.humidity,
        pressure: cardData.main.pressure,
        id: `${cardData.name}_${new Date().getTime()}`
    }
}
