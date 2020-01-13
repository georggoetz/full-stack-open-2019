const _ = require('lodash')

const dummy = () => 1

const totalLikes = blogs => blogs.reduce((sum, blog) => sum + blog.likes, 0)

const favoriteBlog = blogs => {
  if (!blogs || blogs.length === 0) {
    return undefined
  }
  const { title, author, likes } = blogs.reduce((prev, next) => next.likes > prev.likes ? next : prev)
  return { title, author, likes }
}

const mostBlogs = blogs => {
  if (!blogs || blogs.length === 0) {
    return undefined
  }
  return _(blogs)
    .groupBy('author')
    .map((blogs, author) => ({
      author: author,
      blogs: blogs.length
    }))
    .orderBy('blogs', ['desc'])
    .head()
}

const mostLikes = blogs => {
  if (!blogs || blogs.length === 0) {
    return undefined
  }
  return _(blogs)
    .groupBy('author')
    .map((blogs, author) => ({
      author: author,
      likes: _.sumBy(blogs, 'likes')
    }))
    .orderBy('likes', ['desc'])
    .head()
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
