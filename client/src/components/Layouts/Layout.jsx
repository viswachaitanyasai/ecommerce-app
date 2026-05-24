import React from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import Buffer from '../Buffer/Buffer';
// import {Helmet} from "react-helmet";
import { Toaster } from 'react-hot-toast';

const Layout = ({children}) => {
  return (
    <>
      <Buffer/>
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