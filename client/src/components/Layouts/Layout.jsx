import React from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
// import {Helmet} from "react-helmet";
import { Toaster } from 'react-hot-toast';

const Layout = ({children}) => {
  return (
    <>
      {/* <Helmet>
          <meta charSet="utf-8" />
          <meta name="description" content={description}/>
          <meta name="keywords" content={keywords}/>
          <meta name="author" content={auther}/>
          <title>{title}</title>
      </Helmet> */}
      <Header/>
        <main style={{minHeight:"75vh"}}>
          <Toaster/>
          {children}
        </main>
      <Footer/>
    </>
  )
};


export default Layout