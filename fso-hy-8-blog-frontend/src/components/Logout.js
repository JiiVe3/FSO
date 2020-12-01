import React from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../reducers/loggedUserReducer'

const Logout = ({ infoStyle, handleInfoMessage }) => {
  const dispatch = useDispatch()

  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedUser')
    dispatch(logout())
    handleInfoMessage(`You have logged out`, infoStyle)
  }

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Logout
