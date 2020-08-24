import React from 'react'
import { useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { notify } from '../reducers/notificationReducer'

const Anecdote = ({anecdote}) => {
    const dispatch = useDispatch()

    const handleVote = () => {
        dispatch(vote(anecdote.id))
        dispatch(notify(`you voted anecdote: ${anecdote.content}`))
    }

    return (
        <div>
            <div>
                {anecdote.content}
            </div>
            <div>
                has {anecdote.votes}
                <button onClick={handleVote}>vote</button>
            </div>
        </div>
    )
}

export default Anecdote