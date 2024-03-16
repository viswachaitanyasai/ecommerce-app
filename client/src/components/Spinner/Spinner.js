import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import {HashLoader} from "react-spinners"
import "./Spinner.css"

const Spinner = ({path="login"}) => {
  const [count, setCount] = useState(3);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prevValue) => --prevValue)
    }, 1000)
    count === 0 && navigate(`/${path}`, {
      state: location.pathname
    });
    return () => clearInterval(interval);
  }, [count, navigate, location, path])

  return (
    <>
      <div className='spinner-page'>
        <h1 className=''>redirecting to you in {count}</h1>
        <HashLoader color="#36d7b7" />
      </div>
    </>
  )
}

export default Spinner