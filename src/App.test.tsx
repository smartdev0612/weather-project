import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import App from './App'
import { Server } from 'miragejs'
import { createMockServer } from './createMockServer'
import userEvent from '@testing-library/user-event'

describe('Weather Application', () => {
  let server: Server

  beforeEach(() => (server = createMockServer()))
  afterEach(() => server.shutdown())

  it('renders title', () => {
    render(<App />)
    const title = screen.getByText(/Weather Application/i)
    expect(title).toBeInTheDocument()
  })

  it('shows search results', async () => {
    render(<App />)

    const input = screen.getByTestId('search-input')
    userEvent.type(input, 'Melbourne')

    const button = screen.getByTestId('search-button')
    userEvent.click(button)

    await waitFor(() =>
      expect(screen.getAllByText(/Melbourne/i).length).toEqual(5)
    )
  })
})
