import React from 'react'
import "./PageNotFound.scss"
import Layout from '../../components/Layouts/Layout'
import { Link } from 'react-router-dom'


const PageNotFound = () => {
  return (
    <Layout>
      <div className='app__pagenotfound'>
        <h1>404</h1>
        <h2>Oops! Page Not Found</h2>
        <Link to="/">Back to Home</Link>
      </div>
    </Layout>
  )
}

export default PageNotFound