import React from 'react'
import { useSelector } from 'react-redux'
import Anecdote from './Anecdote'

const AnecdoteList = () => {
    const { anecdotes, filter } = useSelector(state => state)
    anecdotes.sort((a, b) => b.votes - a.votes)
    return (
        <div>
            {anecdotes.map(anecdote =>
                anecdote.content.toLowerCase().includes(filter.toLowerCase()) ? <Anecdote anecdote={anecdote} key={anecdote.id} /> : null
            )}
        </div>
    )
}

export default AnecdoteList