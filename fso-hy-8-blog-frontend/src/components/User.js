import React from 'react'

const User = ({ user }) => {
  return (
    <div>
        <h1>{user.name}</h1>
        <h2>added blogs</h2>
        {user.blogs.map(blog => <Link to={`/blogs/${blog._id}`}><ListedBlog key={blog._id} blog={blog} /></Link>)}
    </div>
  )
}

export default User