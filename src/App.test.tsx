import React from 'react'
import { render, screen, waitFor, within } from '@testing-library/react'
import WeatherApplication from './WeatherApplication'
import { Server } from 'miragejs'
import { createMockServer } from './createMockServer'
import userEvent from '@testing-library/user-event'

describe('Weather Application', () => {
  let server: Server

  beforeEach(() => (server = createMockServer()))
  afterEach(() => server.shutdown())

  it('renders title', () => {
    render(<WeatherApplication />)
    const title = screen.getByText(/Weather Application/i)
    expect(title).toBeInTheDocument()
  })

  it('shows search results', async () => {
    render(<WeatherApplication />)

    const input = screen.getByTestId('search-input')
    userEvent.type(input, 'Melbourne')

    const button = screen.getByTestId('search-button')
    userEvent.click(button)

    await waitFor(() =>
      expect(screen.getAllByText(/Melbourne/i).length).toEqual(5)
    )
  })

  it('shows search result details', async () => {
    render(<WeatherApplication />)

    const input = screen.getByTestId('search-input')
    userEvent.type(input, 'Melbourne')

    const button = screen.getByTestId('search-button')
    userEvent.click(button)

    await waitFor(() =>
      expect(screen.getAllByText(/Melbourne/i).length).toEqual(5)
    )
    expect(screen.getByText(/41.9430186, -93.1030319/i)).toBeInTheDocument()
  })

  it('add search result to my weather list', async () => {
    render(<WeatherApplication />)

    const input = screen.getByTestId('search-input')
    userEvent.type(input, 'Melbourne')

    const button = screen.getByTestId('search-button')
    userEvent.click(button)

    await waitFor(() =>
      expect(screen.getAllByText(/Melbourne/i).length).toEqual(5)
    )

    const selected = screen.getAllByText(/Melbourne/i)[3]
    userEvent.click(selected)

    const resultContainer = screen.getByTestId('my-weather-list')
    expect(within(resultContainer).getByText(/Melbourne/i)).toBeInTheDocument()

    const searchResultsContainer = screen.getByTestId('search-results')
    expect(screen.queryByTestId('search-results')).toBeInTheDocument()
    // expect(
    //   within(searchResultsContainer).queryByText(/Melbourne/i)
    // ).not.toBeInTheDocument()
  })
})
