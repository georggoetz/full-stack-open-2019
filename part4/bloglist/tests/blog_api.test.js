const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const api = supertest(app)
const testHelper = require('./test_helper')

beforeEach(async () => {
  await Blog.deleteMany({})

  for (let blog of testHelper.initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
})

describe('get', () => {
  test('blog posts are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blog posts are returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body.length).toBe(testHelper.initialBlogs.length)
  })

  test('blog posts have id property', async () => {
    const response = await api.get('/api/blogs')
    response.body.forEach(blog => expect(blog.id).toBeDefined())
  })
})

describe('post', () => {
  test('number of blog posts increases by one after adding', async () => {
    const newBlog = {
      title: 'Smashing the Stack for Fun and Profit',
      author: 'Aleph One',
      url: 'http://phrack.org/issues/49/14.html'
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAfterAdding = await testHelper.blogsInDb()
    const titles = blogsAfterAdding.map(blog => blog.title)

    expect(blogsAfterAdding.length).toBe(testHelper.initialBlogs.length + 1)
    expect(titles).toContain(newBlog.title)
  })

  test('if likes not specified it defaults to 0', async () => {
    const newBlog = {
      title: 'Smashing the Stack for Fun and Profit',
      author: 'Aleph One',
      url: 'http://phrack.org/issues/49/14.html'
    }

    await api
      .post('/api/blogs')
      .send(newBlog)

    const blogsAfterAdding = await testHelper.blogsInDb()
    const addedBlog = blogsAfterAdding
      .find(blog => blog.title === 'Smashing the Stack for Fun and Profit')

    expect(addedBlog.likes).toBe(0)
  })

  test('fails with status code 400 if blog post is invalid', async () => {
    const newBlog = {
      author: 'Georg'
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)

    const blogsAfterAdding = await testHelper.blogsInDb()

    expect(blogsAfterAdding.length).toBe(testHelper.initialBlogs.length)
  })
})

describe('delete', () => {
  test('succeeds with status 204 if id exists', async () => {
    const blogsBeforeDeletion = await testHelper.blogsInDb()
    const blogToDelete = blogsBeforeDeletion[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAfterDeletion = await testHelper.blogsInDb()
    const titles = blogsAfterDeletion.map(blog => blog.title)

    expect(blogsAfterDeletion.length).toBe(blogsBeforeDeletion.length - 1)
    expect(titles).not.toContain(blogToDelete.title)
  })
})

describe('put', () => {
  test('succeeds with status 200 if blog post was updated', async () => {
    const blogsBeforeUpdate = await testHelper.blogsInDb()
    const blogToUpdate = blogsBeforeUpdate[0]

    blogToUpdate.likes += 1

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(blogToUpdate)
      .expect(200)

    const blogsAfterUpdate = await testHelper.blogsInDb()
    const updatedBlog = blogsAfterUpdate.find(blog => blog.id === blogToUpdate.id)

    expect(blogsAfterUpdate.length).toBe(blogsBeforeUpdate.length)
    expect(updatedBlog.likes).toBe(blogToUpdate.likes)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
