import React from 'react';
import './Weather.css';

const Weather = (props) => {
    return (
        <div className="weatherContainer">
            <h2>Weather:</h2>
            {props.city && props.country && <p>Location: {props.city}, {props.country}</p>}
            {props.temperature && props.feels_like && <p>Temperature: {props.temperature} °F (Feels like {props.feels_like} °F)</p>}
            {props.humidity && <p>Humidity: {props.humidity}%</p>}
            {props.description && <p>Condition: {props.description}</p>}
        </div>
    )
}

export default Weather;