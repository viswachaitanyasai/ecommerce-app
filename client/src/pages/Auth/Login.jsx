import React, { useState } from "react";
import Layout from '../../components/Layouts/Layout'
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../../context/auth";
import { set } from "mongoose";
// import "./Login.scss"
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  // form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/login`, {
        email,
        password,
      });
      if (res && res.data.success) {
        toast.success(res.data && res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate(location.state || "/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const handleGuest = () =>{
    setEmail("guest@guest.com");
    setPassword("123456789");
  }

  return (
    <Layout>
      <div className='app__login flex flex-row'>
        <div className="hidden md:block md:w-1/2">
          Photo Here
        </div>
        <div className='app__login-form-box md:w-1/2 w-full flex flex-col items-center'>
          <h1 className="my-12 text-4xl">Welcome Back !</h1>
          <form onSubmit={handleSubmit} className='app__login-form w-2/3 flex flex-col items-center space-y-5 md:space-y-8'>
            <input
              className='p-2 w-4/5 placeholder:text-sm rounded-lg border-2 border-gray-300'
              value={email}
              type='email'
              placeholder='email'
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              className='p-2 w-4/5 placeholder:text-sm rounded-lg border-2 border-gray-300'
              value={password}
              type='password'
              placeholder='password'
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div className="button_box flex flex-col items-center">
              <div className="flex flex-row space-y-4">
                <button className="py-2 px-3 m-3 rounded-lg border-2 bg-slate-500 text-slate-200" type='submit'>LogIn</button>
                <div className="py-2 px-3 m-3 rounded-lg border-2 bg-slate-500 text-slate-200 cursor-pointer" onClick={()=> handleGuest()}>Guest</div>
              </div>
              <button className="button-1 font-medium m-2" type='button' onClick={() => { navigate("/register") }}><span className="text-xs">New to website ? </span>Create an account</button>
              <button className="button-1 m-2" type='button' onClick={() => { navigate("/forgot-password") }}>Forgot Password ?</button>
            </div>
          </form>
        </div>
      </div>
    </Layout >
  );
};

export default Login;