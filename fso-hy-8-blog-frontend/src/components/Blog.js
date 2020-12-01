import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getBlogs } from '../reducers/blogReducer'
import blogService from '../services/blogs'
import Comments from './Comments'

const Blog = () => {
    const dispatch = useDispatch()
    const { id } = useParams()
    const [ blogs, loggedUser ] = useSelector(state => [ state.blogs, state.loggedUser ])
    const blog = blogs.find(blog => blog._id === id)

    const handleLike = async (event) => {
        event.preventDefault()
        await blogService.like(blog)
        dispatch(getBlogs())
    }
    
    const handleRemove = async (event) => {
        event.preventDefault()
        if (window.confirm(`Do you want to remove the blog: ${blog.title}`)) {
            await blogService.remove(blog._id, loggedUser)
            dispatch(getBlogs())
        }
    }

    if (blog) {
        return (
            <div>
                <h2>{blog.title} by {blog.author}</h2>
                <div>{blog.url}</div>
                <div>likes <span className='likes'>{blog.likes}</span> <button onClick={handleLike} className='likeButton'>like</button></div>
                <div>{blog.user.name}</div>
                {loggedUser ? loggedUser.username === blog.user.username ? <button onClick={handleRemove} className='removeButton'>remove</button> : null : null}
                <Comments blog={blog} />
            </div>
        )
    } else {
        return null
    }
}

export default Blog