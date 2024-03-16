import React from 'react'
import { NavLink } from 'react-router-dom'

const UserMenu = () => {
    return (
        <>
            <div className='app__menu-list'>
                <h1>User Dashboard</h1>
                <div className='app__menu-list-links'>
                    <NavLink className="link-1" to="/dashboard/user/profile">Profile</NavLink>
                    <NavLink className="link-2" to="/dashboard/user/orders">Orders</NavLink>
                </div>
            </div>
        </>
    )
}

export default UserMenu