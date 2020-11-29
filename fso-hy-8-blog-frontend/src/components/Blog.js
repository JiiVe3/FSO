import React, { useState } from 'react'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { getBlogs } from '../reducers/blogReducer'

const Blog = ({ blog }) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user)
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
    dispatch(getBlogs())
  }

  const handleRemove = async (event) => {
    event.preventDefault()
    if (window.confirm(`Do you want to remove the blog: ${blog.title}`)) {
      await blogService.remove(blog._id, user)
      dispatch(getBlogs())
    }
  }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const FullInfo = () => (
    <div>
      {blog.url}
      <br/>
      likes <span className='likes'>{blog.likes}</span> <button onClick={handleLike} className='likeButton'>like</button>
      <br/>
      {blog.user.name}
      <br/>
      {user ? user.username === blog.user.username ? <button onClick={handleRemove} className='removeButton'>remove</button> : null : null}
    </div>
  )

  return (
    <div style={blogStyle} className="blog">
      {blog.title} {blog.author} <button onClick={toggleVisibility} className='viewButton'>{visible ? 'hide' : 'view'}</button>
      {visible ? <FullInfo /> : null}
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
}

export default Blog
