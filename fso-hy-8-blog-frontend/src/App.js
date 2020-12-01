import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Toggleable from './components/Toggleable'
import Login from './components/Login'
import BlogForm from './components/BlogForm'
import { getBlogs } from './reducers/blogReducer'
import { login, storageLogin } from './reducers/loggedUserReducer'
import Blogs from './components/Blogs'
import Users from './components/Users'
import { getUsers } from './reducers/usersReducer'
import Navigation from './components/Navigation';

const InfoMessage = (props) => {
  if (props.message) {
    return (
      <div style={props.style} id="info">
        {props.message}
      </div>
    )
  } else {
    return null
  }
}

const App = () => {
  const dispatch = useDispatch();
  const loggedUser = useSelector(state => state.loggedUser)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [ infoMessage, setInfoMessage ] = useState(null)
  const [ activeStyle, setActiveStyle ] = useState({})

  const blogFormRef = useRef()

  const infoStyle = {
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  const errorStyle = {
    color: 'red',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  useEffect(() => {
    dispatch(getBlogs())
    dispatch(getUsers())

    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      dispatch(storageLogin(JSON.parse(loggedUserJSON)))
    }
  }, [dispatch])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      dispatch(login({username, password}))
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(loggedUser)
      ) 
      setUsername('')
      setPassword('')
      handleInfoMessage(`You have logged in`, infoStyle)
    } catch (exception) {
      handleInfoMessage(`Failed to log in`, errorStyle)
    }
  }

  const handleInfoMessage = (message, style) => {
    setActiveStyle(style)
    setInfoMessage(message)
    setTimeout(() => {
      setInfoMessage(null)
    }, 30000);
  }

  return (
    <Router>
      <div className='container'>
        <InfoMessage message={infoMessage} style={activeStyle} />
        <Navigation infoStyle={infoStyle} handleInfoMessage={handleInfoMessage} />


        {loggedUser === null ?
          <Login handleLogin={handleLogin} username={username} setUsername={setUsername} password={password} setPassword={setPassword} />
        :
          <Toggleable buttonLabel='create blog' ref={blogFormRef}>
            <BlogForm handleInfoMessage={handleInfoMessage} infoStyle={infoStyle} />
          </Toggleable>
        }

        <Switch>
          <Route path='/blogs'>
            <Blogs />
          </Route>
          <Route path='/users'>
            <Users />
          </Route>
          <Route path='/'>

          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App