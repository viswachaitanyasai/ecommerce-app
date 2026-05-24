import React from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import Buffer from '../Buffer/Buffer';
import AmbientBackground from '../ui/AmbientBackground';
// import {Helmet} from "react-helmet";
import { Toaster } from 'react-hot-toast';

const Layout = ({children}) => {
  return (
    <>
      <AmbientBackground />
      <Buffer/>
      <Header/>
        <main style={{minHeight:"75vh"}}>
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                background: '#0a0a0c',
                color: '#ededef',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: '12px',
                fontSize: '14px',
              },
            }}
          />
          {children}
        </main>
      <Footer/>
    </>
  )
};


export default Layout