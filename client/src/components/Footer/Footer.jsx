import React from 'react'
// import "./Footer.scss"
import { Link } from "react-router-dom"

const Footer = () => {
  return (
    <div className='app__footer py-4 px-8 bg-slate-200 flex flex-col md:flex-row md:justify-between items-center'>
      <div className='app__footer-copyright m-2'>
        <h4 className='text-xs md:text-sm'>All Rights reserved &copy;viswa</h4>
      </div>
      <div className="app__footer-links flex flex-row space-x-5">
        <div>
          <Link className='text-sm font-medium no-underline text-black' to="/about" >About</Link>
        </div>
        <div>
          <Link className='text-sm font-medium no-underline text-black' to="/contact" >Contact</Link>
        </div>
        <div>
          <Link className='text-sm font-medium no-underline text-black' to="/policy" >Privacy Policy</Link>
        </div>
      </div>
    </div>
  )
}

export default Footer