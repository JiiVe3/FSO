require('dotenv').config()
const http = require('http')
const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const blogsRouter = require('./routers/blogRouter.js')
const usersRouter = require('./routers/userRouter.js')
const loginRouter = require('./routers/login.js')
const tokenExtractor = require('./middlewares/token.js')

app.use(cors())
app.use(express.json())
app.use(tokenExtractor)
app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

if (!(process.env.NODE_ENV === 'test')) {
    const PORT = 3001
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`)
    })
}

module.exports = app