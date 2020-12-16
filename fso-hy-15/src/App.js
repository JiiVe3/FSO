
import React, { useEffect, useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'
import { useApolloClient, useSubscription } from '@apollo/client'
import Recommended from './components/Recommended'
import { ALL_AUTHORS, ALL_BOOKS, AUTHOR_ADDED, BOOK_ADDED } from './queries'

const App = () => {
  const [token, setToken] = useState(null)
  const [page, setPage] = useState('authors')
  const client = useApolloClient()

  useEffect(() => {
    if (localStorage.getItem('token')) setToken(localStorage.getItem('token'))
  }, [])

  const updateBookCacheWith = (addedBook) => {
    const includedIn = (set, object) => 
      set.map(a => a.id).includes(object.id)  

    const dataInStore = client.readQuery({ query: ALL_BOOKS })
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks : dataInStore.allBooks.concat(addedBook) }
      })
    }   
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      console.log(subscriptionData)
      const addedBook = subscriptionData.data.bookAdded
      window.alert(`${addedBook.title} added`)
      updateBookCacheWith(addedBook)
    }
  })

  const updateAuthorCacheWith = (addedAuthor) => {
    const includedIn = (set, object) => 
      set.map(a => a.id).includes(object.id)  

    const dataInStore = client.readQuery({ query: ALL_AUTHORS })
    if (!includedIn(dataInStore.allAuthors, addedAuthor)) {
      client.writeQuery({
        query: ALL_AUTHORS,
        data: { allAuthors : dataInStore.allAuthors.concat(addedAuthor) }
      })
    }   
  }

  useSubscription(AUTHOR_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedAuthor = subscriptionData.data.authorAdded
      window.alert(`${addedAuthor.name} added`)
      updateAuthorCacheWith(addedAuthor)
    }
  })

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