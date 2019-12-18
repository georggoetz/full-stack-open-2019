import React, {useState, useEffect} from 'react';
import axios from 'axios'

const ApiKey = process.env.REACT_APP_WEATHERSTACK_API_KEY

const Weather = ({city}) => {
  const [weather, setWeather] = useState({
    temperature: '',
    weather_icons: [],
    wind_speed: '',
    wind_dir: ''
  })

  useEffect(() => {
    console.log('effect: get weather')
    axios
      .get(`http://api.weatherstack.com/current?access_key=${ApiKey}&query=${city}`)
      .then(response => {
        console.log('weatherstack.com responding')
        setWeather(response.data.current)
      })
  }, [city])

  return (
    <div>
      <h2>Weather in {city}</h2>
      <div>
        <div>
          <b>temperature:</b> {weather.temperature} °Celsius
        </div>
        <div>
          {weather.weather_icons.map(icon =>
            <img key={icon} src={icon} alt={icon} />
          )}
        </div>
        <div>
          <b>wind:</b> {weather.wind_speed} kph direction {weather.wind_dir}
        </div>
      </div>
    </div>
  )
}

export default Weather
