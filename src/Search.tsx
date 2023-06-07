import React, { useState, ChangeEvent } from 'react'
import { City } from './types'

const Search = ({ onSelectItem }: { onSelectItem: (city: City) => void }) => {
  const [query, setQuery] = useState<string>('')
  const [searchResults, setSearchResults] = useState<City[]>([])

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

  return (
    <div>
      <input type="text" data-testid="search-input" onChange={handleChange} />
      <button data-testid="search-button" onClick={handleClick}>
        Search
      </button>

      <div data-testid="search-results">
        {searchResults.map((city: City) => (
          <div
            key={`${city.lat}-${city.lon}`}
            onClick={() => onSelectItem(city)}
          >
            {city.name}, {city.lat}, {city.lon}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Search
