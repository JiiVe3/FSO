import React, { useState, useRef } from 'react'
import blogService from '../services/blogs'

const BlogForm = ({user, updateBlogs, handleInfoMessage, infoStyle}) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const blogFormRef = useRef()

  const handleCreateBlog = async (event) => {
    event.preventDefault()
    try {
      await blogService.post({ title, author, url }, user)
      setTitle('')
      setAuthor('')
      setUrl('')
      updateBlogs()
      handleInfoMessage(`New Blog has been created`, infoStyle)
      blogFormRef.current.toggleVisibility()
    } catch (exception) {
      console.log(exception)
    }
  }

  return (
    <div>
      <h2>Create New Blog</h2>
      <form onSubmit={handleCreateBlog}>
        <div>
                title
          <input
            type="text"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
                author
          <input
            type="text"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
                url
          <input
            type="text"
            value={url}
            name="Url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm