import { useQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { ALL_BOOKS } from '../queries'

const Books = (props) => {
  const result = useQuery(ALL_BOOKS)
  const [genre, setGenre] = useState('')
  let genres = []

  useEffect(() => {
    result.refetch()
  }, [genre, props.show])

  if (!props.show) {
    return null
  }

  if (result.loading) {
    return <div>loading</div>
  }

  const books = result.data.allBooks

  if (books) {
    books.forEach(book => {
      book.genres.forEach(genre => {
        if (!genres.includes(genre)) genres.push(genre)
      })
    })
  }

  return (
    <div>
      <h2>books</h2>

      {genre ?
          <h3>in genre '{genre}'</h3>
        :
          null
      }

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
            a.genres.includes(genre) || genre === '' ?
                <tr key={a.title}>
                  <td>{a.title}</td>
                  <td>{a.author.name}</td>
                  <td>{a.published}</td>
                </tr>
              :
                null
          )}
        </tbody>
      </table>
      {genres.length > 1 ?
          <>
            <button onClick={() => setGenre('')}>all genres</button>
            {genres.map(genre => <button onClick={() => setGenre(genre)} key={genre}>{genre}</button>)}
          </>
        :
          null
      }
    </div>
  )
}

export default Books