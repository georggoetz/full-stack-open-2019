import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, user, onUpdate, onRemove }) => {
  const [expanded, setExpanded] = useState(false)

  const showWhenExpanded = { display: expanded ? '': 'none' }
  const showWhenOwnedByUser = { display: user.username === blog.user.username ? '' : 'none' }

  const toggleExpanded = () => {
    setExpanded(!expanded)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      <div onClick={toggleExpanded}>
        {blog.title} {blog.author}
      </div>
      <div style={showWhenExpanded}>
        <div>
          <a href={blog.url}>{blog.url}</a>
        </div>
        <div>
          {blog.likes} likes <button onClick={onUpdate}>like</button>
        </div>
        <div>
          added by {user.name}
        </div>
        <div style={showWhenOwnedByUser}>
          <button onClick={onRemove}>remove</button>
        </div>
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired
}

export default Blog
