import React from 'react'
import { useSelector } from 'react-redux'
import Logout from './Logout'

const Nav = () => {
    const loggedUser = useSelector(state => state.loggedUser)
    return (
        <>
            <Link to='/blogs'>blogs</Link>
            <Link to='/blogs'>users</Link>
            {loggedUser ? <div>
                {loggedUser.name}<Logout />
            </div> : null}
        </>
    )
}

export default Nav