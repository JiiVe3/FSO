import React from 'react'
import { useSelector } from 'react-redux'
import ListedBlog from './ListedBlog'

const Blogs = () => {
  const blogs = useSelector(state => state.blogs)

  return (
    <Router>
      <Switch>
        <Route path={`${match.path}/:id`}>
          <Blog />
        </Route>
        <Route path={match.path}>
          <h2>blogs</h2>
          {blogs.map(blog =>
            <Link to={`${match.url}/${blog._id}`}><ListedBlog key={blog._id} blog={blog} /></Link>
          )}
        </Route>
      </Switch>
    </Router>
  )
}

export default Blogs