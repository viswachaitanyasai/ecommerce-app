import React from 'react'
// import "./Policy.scss"
import Layout from '../../components/Layouts/Layout'
import { Link } from 'react-router-dom'

const Policy = () => {
  return (
    <Layout>
      <div className='flex flex-row'>
        <div className='hidden md:block md:w-1/2'>
          photo Here
        </div>
        <div className='md:w-1/2 w-full flex flex-col items-center'>
          <h1 className='text-5xl my-12'>Privacy Policy</h1>
          <p className='w-[80%]'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam id dapibus sem. Nam sed sem imperdiet, porta dui in, gravida nisl. Proin semper eros eget malesuada tristique. In sed sollicitudin ipsum. Phasellus sed orci nibh. Praesent sagittis, purus ut ornare euismod, ante sapien sagittis neque, eget hendrerit elit leo eu augue.</p>
          <div>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
          <div className='m-4'>
            <Link className='border-2 p-2 rounded-lg bg-slate-500 text-slate-200 no-underline' to="/">Back to Home</Link>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Policy