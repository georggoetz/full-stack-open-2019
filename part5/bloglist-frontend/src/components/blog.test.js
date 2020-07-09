import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './blog'

describe('<Blog />', () => {
  let component
  const mockHandler = jest.fn()

  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Mr. Tester',
    url: 'www.test.com',
    likes: 100,
    user: {
      username: 'tester'
    }
  }

  const user = {
    username: 'tester',
    name: 'Mr. Tester',
  }

  beforeEach(() => {
    component = render(
      <Blog
        blog={blog}
        user={user}
        onUpdate={mockHandler}
        onRemove={() => {}}
      />
    )
  })

  test('only render title and author by default', () => {
    //component.debug()

    const blogTitle = component.container.querySelector('.blog-title')
    const blogDetails = component.container.querySelector('.blog-details')

    expect(component.container).toHaveTextContent('Component testing is done with react-testing-library')
    expect(component.container).toHaveTextContent('Mr. Tester')
    expect(blogTitle).toBeVisible
    expect(blogDetails).not.toBeVisible
  })

  test('when title is clicked the blog details become visible', () => {
    const blogTitle = component.container.querySelector('.blog-title')
    const blogDetails = component.container.querySelector('.blog-details')

    expect(blogDetails).not.toBeVisible

    fireEvent.click(blogTitle)

    expect(blogDetails).toBeVisible
  })

  test('when like button is clicked its handler is called', () => {
    const likeButton = component.container.querySelector('.like-button')

    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})
