import React from 'react'
// import "./Contact.scss"
import Layout from '../../components/Layouts/Layout'
import { Link } from 'react-router-dom'
import { CiMail } from "react-icons/ci";
import { TfiHeadphoneAlt } from "react-icons/tfi";
import { IoCallOutline } from "react-icons/io5";

const Contact = () => {
  return (
    <Layout>
      <div className='flex flex-row'>
        <div className='hidden md:block md:w-1/2'>
          photo Here
        </div>
        <div className='md:w-1/2 w-full flex flex-col items-center'>
          <h1 className='text-5xl my-12'>Contact Me</h1>
          <p className='w-[80%]'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam id dapibus sem. Nam sed sem imperdiet, porta dui in, gravida nisl. Proin semper eros eget malesuada tristique. In sed sollicitudin ipsum. Phasellus sed orci nibh. Praesent sagittis, purus ut ornare euismod, ante sapien sagittis neque, eget hendrerit elit leo eu augue.</p>
          <div>
            <div><CiMail /><p>Lorem ipsum dolor sit amet</p></div>
            <div><IoCallOutline /><p>Lorem ipsum dolor sit amet</p></div>
            <div><TfiHeadphoneAlt /><p>Lorem ipsum dolor sit amet</p></div>
          </div>
          <div className='m-6'>
            <Link className='border-2 p-2 rounded-lg bg-slate-500 text-slate-200 no-underline' to="/">Back to Home</Link>
          </div>
        </div>
      </div>
    </Layout >
  )
}

export default Contact