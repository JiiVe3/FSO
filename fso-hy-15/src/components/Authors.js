import { useMutation, useQuery } from '@apollo/client'
import React, { useState } from 'react'
import { ALL_AUTHORS, EDIT_BORN } from '../queries'

const Authors = (props) => {
  const result = useQuery(ALL_AUTHORS)
  const [born, setBorn] = useState('')
  const [name, setName] = useState('')
  const [editBorn] = useMutation(EDIT_BORN,{
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (error) => console.log(error)
  })

  if (!props.show) {
    return null
  }

  if (result.loading) {
    return <div>loading</div>
  }

  const authors = result.data.allAuthors

  const submit = async (event) => {
    event.preventDefault()

    editBorn({variables: {name, setBorn: parseInt(born)}})

    setName('')
    setBorn('')
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>

      <h3>set birthyear</h3>
      <form onSubmit={submit}>
        <select value={name} onChange={({ target }) => setName(target.value)}>
          <option value=''></option>
          {authors.map(a => 
            <option value={a.name} key={a.id}>{a.name}</option>  
          )}
        </select>
        <div>
          born
          <input
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type='submit'>change</button>
      </form>

    </div>
  )
}

export default Authors
