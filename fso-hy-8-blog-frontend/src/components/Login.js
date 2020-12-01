import React from 'react'
import { Button, Form } from 'react-bootstrap'

const Login = ({ handleLogin, username, setUsername, password, setPassword }) => (
  <div>
    <h2>Log in to application</h2>
    <Form onSubmit={handleLogin}>
      <Form.Group>
        <Form.Label>Username</Form.Label>
        <Form.Control
          id="usernameInput"
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Password</Form.Label>
        <Form.Control
          id="passwordInput"
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </Form.Group>
      <Form.Group>
        <Button id="loginButton" type="submit">login</Button>
      </Form.Group>
    </Form>
  </div>
)

export default Login