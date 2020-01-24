import React, { useState, useEffect } from 'react';
import Blog from './components/blog'
import BlogForm from './components/blog-form'
import Notification from './components/notification'
import Toggleable from './components/toggleable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState({message: null, className: 'success'})

  const blogFormRef = React.createRef()

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

  const login = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)

      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      showError('wrong username or password')
    }
  }

  const logout = event => {
    event.preventDefault()
    if (user !== null) {
      setUser(null)
      window.localStorage.clear()
    }
  }

  const updateBlog = async id => {
    const currentBlog = blogs.find(blog => blog.id === id)
    const blogToUpdate = {
      ...currentBlog,
      likes: currentBlog.likes + 1,
      user: currentBlog.user.id
    }

    try {
      const updatedBlog = await blogService.update(currentBlog.id, blogToUpdate)
      setBlogs(blogs.map(blog => blog.id === currentBlog.id ? updatedBlog : blog))
    } catch (exception) {
      showError(`${currentBlog.title} has already been removed from the server`)
      setBlogs(blogs.filter(blog => blog.id !== currentBlog.id))
    }
  }

  const removeBlog = async id => {
    const blogToRemove = blogs.find(blog => blog.id === id)

    if (!window.confirm(`remove blog ${blogToRemove.title} by ${blogToRemove.author}`)) {
      return
    }

    try {
      await blogService.remove(blogToRemove.id)
    } catch (exception) {
      showError(`${blogToRemove.title} has already been removed from the server`)
    }

    setBlogs(blogs.filter(blog => blog.id !== blogToRemove.id))
  }

  const showError = message => showNotification(message, 'error')

  const showNotification = (message, style = 'success') => {
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
        <form onSubmit={login}>
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
          <button onClick={logout}>logout</button>
        </p>
        <h2>create new</h2>
        <Toggleable buttonLabel='new blog' ref={blogFormRef}>
          <BlogForm
            blogs={blogs}
            setBlogs={setBlogs}
            notify={showNotification}
            hideForm={() => blogFormRef.current.toggleVisibility()} />
        </Toggleable>
        {blogs
          .sort((a, b) => b.likes - a.likes)
          .map(blog =>
            <Blog
              key={blog.id}
              blog={blog}
              user={user}
              onUpdate={() => updateBlog(blog.id)}
              onRemove={() => removeBlog(blog.id)} />
        )}
      </div>
    )
  }
}

export default App;
