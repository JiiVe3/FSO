import React from 'react'
import { useSelector } from 'react-redux'
import { Switch, useRouteMatch } from 'react-router-dom'
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
          <table>
            <tr>
              <th>name</th>
              <th>blogs created</th>
            </tr>
            {users.map(user => <tr>
              <th><Link to={`${match.url}/${user._id}`}>{user.name}</Link></th>
              <th>{user.blogs.length}</th>
            </tr>)}
          </table>
        </Route>
      </Switch>
    </>
  )
}

export default Users