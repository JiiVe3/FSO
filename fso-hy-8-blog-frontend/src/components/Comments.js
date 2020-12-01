import React, { useState } from 'react'
import { Table } from 'react-bootstrap'
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
                <input
                    type="text"
                    value={newComment}
                    name="New Comment"
                    onChange={({ target }) => setNewComment(target.value)}
                    id="commentInput"
                />
                <button onClick={addComment}>post</button>
            </div>
            <Table striped>
                <tbody>
                    {blog.comments ? blog.comments.map((comment, index) => <tr key={index}><th>{comment}</th></tr>) : null}
                </tbody>
            </Table>
        </>
    )
}

export default Comments