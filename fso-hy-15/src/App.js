
import React, { useEffect, useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'
import { useApolloClient } from '@apollo/client'
import Recommended from './components/Recommended'

const App = () => {
  const [token, setToken] = useState(null)
  const [page, setPage] = useState('authors')
  const client = useApolloClient()

  useEffect(() => {
    if (localStorage.getItem('token')) setToken(localStorage.getItem('token'))
  }, [])

  const logout = () => {
    setToken(null)
    localStorage.removeItem('token')
    client.resetStore()
    setPage('authors')
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token ?
          <>
            <button onClick={() => setPage('recommended')}>recommended</button>
            <button onClick={() => setPage('add')}>add book</button>
            <button onClick={logout}>logout</button>
          </>
        :
          <button onClick={() => setPage('login')}>login</button>
        }
      </div>

      <Authors
        show={page === 'authors'}
      />

      <Books
        show={page === 'books'}
      />

      <Recommended
        show={page === 'recommended'}
      />

      <NewBook
        show={page === 'add'}
      />

      <Login
        show={page === 'login'}
        setToken={setToken}
      />

    </div>
  )
}

export default App