import React from 'react'
import { useSelector } from 'react-redux'
import Blog from './Blog'

const Bloglist = () => {
  const blogs = useSelector(state => state.blogs)

  return (
    <>
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog._id} blog={blog} />
      )}
    </>
  )
}

export default Bloglist