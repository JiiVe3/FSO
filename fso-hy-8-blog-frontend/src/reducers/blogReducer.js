import blogService from "../services/blogs"

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case 'CREATE':
      return state.concat(action.data)
    case 'GET_BLOGS':
      return action.data
    default:
      return state
  }
}

export const create = (blog, user) => {
  return async dispatch => {
    const newBlog = await blogService.post(blog, user)
    dispatch({
      type: 'CREATE',
      data: newBlog
    })
  }
}

export const getBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'GET_BLOGS',
      data: blogs
    })
  }
}

export default blogReducer