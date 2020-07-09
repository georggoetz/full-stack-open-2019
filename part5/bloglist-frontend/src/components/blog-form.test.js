import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './blog-form'

describe('<BlogForm />', () => {
  let component
  let addBlog

  beforeEach(() => {
    addBlog = jest.fn()
    component = render(
      <BlogForm
        addBlog={addBlog}
        showNotification={() => {}}
        hideForm={() => {}}
      />
    )
  })

  test('when creating new blog an event with props is received', () => {
    const title = component.container.querySelector('#title')
    const author = component.container.querySelector('#author')
    const url = component.container.querySelector('#url')
    const form = component.container.querySelector('form')

    fireEvent.change(title, {
      target: { value: 'testing forms could be easier' }
    })
    fireEvent.change(author, {
      target: { value: 'Mr. Tester' }
    })
    fireEvent.change(url, {
      target: { value: 'test.io' }
    })
    fireEvent.submit(form)

    expect(addBlog.mock.calls).toHaveLength(1)
  })

})
