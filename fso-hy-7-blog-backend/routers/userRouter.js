const usersRouter = require('express').Router()
const bcrypt = require('bcryptjs')
const User = require('../models/user.js')

usersRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('blogs')
    response.json(users)
})

usersRouter.post('/', async (request, response) => {
    if (!request.body.username || !request.body.password || request.body.password.lenght < 3) {
        response.status(400)
    } else {
        const saltRounds = 10
        const passwordHash = await bcrypt.hash(request.body.password, saltRounds)
        const user = new User({username: request.body.username, name: request.body.name, passwordHash})
        const savedUser = await user.save()
        response.json(savedUser)
    }
})

usersRouter.delete('/:id', async (request,response) => {
    await User.findByIdAndDelete(request.params.id)
    response.status(204)
})

usersRouter.put('/:id', async (request,response) => {

})

module.exports = usersRouter