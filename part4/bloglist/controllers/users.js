const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const blogs = await User.find({})
  response.json(blogs.map(blog => blog.toJSON()))
})

usersRouter.post('/', async (request, response, next) => {
  try {
    const body = request.body
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)
    const user = new User({
      username: body.username,
      name: body.name,
      passwordHash: passwordHash
    })

    const newUser = await user.save()

    response.status(201).json(newUser.toJSON())
  } catch (exception) {
    next(exception)
  }
})

module.exports = usersRouter
