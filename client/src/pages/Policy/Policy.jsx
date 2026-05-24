import React from 'react'
import "./Policy.scss"
import Layout from '../../components/Layouts/Layout'
import { Link } from 'react-router-dom'

const Policy = () => {
  return (
    <Layout>
        <div className='app__policy'>
          <img src='./images/policy.jpg' alt='policy'></img>
          <div className='app__policy-para'>
            <h1>Privacy Policy</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam id dapibus sem. Nam sed sem imperdiet, porta dui in, gravida nisl. Proin semper eros eget malesuada tristique. In sed sollicitudin ipsum. Phasellus sed orci nibh. Praesent sagittis, purus ut ornare euismod, ante sapien sagittis neque, eget hendrerit elit leo eu augue.</p>
            <div className='app__policy-p'>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
            <div className='app__button'>
              <Link to="/">Back to Home</Link>
            </div>
          </div>
        </div>
    </Layout>
  )
}

export default Policy