import React, { useState, useEffect } from 'react'
import { City } from '../types'
import './WeatherCard.css'
import { Weather, emptyWeather } from './Weather'

export function WeatherCard({ city }: { city: City }) {
  const [weather, setWeather] = useState<Weather>(emptyWeather)

  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city.name}&appid=d0cc2b3519fce7a70c37f9a4c7e09542&units=metric`
    )
      .then((r) => r.json())
      .then((data) => setWeather(new Weather(data)))
  }, [city])
  return (
    <div className={`weather-container ${weather.main}`}>
      <h3>{city.name}</h3>
      <div className="details">
        <p className="temperature">{weather.temperature}</p>
        <div className="weather">
          <span className="weather-category">{weather.main}</span>
        </div>
      </div>
    </div>
  )
}
