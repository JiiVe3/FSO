import React from 'react'
import { useSelector } from 'react-redux'
import { Link, Route, Switch, useRouteMatch } from 'react-router-dom'
import { Table } from 'react-bootstrap'
import Blog from './Blog'

const Blogs = () => {
  const match = useRouteMatch()
  const blogs = useSelector(state => state.blogs)

  return (
    <>
      <Switch>
        <Route path={`${match.path}/:id`}>
          <Blog />
        </Route>
        <Route path={match.path}>
          <h2>blogs</h2>
          <Table striped>
            <tbody>
              {blogs.map(blog => <tr key={blog._id}>
                <th><Link to={`${match.url}/${blog._id}`}>{blog.title}</Link></th>
                <th>{blog.author}</th>
              </tr>)}
            </tbody>
          </Table>
        </Route>
      </Switch>
    </>
  )
}

export default Blogs