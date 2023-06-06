import React, { useState, useEffect, ChangeEvent } from 'react'
import './App.css'
import { createMockServer } from './createMockServer'

type City = {
  contry: string
  lat: number
  lon: number
  name: string
  state: string
}

if (process.env.NODE_ENV === 'development') {
  createMockServer()
}

function App() {
  const [query, setQuery] = useState<string>('')
  const [searchResults, setSearchResults] = useState<City[]>([])
  const [selected, setSelected] = useState<City[]>([])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
  }

  const handleClick = () => {
    fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5`)
      .then((r) => r.json())
      .then((cities) => {
        setSearchResults(
          cities.map((city: any) => ({
            name: city.name,
            state: city.state,
            country: city.country,
            lat: city.lat,
            lon: city.lon,
          }))
        )
      })
  }

  const selectCity = (city: City) => {
    setSelected([city, ...selected])
  }

  return (
    <div className="App">
      <h1>Weather Application</h1>
      <input type="text" data-testid="search-input" onChange={handleChange} />
      <button data-testid="search-button" onClick={handleClick}>
        Search
      </button>

      <div data-testid="search-results">
        {searchResults.map((city: City) => (
          <div key={`${city.lat}-${city.lon}`} onClick={() => selectCity(city)}>
            {city.name}, {city.lat}, {city.lon}
          </div>
        ))}
      </div>

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

export default App
