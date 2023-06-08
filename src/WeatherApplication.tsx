import React, { useState, useEffect, ChangeEvent } from 'react'
import './App.css'
import { createMockServer } from './createMockServer'
import { City } from './types'
import Search from './Search'

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

      <div data-testid="my-weather-list">
        {selected.map((city: City) => (
          <div key={`${city.lat}-${city.lon}`} role="div">
            {city.name}
          </div>
        ))}
      </div>
    </div>
  )
}

export default WeatherApplication
