import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    title: "Testing blog",
    author: "Writerman",
    url: "test.xyz",
    likes: 3,
    user: {
      name: 'test user',
      username: 'tuser'
    }
  }

  const mockHandler = jest.fn()

  const component = render(
    <Blog blog={blog} updateBlogs={mockHandler} />
  )

  const button = component.getByText('view')

  expect(component.container).toHaveTextContent('Testing blog')

  expect(component.container).toHaveTextContent('Writerman')

  expect(component.container).not.toHaveTextContent('test.xyz')

  expect(component.container).not.toHaveTextContent('likes 3')

  fireEvent.click(button)

  expect(component.container).toHaveTextContent('test.xyz')

  expect(component.container).toHaveTextContent('likes 3')
})