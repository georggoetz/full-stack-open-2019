import React, { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ addBlog, showNotification, hideForm }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const createBlog = async event => {
    event.preventDefault()

    hideForm()

    const newBlog = {
      title: title,
      author: author,
      url: url
    }

    addBlog(newBlog)

    setTitle('')
    setAuthor('')
    setUrl('')

    showNotification(`a new blog ${newBlog.title} by ${newBlog.author} added`)
  }

  return (
    <div>
      <form onSubmit={createBlog}>
        <div>
          title:
          <input
            id='title'
            value={title}
            onChange={({ target }) => setTitle(target.value)} />
        </div>
        <div>
          author:
          <input
            id='author'
            value={author}
            onChange={({ target }) => setAuthor(target.value)} />
        </div>
        <div>
          url:
          <input
            id='url'
            value={url}
            onChange={({ target }) => setUrl(target.value)} />
        </div>
        <div>
          <button type="submit">create</button>
        </div>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  addBlog: PropTypes.func.isRequired,
  showNotification: PropTypes.func.isRequired,
  hideForm: PropTypes.func.isRequired
}

export default BlogForm
