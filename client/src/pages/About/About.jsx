import React from 'react'
// import "./About.scss"
import Layout from '../../components/Layouts/Layout'
import { Link } from 'react-router-dom'

const About = () => {
  return (
    <Layout>
      <div className='flex flex-row'>
        <div className='hidden md:block md:w-1/2'>
          photo Here
        </div>
        <div className='md:w-1/2 w-full flex flex-col items-center'>
          <h1 className='text-5xl my-12'>About Us</h1>
          <p className='w-[80%]'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam id dapibus sem. Nam sed sem imperdiet, porta dui in, gravida nisl. Proin semper eros eget malesuada tristique.</p>
          <div className='my-12'>
            <Link className='border-2 p-2 rounded-lg bg-slate-500 text-slate-200 no-underline' to="/">Back to Home</Link>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default About