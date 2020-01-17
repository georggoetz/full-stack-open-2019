const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')
const api = supertest(app)
const testHelper = require('./test_helper')

const initialUsers = [
  {
    username: 'jane',
    name: 'Calamity Jane',
    passwordHash: '01234567890'
  },
  {
    username: 'billy',
    name: 'Billy th Kid',
    passwordHash: '0123456789'
  }
]

describe('when there are initially some users in the db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    for (let user of initialUsers) {
      let userObject = new User(user)
      await userObject.save()
    }
    // Promise.all executes in parallel and thus does not preserve order
    /*
    const users = initialUsers.map(user => {
      let userObject = new User(user)
      return userObject.save()
    })
    Promise.all(users)
    */
  })

  test('blog posts are returned as json', async () => {
    await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blog posts are returned', async () => {
    const response = await api.get('/api/users')
    expect(response.body.length).toBe(initialUsers.length)
  })

  test('blog posts have id property', async () => {
    const response = await api.get('/api/users')
    response.body.forEach(blog => expect(blog.id).toBeDefined())
  })

  test('creation succeeds with a fresh username', async () => {
    const usersBefore = await testHelper.usersInDb()

    const newUser = {
      username: 'luke',
      name: 'Lucky Luke',
      password: 'topsecret'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAfter = await testHelper.usersInDb()

    expect(usersAfter.length).toBe(usersBefore.length + 1)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
