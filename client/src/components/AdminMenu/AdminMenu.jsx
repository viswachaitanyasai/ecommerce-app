import React from 'react'
import { NavLink } from 'react-router-dom'
import "./AdminMenu.scss"

const AdminMenu = () => {
  return (
    <>
      <div className='app__menu-list'>
        <h1>Admin Panel</h1>
        <div className='app__menu-list-links'>
          <NavLink className="link-1" to="/dashboard/admin/create-category">Create Category</NavLink>
          <NavLink className="link-2" to="/dashboard/admin/create-product">Create Product</NavLink>
          <NavLink className="link-2" to="/dashboard/admin/products">Products</NavLink>
          <NavLink className="link-2" to="/dashboard/admin/orders">Orders</NavLink>
          <NavLink className="link-3" to="/dashboard/admin/users">Users</NavLink>
        </div>
      </div>
    </>
  )
}

export default AdminMenu