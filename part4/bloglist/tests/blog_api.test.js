const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const api = supertest(app)
const testHelper = require('./test_helper')

describe('get', () => {

  beforeEach(async () => {
    await Blog.deleteMany({})

    for (let blog of testHelper.blogs) {
      let blogObject = new Blog(blog)
      await blogObject.save()
    }
  })

  test('blog posts are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blog posts are returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body.length).toBe(testHelper.blogs.length)
  })

  test('blog posts have id property', async () => {
    const response = await api.get('/api/blogs')
    response.body.forEach(blog => expect(blog.id).toBeDefined())
  })
})

describe('post', () => {

  beforeEach(async () => {
    await Blog.deleteMany({})
  })

  test('number of blog posts increases by one when adding a blog post', async () => {
    await api
      .post('/api/blogs')
      .send(testHelper.blog)
      .expect(201)

    const response = await api.get('/api/blogs')
    expect(response.body.length).toBe(1)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
