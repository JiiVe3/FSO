import anecdoteService from '../services/anecdotes'

const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case 'VOTE':
      return state.map(anecdote => anecdote.id !== action.data.id ? anecdote : action.data)
    case 'CREATE':
      return state.concat(action.data)
    case 'INITIALISE':
      return action.data.anecdotes
    default:
      return state
  }
}

export const vote = (id) => {
  return async dispatch => {
    const anecdote = await anecdoteService.get(id)
    const newAnecdote = await anecdoteService.vote(anecdote)
    dispatch({
      type: 'VOTE',
      data: newAnecdote
    })
  }
}

export const create = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'CREATE',
      data: newAnecdote
    })
  }
}

export const initialise = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INITIALISE',
      data: {anecdotes}
    })
  }
}

export default anecdoteReducer