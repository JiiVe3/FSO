import React from 'react'
import { Table } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'

const User = () => {
  const { id } = useParams()
  const users = useSelector(state => state.users)
  const user = users.find(user => user._id === id)
  if (user) {
    return (
      <div>
          <h1>{user.name}</h1>
          <h2>added blogs</h2>
          <Table striped>
            <tbody>
              {user.blogs.map(blog => <tr key={blog._id}>
                <th><Link to={`/blogs/${blog._id}`}>{blog.title}</Link></th>
                <th>{blog.author}</th>
              </tr>)}
            </tbody>
          </Table>
      </div>
    )
  } else {
    return null
  }
}

export default User