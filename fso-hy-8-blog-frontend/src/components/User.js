import React from 'react'

const User = ({ user }) => {
  return (
    <div>
        <h1>{user.name}</h1>
        <h2>added blogs</h2>
        {user.blogs.map(blog => <ListedBlog key={blog._id} blog={blog} />)}
    </div>
  )
}

export default User