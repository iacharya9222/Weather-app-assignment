import classes from './Forecast.module.css';
import React, { useState } from 'react';
import Conditions from '../conditions/Conditions';
const Forecast = () => {
    let [city, setCity] = useState('');
    let [unit, setUnit] = useState('imperial');
    const uriEncodedCity = encodeURIComponent(city);
    let [responseObj, setResponseObj] = useState({});
    let [error, setError] = useState(false);
    let [loading, setLoading] = useState(false);
    function getForecast(e) {
        e.preventDefault();
        if (city.length === 0) {
            return setError(true);
        }
        // Clear state in preparation for new data
        setError(false);
        setResponseObj({});

        setLoading(true);

        let uriEncodedCity = encodeURIComponent(city);
        fetch(`https://api.openweathermap.org/data/2.5/weather?&appid=1c28262a0b22ce064cd4653e918fbc18&units=${unit}&q=${uriEncodedCity}`)

            .then(response => response.json())
            .then(response => {
                if (response.cod !== 200) {
                    throw new Error()
                }
                setResponseObj(response);
                setLoading(false);
            })
            .catch(err => {
                setError(true);
                setLoading(false);
                console.log(err.message);
            });
    }
    return (
        <div>
            <h2>Find Current Weather Conditions</h2>
            <form onSubmit={getForecast}>
                <input
                    type="text"
                    placeholder="Enter City"
                    maxLength="50"
                    value={city}
                    className={classes.textInput}
                    onChange={(e) => setCity(e.target.value)}
                />
                <label className={classes.Radio}>
                    <input
                        type="radio"
                        name="units"
                        checked={unit === "imperial"}
                        value="imperial"
                        onChange={(e) => setUnit(e.target.value)}
                    />
                    Fahrenheit
                </label>
                <label className={classes.Radio}>
                    <input
                        type="radio"
                        name="units"
                        checked={unit === "metric"}
                        value="metric"
                        onChange={(e) => setUnit(e.target.value)}
                    />
                    Celcius
                </label>
                <button className={classes.Button} type="submit">Get Forecast</button>
            </form>
            <Conditions
                responseObj={responseObj}
                error={error} //new
                loading={loading} //new
            />
        </div>
    )
}
export default Forecast;