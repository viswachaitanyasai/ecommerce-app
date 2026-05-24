import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'

const UserMenu = () => {
    const location = useLocation();
    return (
        <>
            <div className=' flex flex-col w-full items-center p-4'>
                <h1 className='text-xl'>User Dashboard</h1>
                <div className='my-4'>
                    <NavLink className={`text-black mx-8 ${location.pathname === '/dashboard/user/profile' ? 'font-bold text-black underline underline-offset-8' : 'no-underline'}`} to="/dashboard/user/profile">Profile</NavLink>
                    <NavLink className={`text-black mx-8 ${location.pathname === '/dashboard/user/orders' ? 'font-bold text-black underline underline-offset-8' : 'no-underline'}`} to="/dashboard/user/orders">Orders</NavLink>
                </div>
            </div>
        </>
    )
}

export default UserMenu