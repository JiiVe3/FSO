import React from 'react'
import { connect } from 'react-redux'
import { create } from '../reducers/anecdoteReducer'
import { notify } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
    const addAnecdote = async (event) => {
        event.preventDefault()
        props.create(event.target.anecdote.value)
        props.notify(`you created anecdote: ${event.target.anecdote.value}`)
        event.target.anecdote.value = ''
    }

    return (
        <form onSubmit={addAnecdote}>
            <h3>Create Anecdote</h3>
            <div><input name='anecdote' /></div>
            <button type='submit'>create</button>
        </form>
    )
}

export default connect(null, { create, notify })(AnecdoteForm)