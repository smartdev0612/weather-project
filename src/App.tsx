import React, { useState, useEffect } from 'react'
import logo from './logo.svg'
import './App.css'
import { createServer, Response } from 'miragejs'
import data from './data.json'

createServer({
  routes() {
    this.get('/api/users', () => {
      return new Response(401, {}, { errors: ['You are in the wrong place'] })
    })

    this.get('/api/users/:id', (schema, request) => {
      const id = parseInt(request.params.id)
      return [data.find((data) => data.id === id)]
    })

    this.get('/api/search', (schema, request) => {
      const query = request.queryParams['query']
      if (query === 'red') {
        return [{ id: 1, name: 'red' }]
      } else {
        return [{ id: 1, name: 'black' }]
      }
    })
  },
})

type User = {
  id: number
  name: string
}

function App() {
  let [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    fetch(`/api/users`)
      .then((response) => response.json())
      .then((json) => setUsers(json))
  }, [])

  return (
    <div className="App">
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  )
}

export default App
