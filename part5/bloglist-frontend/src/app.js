import React, { useState, useEffect } from 'react';
import Blog from './components/blog'
import BlogForm from './components/blog-form'
import Notification from './components/notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [notification, setNotification] = useState({message: null, className: 'success'})

  useEffect(() => {
    blogService
      .getAll()
      .then(initialBlogs => {
        setBlogs(initialBlogs)
      })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)

      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      showNotification('wrong username or password', 'error')
    }
  }

  const handleLogout = event => {
    event.preventDefault()
    if (user !== null) {
      setUser(null)
      window.localStorage.clear()
    }
  }

  const onBlogCreated = async event => {
    event.preventDefault()

    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl
    }

    const newBlog = await blogService.create(blogObject)

    setBlogs(blogs.concat(newBlog))
    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
    showNotification(`a new blog ${newBlog.title} by ${newBlog.author} added`, 'success')
  }

  const showNotification = (message, style) => {
    setNotification({message: message, className: style})
    setTimeout(() => {
      setNotification({message: null})
    }, 5000)
  }

  if (user === null) {
    return (
      <div>
        <h2>log in to application</h2>
        <Notification message={notification.message} className={notification.className} />
        <form onSubmit={handleLogin}>
          <div>
            username
              <input
                type="text"
                value={username}
                name="Username"
                onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
              <input
                type="password"
                value={password}
                name="Password"
                onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    )
  } else {
    return (
      <div>
        <h2>blogs</h2>
        <Notification message={notification.message} className={notification.className} />
        <p>
          {user.name} logged in
          <button onClick={handleLogout}>logout</button>
        </p>
        <h2>create new</h2>
        <BlogForm
          title={newTitle}
          author={newAuthor}
          url={newUrl}
          onTitleChanged={({ target }) => setNewTitle(target.value)}
          onAuthorChanged={({ target }) => setNewAuthor(target.value)}
          onUrlChanged={({ target }) => setNewUrl(target.value)}
          onCreated={onBlogCreated} />
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    )
  }
}

export default App;
