const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog.js')
const User = require('../models/user.js')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user')
    response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id).populate('user')
    response.json(blog)
})

blogsRouter.post('/', async (request, response) => {
    const blog = new Blog(request.body)

    if (!blog.title || !blog.url) {
        response.status(400)
    } else {
        if (!request.token) { return response.status(401).json({ error: 'token missing or invalid' }) }
        const decodedToken = jwt.verify(request.token, process.env.SECRET)
        if (!decodedToken.id) { return response.status(401).json({ error: 'token missing or invalid' }) }
        const user = await User.findById(decodedToken.id)

        if (!blog.likes) {blog.likes = 0}
        blog.comments = []
        blog.user = user._id
        const savedBlog = await blog.save()
        user.blogs = user.blogs.concat(savedBlog._id)
        await user.save()
        response.status(201).json(savedBlog)
    }
})

blogsRouter.post('/:id/comments', async (request, response) => {
    const blog = await Blog.findById(request.params.id)
    if (!blog.comments) blog.comments = []
    blog.comments.push(request.body.newComment)
    const newBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {new: true})
    response.json(newBlog)
})

blogsRouter.delete('/:id', async (request,response) => {
    if (!request.token) { return response.status(401).json({ error: 'token missing or invalid' }) }
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) { return response.status(401).json({ error: 'token missing or invalid' }) }
    const user = await User.findById(decodedToken.id)
    const blog = await Blog.findById(request.params.id)
    if(user._id.toString() === blog.user.toString()) {
        blog.remove()
        response.status(204).json(null)
    } else {
        response.status(400).json({error: 'You are not the blogs creator.'})
    }
})

blogsRouter.put('/:id', async (request,response) => {
    const body = request.body
    const blog = {}
    if (body.title) {blog.title = body.title}
    if (body.author) {blog.author = body.author}
    if (body.url) {blog.url = body.url}
    if (body.likes) {blog.likes = body.likes}
    if (body.comments) {blog.comments = body.comments}
    if (body.user) {blog.user = body.user}
    const newBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {new: true})
    response.json(newBlog)
})

module.exports = blogsRouter