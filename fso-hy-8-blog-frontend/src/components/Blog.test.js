import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
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

  let component

  let visibilityButton

  beforeEach(() => {
    component = render(
      <Blog blog={blog} updateBlogs={mockHandler} />
    )

    visibilityButton = component.getByText('view')
  })

  test('renders blog', () => {
    expect(component.container).toHaveTextContent('Testing blog')
    expect(component.container).toHaveTextContent('Writerman')
    expect(component.container).not.toHaveTextContent('test.xyz')
    expect(component.container).not.toHaveTextContent('likes 3')
  })

  test('renders expanded blog', () => {
    fireEvent.click(visibilityButton)

    expect(component.container).toHaveTextContent('test.xyz')
    expect(component.container).toHaveTextContent('likes 3')
  })

  test('like button clicks twice', () => {
    fireEvent.click(visibilityButton)

    const likeButton = component.container.querySelector('.likeButton')

    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})