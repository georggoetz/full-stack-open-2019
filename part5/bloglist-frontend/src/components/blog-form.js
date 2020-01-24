import React from 'react'

const BlogForm = ({title, author, url, onTitleChanged, onAuthorChanged, onUrlChanged, onCreate}) => {
  return (
    <div>
      <form onSubmit={onCreate}>
        <div>
          title: <input value={title} onChange={onTitleChanged} />
        </div>
        <div>
          author: <input value={author} onChange={onAuthorChanged} />
        </div>
        <div>
          url: <input value={url} onChange={onUrlChanged} />
        </div>
        <div>
          <button type="submit">create</button>
        </div>
      </form>
    </div>
  )
}

export default BlogForm
