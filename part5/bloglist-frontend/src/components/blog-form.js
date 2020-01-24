import React, {useState} from 'react'
import blogService from '../services/blogs'

const BlogForm = ({blogs, setBlogs, notify, hideForm}) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const createBlog = async event => {
    event.preventDefault()

    hideForm()
    //blogFormRef.current.toggleVisibility()

    const blogObject = {
      title: title,
      author: author,
      url: url
    }

    let newBlog = await blogService.create(blogObject)

    // Get the populated blog by id. Would be nicer if it would be populated
    // right after posting it.
    newBlog = await blogService.getById(newBlog.id)

    setBlogs(blogs.concat(newBlog))

    setTitle('')
    setAuthor('')
    setUrl('')

    notify(`a new blog ${newBlog.title} by ${newBlog.author} added`)
  }

  return (
    <div>
      <form onSubmit={createBlog}>
        <div>
          title:
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)} />
        </div>
        <div>
          author:
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)} />
        </div>
        <div>
          url:
          <input
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

export default BlogForm
