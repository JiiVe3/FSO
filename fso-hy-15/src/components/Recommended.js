import { useLazyQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { BOOKS_BY_GENRE, ME } from '../queries'

const Recommended = (props) => {
  const [me, meResult] = useLazyQuery(ME)
  const [booksByGenre, bookResult] = useLazyQuery(BOOKS_BY_GENRE)
  const [genre, setGenre] = useState('')
  const [books, setBooks] = useState([])

  useEffect(() => {
    me()
  }, [props.show])

  useEffect(() => {
    if (meResult.data && meResult.data.me) {
      setGenre(meResult.data.me.favoriteGenre)
    }
  }, [meResult])

  useEffect(() => {
    booksByGenre({variables: {genre}})
  }, [genre])

  useEffect(() => {
    if(bookResult.data) {
      setBooks(bookResult.data.allBooks)
    }
  }, [bookResult])

  if (!props.show) {
    return null
  }

  return (
    <div>
      <h2>books</h2>
      <h3>in genre '{genre}'</h3>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Recommended