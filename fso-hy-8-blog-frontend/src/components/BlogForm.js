import React, { useState, useRef } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { create, getBlogs } from '../reducers/blogReducer'
import { getUsers } from '../reducers/usersReducer'

const BlogForm = ({ handleInfoMessage, infoStyle }) => {
  const dispatch = useDispatch()
  const loggedUser = useSelector(state => state.loggedUser)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const blogFormRef = useRef()

  const handleCreateBlog = async (event) => {
    event.preventDefault()
    try {
      dispatch(create({title, author, url}, loggedUser))
      setTitle('')
      setAuthor('')
      setUrl('')
      dispatch(getBlogs())
      dispatch(getUsers())
      handleInfoMessage(`New Blog has been created`, infoStyle)
      blogFormRef.current.toggleVisibility()
    } catch (exception) {
      console.log(exception)
    }
  }

  return (
    <div>
      <h2>Create New Blog</h2>
      <Form onSubmit={handleCreateBlog}>
        <Form.Group>
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
            id="titleInput"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Author</Form.Label>
          <Form.Control
            type="text"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
            id="authorInput"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>URL</Form.Label>
          <Form.Control
            type="text"
            value={url}
            name="Url"
            onChange={({ target }) => setUrl(target.value)}
            id="urlInput"
          />
        </Form.Group>
        <Form.Group>
          <Button type="submit" id="submitButton">create</Button>
        </Form.Group>
      </Form>
    </div>
  )
}

export default BlogForm