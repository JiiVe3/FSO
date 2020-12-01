import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const post = (blog, user) =>{

  return axios.request({
    method: 'POST',
    url: baseUrl,
    headers: {
      'Authorization': `Bearer ${user.token}`
    },
    data: {
      ...blog
    },
  
  }).then(response => response.data)
}

const remove = (id, user) => {
  return axios.request({
    method: 'DELETE',
    url: `${baseUrl}/${id}`,
    headers: {
      'Authorization': `Bearer ${user.token}`
    }
  }).then(response => response.data)
}

const like = (blog) => {
  blog.likes += 1
  return axios.put(`${baseUrl}/${blog._id}`, blog).then(response => response.data)
}

const addComment = (newComment, id) => {
  return axios.request({
    method: 'POST',
    url: `${baseUrl}/${id}/comments`,
    data: {newComment}
  }).then(response => response.data)
}

export default { getAll, post, remove, like, addComment }