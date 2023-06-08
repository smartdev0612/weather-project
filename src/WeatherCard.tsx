import React, { useState, useEffect } from 'react'
import { City } from './types'
import './WeatherCard.css'

class Weather {
  private readonly data: any

  constructor(data: any) {
    this.data = data
  }

  get temperature() {
    return `${this.data.main.temp} D` ?? '-/-'
  }

  get main() {
    return this.data.weather[0].main.toLowerCase()
  }
}

const emptyWeather = new Weather({
  main: { temp: 0 },
  weather: [{ main: '-/-' }],
})

export function WeatherCard({ city }: { city: City }) {
  const [weather, setWeather] = useState<Weather>(emptyWeather)

  useEffect(() => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city.name}`)
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
