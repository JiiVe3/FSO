import React from 'react'
import { connect } from 'react-redux'
import Anecdote from './Anecdote'

const AnecdoteList = (props) => {
    return (
        <div>
            {props.anecdotes.map(anecdote =>
                <Anecdote anecdote={anecdote} key={anecdote.id} />
            )}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        anecdotes: state.anecdotes
            .filter(anecdote => anecdote.content.toLowerCase().includes(state.filter.toLowerCase()))
            .sort((a, b) => b.votes - a.votes)
    }
}

export default connect(mapStateToProps)(AnecdoteList)