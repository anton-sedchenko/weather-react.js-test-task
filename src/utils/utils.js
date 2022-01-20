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

export const fahrenheitToCelsius = (fahrenheit) => {
    const FORMULA_CONSTANT_1 = 32;
    const FORMULA_CONSTANT_2 = 5/9;

    return Math.round((fahrenheit - FORMULA_CONSTANT_1) * FORMULA_CONSTANT_2);
}

export const formNewCard = (fetchedData) => {
    return {
        cityName: fetchedData.name,
        cityLettersCode: fetchedData.sys.country,
        date: getDate(),
        weatherIcon: `http://openweathermap.org/img/wn/${fetchedData.weather[0].icon}@2x.png`,
        weatherDescription: fetchedData.weather[0].description,
        tempInFahrenheit: Math.round(fetchedData.main.temp),
        tempInCelsius: fahrenheitToCelsius(fetchedData.main.temp),
        weatherFeelsLike: Math.round(fetchedData.main.feels_like) + '°F',
        windSpeed: `${fetchedData.wind.speed} m/s`,
        humidity: fetchedData.main.humidity,
        pressure: fetchedData.main.pressure,
        cod: fetchedData.cod,
        id: Date.now()
    }
}
