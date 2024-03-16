import React, { useState } from "react";
import Layout from '../../components/Layouts/Layout'
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../../context/auth";
import "./Login.scss"
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
  return (
    <Layout>
        <div className='app__login'>
            <div className='app__login-form-box'>
            <h1>LogIn Here</h1>
            <form onSubmit={handleSubmit} className='app__login-form'>
                <div className='app__login-form1'>
                    <div>
                        <p>Enter your Email :</p>
                        <input
                            value={email}
                            type='email'
                            placeholder='email'
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <p>Enter your Password :</p>
                        <input
                            value={password}
                            type='password'
                            placeholder='password'
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                </div>
                <div className="button_box">
                  <button className="button-2" type='submit'>LogIn</button>
                  <button className="button-1" type='button' onClick={()=>{navigate("/forgot-password")}}>Forgot Password</button>
                </div>
            </form>
            </div>
        </div>
    </Layout>
  );
};

export default Login;