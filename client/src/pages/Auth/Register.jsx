import React, { useState } from 'react'
// import "./Register.scss"
import { useNavigate } from "react-router-dom"
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
                { name, email, password, phone, address, answer }
            );
            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/login");
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong!");
        }
    }

    return (
        <Layout>
            <div className='app__register flex flex-row'>
                <div className='hidden md:block md:w-1/2'>
                    Photo Here
                </div>
                <div className='w-full flex flex-col items-center md:w-1/2'>
                    <h1 className='my-12 text-4xl'>Create new account</h1>
                    <form onSubmit={handleSubmit} className='app__register-form w-2/3 flex flex-col items-center space-y-5'>
                        <input
                            className='p-2 w-4/5 placeholder:text-sm rounded-lg border-2 border-gray-300'
                            value={email}
                            type='email'
                            placeholder='email'
                            onChange={(e) => SetEmail(e.target.value)}
                            required
                        />
                        <input
                            className='p-2 w-4/5 placeholder:text-sm rounded-lg border-2 border-gray-300'
                            value={name}
                            type='text'
                            placeholder='name'
                            onChange={(e) => SetName(e.target.value)}
                            required
                        />
                        <input
                            className='p-2 w-4/5 placeholder:text-sm rounded-lg border-2 border-gray-300'
                            value={address}
                            type='text'
                            placeholder='address'
                            onChange={(e) => SetAddress(e.target.value)}
                            required
                        />
                        <input
                            className='p-2 w-4/5 placeholder:text-sm rounded-lg border-2 border-gray-300'
                            value={password}
                            type='password'
                            placeholder='password'
                            onChange={(e) => SetPassword(e.target.value)}
                            required
                        />
                        <input
                            className='p-2 w-4/5 placeholder:text-sm rounded-lg border-2 border-gray-300'
                            value={phone}
                            type='text'
                            placeholder='phone no'
                            onChange={(e) => SetPhone(e.target.value)}
                            required
                        />
                        <input
                            className='p-2 w-4/5 placeholder:text-sm rounded-lg border-2 border-gray-300'
                            value={answer}
                            type='text'
                            placeholder='favorate'
                            onChange={(e) => SetAnswer(e.target.value)}
                            required
                        />
                        <button className='py-2 px-3 m-4 rounded-lg border-2 bg-slate-500 text-slate-200' type='submit'>Register</button>
                    </form>
                    <div className='flex flex-row items-center'>
                        <p className='text-xs my-4 mx-2'>Already have an account?</p>
                        <button className="font-medium" type='button' onClick={() => { navigate("/login") }}>Log In</button>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Register