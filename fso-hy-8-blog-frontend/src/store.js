import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import blogReducer from './reducers/blogReducer'
import loggedUserReducer from './reducers/loggedUserReducer'
import usersReducer from './reducers/usersReducer'

const reducer = combineReducers({blogs: blogReducer, loggedUser: loggedUserReducer, users: usersReducer})
const store = createStore(reducer, applyMiddleware(thunk))

export default store