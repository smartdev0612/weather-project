import React, { useState, ChangeEvent } from 'react'
import './Search.css'
import { City } from '../types'

const Search = ({ onSelectItem }: { onSelectItem: (city: City) => void }) => {
  const [query, setQuery] = useState<string>('')
  const [searchResults, setSearchResults] = useState<City[]>([])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
  }

  const handleClick = () => {
    fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=d0cc2b3519fce7a70c37f9a4c7e09542`
    )
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

  const onSelect = (city: City) => {
    onSelectItem(city)
    setSearchResults([])
  }

  return (
    <div className="search-container">
      <div className="input-container">
        <input
          type="text"
          data-testid="search-input"
          onChange={handleChange}
          placeholder="Enter city name (e.g. Melbourne, New York)"
        />
        <button data-testid="search-button" onClick={handleClick}>
          Search
        </button>
      </div>
      {searchResults.length > 0 && (
        <div data-testid="search-results" className="search-results">
          {searchResults.map((city: City) => (
            <div
              className="search-result"
              key={`${city.lat}-${city.lon}`}
              onClick={() => onSelect(city)}
            >
              <span className="city-name">{city.name}</span>
              <span className="city-location">
                {city.lat}, {city.lon}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Search
