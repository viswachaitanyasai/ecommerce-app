import React from 'react'
import "./Header.scss"
import { NavLink } from "react-router-dom"
import { useAuth } from '../../context/auth'
import { token } from 'morgan'
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
    <nav className="app__navbar">

      <div className="app__navbar-logo">
        {/* <img src={images.logo} alt="logo"></img> */}
        <h1>ShopIt</h1>
      </div>

      <ul className="app__navbar-links">
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
      </ul>
    </nav>
  )
}
export default Header