import React from 'react';
import './Card.css';

const Card = (weatherCard) => {
    return (
        <div className="card">
            <button>x</button>
            <p>{weatherCard.card.cityName} / Type of weather</p>
            <p>date / time</p>
            -
            <p>graph</p>
            -
            <p>Temp.<button>C</button>|<button>F</button> / Wind/Humidity/Pressure</p>
            <p>Feels like</p>
        </div>
    );
};

export default Card;
