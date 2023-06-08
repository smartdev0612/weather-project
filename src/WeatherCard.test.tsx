import { WeatherCard } from './WeatherCard'
import { render, screen, waitFor } from '@testing-library/react'
import { Server } from 'miragejs'
import { createMockServer } from './createMockServer'

describe('WeatherCard', () => {
  let server: Server

  beforeEach(() => (server = createMockServer()))
  afterEach(() => server.shutdown())

  it('renders city name', () => {
    const city = {
      name: 'Melbourne',
      country: 'Australia',
      state: 'Victoria',
      lat: 0,
      lon: 0,
    }
    render(<WeatherCard city={city} />)
    expect(screen.getByText(city.name)).toBeInTheDocument()
  })

  it('renders placeholder when temperature is not available', () => {
    const city = {
      name: 'Melbourne',
      country: 'Australia',
      state: 'Victoria',
      lat: 0,
      lon: 0,
    }

    render(<WeatherCard city={city} />)
    expect(screen.getByText('-/-')).toBeInTheDocument()
  })

  it('renders temperature', async () => {
    const city = {
      name: 'Melbourne',
      country: 'Australia',
      state: 'Victoria',
      lat: 0,
      lon: 0,
    }
    render(<WeatherCard city={city} />)
    await screen.findByText(24.26)
  })

  it('renders weather information', async () => {
    const city = {
      name: 'Melbourne',
      country: 'Australia',
      state: 'Victoria',
      lat: 0,
      lon: 0,
    }
    render(<WeatherCard city={city} />)
    await screen.findByText('Clear')
  })
})
