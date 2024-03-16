import React from 'react'
import "./Footer.scss"
import {Link} from "react-router-dom"

const Footer = () => {
  return (
    <div className='app__footer'>
      <div className='app__footer-copyright'>
        <h4>All Rights reserved &copy; 2024</h4>
      </div>
      <ul className="app__footer-links">
        <li>
          <Link to="/about" >About</Link>
        </li>
        <li>
          <Link to="/contact" >Contact</Link>
        </li>
        <li>
          <Link to="/policy" >Privacy Policy</Link>
        </li>
      </ul>
    </div>
  )
}

export default Footer