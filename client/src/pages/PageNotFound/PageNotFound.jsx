import React from 'react'
import Layout from '../../components/Layouts/Layout'
import { Link } from 'react-router-dom'


const PageNotFound = () => {
  return (
    <Layout>
      <div className='flex flex-col items-center py-12 md:py-24'>
        <h1 className='text-7xl'>404</h1>
        <h2 className='text-3xl'>Oops! Page Not Found</h2>
        <Link className='border-2 p-2 my-4 bg-slate-500 text-slate-200 no-underline rounded-lg' to="/">Back to Home</Link>
      </div>
    </Layout>
  )
}

export default PageNotFound