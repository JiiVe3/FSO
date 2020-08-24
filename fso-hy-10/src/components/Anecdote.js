import React from 'react'
import { connect } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { notify } from '../reducers/notificationReducer'

const Anecdote = (props) => {
    const handleVote = () => {
        props.vote(props.anecdote.id)
        props.notify(`you voted anecdote: ${props.anecdote.content}`)
    }

    return (
        <div>
            <div>
                {props.anecdote.content}
            </div>
            <div>
                has {props.anecdote.votes}
                <button onClick={handleVote}>vote</button>
            </div>
        </div>
    )
}

export default connect(null, { vote, notify })(Anecdote)