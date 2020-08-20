import React, { useState, useEffect, useRef } from 'react'
import Toggleable from './components/Toggleable'
import Blog from './components/Blog'
import Login from './components/Login'
import Logout from './components/Logout'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'

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
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
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

  const updateBlogs = () => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs.sort((a, b) => b.likes - a.likes) )
    )
  }

  useEffect(() => {
    updateBlogs()

    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      setUser(JSON.parse(loggedUserJSON))
      
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      ) 
      setUser(user)
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
    setUser(null)
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
          <BlogForm user={user} updateBlogs={updateBlogs} handleInfoMessage={handleInfoMessage} infoStyle={infoStyle} />
        </Toggleable>
        : null}

      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog._id} blog={blog} user={user} updateBlogs={updateBlogs} />
      )}
    </div>
  )
}

export default App