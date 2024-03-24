import React, { useState } from 'react'
// import "./Header.scss"
import { NavLink } from "react-router-dom"
import { useAuth } from '../../context/auth'
import toast from 'react-hot-toast'
import SearchInput from '../Form/SearchInput'
import useCategory from '../../hooks/useCategory'
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom'
import { useCart } from '../../context/cart'
import { Badge } from "antd";

const Header = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const categories = useCategory();
  const handleLogOut = () => {
    setAuth({
      ...auth,
      user: null,
      token: ""
    })
    localStorage.removeItem("auth");
    toast.success("Log Out Successfully");
  }
  return (
    <nav className="app__navbar w-full fixed top-0">
      <div className='flex py-2 px-3 w-full items-center justify-between z-[2] bg-slate-50 border-2'>
        <h1 className='text-xl m-0'>ShopIt</h1>
        <div className='flex flex-row items-center space-x-4 md:space-x-8'>
          <SearchInput />
          <div className='md:hidden'>
            <button className="relative group" onClick={() => { setIsOpen(!isOpen) }}>
              <div className="relative flex overflow-hidden items-center justify-center rounded-full w-[50px] h-[50px] transform transition-all bg-slate-700 ring-0 ring-gray-300 hover:ring-8 group-focus:ring-4 ring-opacity-30 duration-200 shadow-md">
                <div className="flex flex-col justify-between w-[20px] h-[20px] transform transition-all duration-300 origin-center overflow-hidden">
                  <div className={`bg-white h-[2px] w-7 transform transition-all duration-300 origin-left ${isOpen ? 'translate-x-10' : ''}`}></div>
                  <div className={`bg-white h-[2px] w-7 rounded transform transition-all duration-300 ${isOpen ? 'translate-x-10' : ''} delay-75`}></div>
                  <div className={`bg-white h-[2px] w-7 transform transition-all duration-300 origin-left ${isOpen ? 'translate-x-10' : ''} delay-150`}></div>

                  <div className={`absolute items-center justify-between transform transition-all duration-500 top-2.5 -translate-x-10 flex w-0 ${isOpen ? 'translate-x-0' : ''}`}>
                    <div className={`absolute bg-white h-[2px] w-5 transform transition-all duration-500 rotate-0 delay-300 ${isOpen ? 'rotate-45' : ''}`}></div>
                    <div className={`absolute bg-white h-[2px] w-5 transform transition-all duration-500 -rotate-0 delay-300 ${isOpen ? '-rotate-45' : ''} `}></div>
                  </div>
                </div>
              </div>
            </button>
          </div>
          <div className='hidden md:block'>
            <div className='flex flex-row px-2 space-x-10'>
              <div>
                <NavLink className={'text-black no-underline'} to="/home" >home</NavLink>
              </div>

              <NavDropdown title="Category" id="basic-nav-dropdown" className='app__header-dropdown'>
                <NavDropdown.Item><Link style={{ textDecoration: "none", color: "black" }} to={`/categories`}>All categories</Link></NavDropdown.Item>
                {categories?.map((c) => (
                  <NavDropdown.Item><Link className={'text-black no-underline'} to={`/category/${c.slug}`} style={{ textDecoration: "none", color: "black" }}>{c.name}</Link></NavDropdown.Item>
                ))}
              </NavDropdown>

              {!auth.user ? (<>
                <div>
                  <NavLink className={'text-black no-underline'} to="/register" >Register</NavLink>
                </div>
                <div>
                  <NavLink className={'text-black no-underline'} to="/login" >Log In</NavLink>
                </div>
              </>) : (<>
                <div>
                  <NavLink className={'text-black no-underline'} to={`/dashboard/${auth?.user?.role === 1 ? "admin/create-category" : "user/profile"}`} >Dashboard</NavLink>
                </div>
                <div>
                  <NavLink className={'text-black no-underline'} onClick={handleLogOut} to="/login" >Log Out</NavLink>
                </div>
              </>)}
              <div>
                <Badge count={cart?.length} showZero>
                  <NavLink className={'text-black no-underline'} to="/cart" >Cart</NavLink>
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={`absolute p-3 z-10 bg-slate-500 w-full flex flex-col items-center space-y-1 transition-all duration-300 ease-in-out ${isOpen ? 'right-0' : 'right-[-100%]'}`}>
        <NavLink className={'no-underline text-black'} to="/home" >home</NavLink>
        {categories?.map((c, index) => (
          <Link to={`/category/${c.slug}`} key={index} style={{ textDecoration: "none", color: "black" }}>{c.name}</Link>
        ))}
        {!auth.user ? (<>
          <div>
            <NavLink className={'no-underline text-black'} to="/register" >Register</NavLink>
          </div>
          <div>
            <NavLink className={'no-underline text-black'} to="/login" >Log In</NavLink>
          </div>
        </>) : (<>
          <div>
            <NavLink className={'no-underline text-black'} to={`/dashboard/${auth?.user?.role === 1 ? "admin/create-category" : "user/profile"}`} >Dashboard</NavLink>
          </div>
          <div>
            <NavLink className={'no-underline text-black'} onClick={handleLogOut} to="/login" >Log Out</NavLink>
          </div>
        </>)}
        <div>
          <Badge count={cart?.length} showZero>
            <NavLink className={'no-underline text-black'} to="/cart" >Cart</NavLink>
          </Badge>
        </div>
      </div>
      {/* <ul className="app__navbar-links">
        <SearchInput />
        <li>
          <NavLink to="/home" >home</NavLink>
        </li>

        <NavDropdown title="Category" id="basic-nav-dropdown" className='app__header-dropdown'>
          <NavDropdown.Item><Link style={{ textDecoration: "none", color: "black" }} to={`/categories`}>All categories</Link></NavDropdown.Item>
          {categories?.map((c) => (
            <NavDropdown.Item><Link to={`/category/${c.slug}`} style={{ textDecoration: "none", color: "black" }}>{c.name}</Link></NavDropdown.Item>
          ))}
        </NavDropdown>

        {!auth.user ? (<>
          <li>
            <NavLink to="/register" >Register</NavLink>
          </li>
          <li>
            <NavLink to="/login" >Log In</NavLink>
          </li>
        </>) : (<>
          <li>
            <NavLink to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`} >Dashboard</NavLink>
          </li>
          <li>
            <NavLink onClick={handleLogOut} to="/login" >Log Out</NavLink>
          </li>
        </>)}
        <li>
          <Badge count={cart?.length} showZero>
            <NavLink to="/cart" >Cart</NavLink>
          </Badge>
        </li>
      </ul> */}
    </nav >
  )
}
export default Header