
import React, { useEffect, useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'

const App = () => {
  const [token, setToken] = useState(null)
  const [page, setPage] = useState('authors')

  useEffect(() => {
    if (window.localStorage.getItem('token')) setToken(window.localStorage.getItem('token'))
  }, [])

  const logout = () => {
    setToken(null)
    window.localStorage.removeItem('token')
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
        {token ?
          <button onClick={logout}>logout</button>
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

      <NewBook
        show={page === 'add'}
      />

      <Login
        show={page === 'login'}
      />

    </div>
  )
}

export default App