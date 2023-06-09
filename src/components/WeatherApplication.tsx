import React, { useState, useEffect, ChangeEvent } from 'react'
import './App.css'
import { createMockServer } from '../mock/createMockServer'
import { City } from '../types'
import Search from './Search'
import { WeatherCard } from './WeatherCard'

if (process.env.NODE_ENV === 'development') {
  createMockServer()
}

function WeatherApplication() {
  const [selected, setSelected] = useState<City[]>([])

  const selectCity = (city: City) => {
    setSelected([city, ...selected])
  }

  return (
    <div className="App">
      <h1>Weather Application</h1>

      <Search onSelectItem={selectCity} />

      <div data-testid="my-weather-list" className="cities-container">
        {selected.map((city: City) => (
          <WeatherCard key={`${city.lat}-${city.lon}`} city={city} />
        ))}
      </div>
    </div>
  )
}

export default WeatherApplication
