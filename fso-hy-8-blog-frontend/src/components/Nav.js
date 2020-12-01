import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Logout from './Logout'

const Nav = ({ infoStyle, handleInfoMessage }) => {
    const loggedUser = useSelector(state => state.loggedUser)
    return (
        <>
            <Link to='/blogs'>blogs</Link>
            <Link to='/users'>users</Link>
            {loggedUser ? <div>
                {loggedUser.name}<Logout infoStyle={infoStyle} handleInfoMessage={handleInfoMessage} />
            </div> : null}
        </>
    )
}

export default Nav