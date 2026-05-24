import React from 'react'
import "./Contact.scss"
import Layout from '../../components/Layouts/Layout'
import { Link } from 'react-router-dom'
import { CiMail } from "react-icons/ci";
import { TfiHeadphoneAlt } from "react-icons/tfi";
import { IoCallOutline } from "react-icons/io5";

const Contact = () => {
  return (
    <Layout>
        <div className='app__contact'>
          <img src='./images/contact.jpeg' alt='contact'></img>
          <div className='app__contact-para'>
            <h1>Contact Me</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam id dapibus sem. Nam sed sem imperdiet, porta dui in, gravida nisl. Proin semper eros eget malesuada tristique. In sed sollicitudin ipsum. Phasellus sed orci nibh. Praesent sagittis, purus ut ornare euismod, ante sapien sagittis neque, eget hendrerit elit leo eu augue.</p>
            <div className='app__contact-c'>
              <div><CiMail/><p>Lorem ipsum dolor sit amet</p></div>
              <div><IoCallOutline/><p>Lorem ipsum dolor sit amet</p></div>
              <div><TfiHeadphoneAlt/><p>Lorem ipsum dolor sit amet</p></div>
            </div>
            <div className='app__button'>
              <Link to="/">Back to Home</Link>
            </div>
          </div>
        </div>
    </Layout>
  )
}

export default Contact