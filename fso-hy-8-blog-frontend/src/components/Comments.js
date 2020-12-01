import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { getBlogs } from '../reducers/blogReducer'
import blogService from '../services/blogs'

const Comments = ({ blog }) => {
    const dispatch = useDispatch()
    const [newComment, setNewComment] = useState('')
    const addComment = async () => {
        if (newComment) {
            setNewComment('')
            await blogService.addComment(newComment, blog._id)
            dispatch(getBlogs())
        }
    }
    
    return (
        <>
            <h2>comments</h2>
            <div>
                new comment
                <input
                    type="text"
                    value={newComment}
                    name="New Comment"
                    onChange={({ target }) => setNewComment(target.value)}
                    id="commentInput"
                />
                <button onClick={addComment}>post</button>
            </div>
            {blog.comments ? blog.comments.map((comment, index) => <div key={index}>{comment}</div>) : null}
        </>
    )
}

export default Comments