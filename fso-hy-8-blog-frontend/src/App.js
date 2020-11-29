import React, { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Toggleable from './components/Toggleable'
import Login from './components/Login'
import Logout from './components/Logout'
import BlogForm from './components/BlogForm'
import { getBlogs } from './reducers/blogReducer'
import { login, storageLogin, logout } from './reducers/userReducer'
import Bloglist from './components/Bloglist'
import Userlist from './components/Userlist'
import { getUsers } from './reducers/usersReducer'

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
  const user = useSelector(state => state.user)
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
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      dispatch(login({username, password}))
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      ) 
      setUsername('')
      setPassword('')
      handleInfoMessage(`You have logged in`, infoStyle)
    } catch (exception) {
      handleInfoMessage(`Failed to log in`, errorStyle)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedUser')
    dispatch(logout())
    handleInfoMessage(`You have logged out`, infoStyle)
  }

  const handleInfoMessage = (message, style) => {
    setActiveStyle(style)
    setInfoMessage(message)
    setTimeout(() => {
      setInfoMessage(null)
    }, 30000);
  }

  return (
    <div>
      <InfoMessage message={infoMessage} style={activeStyle} />

      {user === null ?
        <Login handleLogin={handleLogin} username={username} setUsername={setUsername} password={password} setPassword={setPassword} />
        : <Logout handleLogout={handleLogout} />}

      {user !== null ?
        <Toggleable buttonLabel='create blog' ref={blogFormRef}>
          <BlogForm handleInfoMessage={handleInfoMessage} infoStyle={infoStyle} />
        </Toggleable>
        : null}

      <Bloglist />
      <Userlist />
    </div>
  )
}

export default App