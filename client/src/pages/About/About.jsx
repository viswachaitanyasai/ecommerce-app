import React from 'react'
import "./About.scss"
import Layout from '../../components/Layouts/Layout'
import { Link } from 'react-router-dom'

const About = () => {
  return (
    <Layout>
        <div className='app__about'>
          <img src='./images/about.jpeg' alt='about'></img>
          <div className='app__about-para'>
            <h1>About Us</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam id dapibus sem. Nam sed sem imperdiet, porta dui in, gravida nisl. Proin semper eros eget malesuada tristique. In sed sollicitudin ipsum. Phasellus sed orci nibh. Praesent sagittis, purus ut ornare euismod, ante sapien sagittis neque, eget hendrerit elit leo eu augue.</p>
            {/* <div className='app__about-p'>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div> */}
            <div className='app__button'>
              <Link to="/">Back to Home</Link>
            </div>
          </div>
        </div>
    </Layout>
  )
}

export default About