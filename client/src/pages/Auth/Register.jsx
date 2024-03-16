import React,{useState} from 'react'
import "./Register.scss"
import {useNavigate} from "react-router-dom"
import Layout from '../../components/Layouts/Layout'
import toast from 'react-hot-toast';
import axios from "axios"

const Register = () => {
    const [name, SetName] = useState("");
    const [email, SetEmail] = useState("");
    const [password, SetPassword] = useState("");
    const [phone, SetPhone] = useState("");
    const [address, SetAddress] = useState("");
    const [answer, SetAnswer] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/register`,
            {name,email,password,phone,address,answer}
            );
            if(res.data.success){
                toast.success(res.data.message);
                navigate("/login");
            }else{
                toast.error(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong!");
        }
    }

  return (
    <Layout>
        <div className='app__register'>
            <div className='app__register-form-box'>
            <h1>Register Here</h1>
            <form onSubmit={handleSubmit} className='app__register-form'>
                <div className='app__register-form1'>
                    <div>
                        <p>Enter your Email :</p>
                        <input
                            value={email}
                            type='email'
                            placeholder='email'
                            onChange={(e) => SetEmail(e.target.value)}
                            required
                        />
                        <p>Enter your Name :</p>
                        <input
                            value={name}
                            type='text'
                            placeholder='name'
                            onChange={(e) => SetName(e.target.value)}
                            required
                        />
                        {/* <div className='app__register-form2'> */}
                        <p>Enter your Address :</p>
                        <input
                            value={address}
                            type='text'
                            placeholder='address'
                            onChange={(e) => SetAddress(e.target.value)}
                            required
                        />
                {/* </div> */}
                    </div>

                    <div>
                        <p>Enter your Password :</p>
                        <input
                            value={password}
                            type='password'
                            placeholder='password'
                            onChange={(e) => SetPassword(e.target.value)}
                            required
                        />
                        <p>Enter your Phone No :</p>
                        <input
                            value={phone}
                            type='text'
                            placeholder='phone no'
                            onChange={(e) => SetPhone(e.target.value)}
                            required
                        />
                        <p>What is your fav food :</p>
                        <input
                            value={answer}
                            type='text'
                            placeholder='favorate'
                            onChange={(e) => SetAnswer(e.target.value)}
                            required
                        />
                    </div>
                </div>
                <button type='submit'>Register</button>
            </form>
            </div>
        </div>
    </Layout>
  )
}

export default Register