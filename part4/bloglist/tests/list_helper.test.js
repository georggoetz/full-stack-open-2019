const listHelper = require('../utils/list_helper')
const testHelper = require('./test_helper')

const listWithOneBlog = [testHelper.initialBlogs[1]]

test('dummy returns one', () => {
  const result = listHelper.dummy([])
  expect(result).toBe(1)
})

describe('total likes', () => {
  test('when list is empty equals zero', () => {
    const result = listHelper.totalLikes([])
    expect(result).toBe(0)
  })

  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })

  test('when list has may blogs equals the sum of likes', () => {
    const result = listHelper.totalLikes(testHelper.initialBlogs)
    expect(result).toBe(36)
  })
})

describe('favorite blog', () => {
  test('when list is empty returns undefined', () => {
    const result = listHelper.favoriteBlog([])
    expect(result).toBeUndefined()
  })

  test('returns favorite blog', () => {
    const expected = {
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      likes: 12
    }
    const result = listHelper.favoriteBlog(testHelper.initialBlogs)
    expect(result).toEqual(expected)
  })
})

describe('most blogs', () => {
  test('when list is empty returns undefined', () => {
    const result = listHelper.mostBlogs([])
    expect(result).toBeUndefined()
  })

  test('when list has only one blog equals one', () => {
    const result = listHelper.mostBlogs(listWithOneBlog)
    expect(result).toEqual({ author: 'Edsger W. Dijkstra', blogs: 1 })
  })

  test('when list has many blogs the one with the most blogs', () => {
    const result = listHelper.mostBlogs(testHelper.initialBlogs)
    expect(result).toEqual({ author: 'Robert C. Martin', blogs: 3 })
  })
})

describe('most likes', () => {
  test('when list has many blogs author with most likes', () => {
    const result = listHelper.mostLikes(testHelper.initialBlogs)
    expect(result).toEqual({ author: 'Edsger W. Dijkstra', likes: 17 })
  })
})
