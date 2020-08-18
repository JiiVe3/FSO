import React, { useState } from 'react'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'

const Blog = ({ blog, user, updateBlogs }) => {
  const [visible, setVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleLike = async (event) => {
    event.preventDefault()
    await blogService.like(blog)
    updateBlogs()
  }

  const handleRemove = async (event) => {
    event.preventDefault()
    if (window.confirm(`Do you want to remove the blog: ${blog.title}`)) {
      await blogService.remove(blog._id, user)
      updateBlogs()
    }
  }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const FullInfo = () => (
    <div>
      {blog.url}
      <br/>
      likes {blog.likes} <button onClick={handleLike}>like</button>
      <br/>
      {blog.user.name}
      <br/>
      {user ? user.username === blog.user.username ? <button onClick={handleRemove}>remove</button> : null : null}
    </div>
  )

  return (
    <div style={blogStyle} className='blog'>
      {blog.title} {blog.author} <button onClick={toggleVisibility}>{visible ? 'hide' : 'view'}</button>
      {visible ? <FullInfo /> : null}
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object,
  updateBlogs: PropTypes.func.isRequired
}

export default Blog
