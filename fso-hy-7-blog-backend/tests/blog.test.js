const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../index.js')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')

let token

beforeAll(async () => {
    await Blog.deleteMany({})
    await User.deleteMany({})
})

test('new user can be created', async () => {
    const newUser = {
        username: "test",
        name: "tester",
        password: "pass1234"
    }

    await api.post('/api/users')
        .send(newUser)
        .expect('Content-Type', /application\/json/)
})

test('user can login', async () => {
    const testUser = {
        username: "test",
        password: "pass1234"
    }

    const response = await api.post('/api/login').send(testUser)
    token = 'Bearer ' + response.body.token
    expect(token).toBeDefined()
})

test('new blog can be created', async () => {
    const newBlog = {
        title: "Test Blog",
        author: "Man",
        url: "url",
        likes: 0
    }

    await api.post('/api/blogs')
        .send(newBlog)
        .set('Authorization', token)
        .expect(201)
})

afterAll(async () => {
    mongoose.connection.close()
})