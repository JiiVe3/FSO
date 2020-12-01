import React from 'react'
import { Nav } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Logout from './Logout'

const Navigation = ({ infoStyle, handleInfoMessage }) => {
    const loggedUser = useSelector(state => state.loggedUser)

    return (
        <Nav>
            <Nav.Link as={Link} to='/blogs'>blogs</Nav.Link>
            <Nav.Link as={Link} to='/users'>users</Nav.Link>
            {loggedUser ? <>
                <Nav.Link as={Link} to={`/users/${loggedUser._id}`}>{loggedUser.name}</Nav.Link>
                <Logout infoStyle={infoStyle} handleInfoMessage={handleInfoMessage} />
            </> : null}
        </Nav>
    )
}

export default Navigation