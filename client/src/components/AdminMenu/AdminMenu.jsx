import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
// import "./AdminMenu.scss"

const AdminMenu = () => {
  const location = useLocation();
  return (
    <>
      <div className='app__menu-list flex flex-col items-center'>
        <div className='app__menu-list-links flex flex-row justify-center'>
          <NavLink className={`mx-2 text-slate-800 ${location.pathname === '/dashboard/admin/create-category' ? 'font-bold text-black underline underline-offset-8' : 'no-underline'}`} to="/dashboard/admin/create-category">Create Category</NavLink>
          <NavLink className={`mx-2 text-slate-800 ${location.pathname === '/dashboard/admin/create-product' ? 'font-bold text-black underline underline-offset-8' : 'no-underline'}`} to="/dashboard/admin/create-product">Create Product</NavLink>
          <NavLink className={`mx-2 text-slate-800 ${location.pathname === '/dashboard/admin/products' ? 'font-bold text-black underline underline-offset-8' : 'no-underline'}`} to="/dashboard/admin/products">Products</NavLink>
          <NavLink className={`mx-2 text-slate-800 ${location.pathname === '/dashboard/admin/orders' ? 'font-bold text-black underline underline-offset-8' : 'no-underline'}`} to="/dashboard/admin/orders">Orders</NavLink>
        </div>
      </div>
    </>
  )
}

export default AdminMenu