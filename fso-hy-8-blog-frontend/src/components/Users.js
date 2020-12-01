import React from 'react'
import { Table } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { Link, Route, Switch, useRouteMatch } from 'react-router-dom'
import User from './User'

const Users = () => {
  const users = useSelector(state => state.users)
  const match = useRouteMatch()
  return (
    <>
      <Switch>
        <Route path={`${match.path}/:id`}>
          <User />
        </Route>
        <Route path={match.path}>
          <h2>users</h2>
          <Table striped>
            <thead>
              <tr>
                <th>name</th>
                <th>blogs created</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => <tr key={user._id}>
                <th><Link to={`${match.url}/${user._id}`}>{user.name}</Link></th>
                <th>{user.blogs.length}</th>
              </tr>)}
            </tbody>
          </Table>
        </Route>
      </Switch>
    </>
  )
}

export default Users