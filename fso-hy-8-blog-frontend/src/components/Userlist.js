import React from 'react'
import { useSelector } from 'react-redux'

const Userlist = () => {
  const users = useSelector(state => state.users)
  return (
    <table>
      <tr>
        <th>name</th>
        <th>blogs created</th>
      </tr>
      {users.map(user => <tr>
        <th>{user.name}</th>
        <th>{user.blogs.length}</th>
      </tr>)}
    </table>
  )
}

export default Userlist