import React, { useState } from "react";
import Layout from '../../components/Layouts/Layout'
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
// import "./ForgotPassword.scss"

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [answer, setNewAnswer] = useState("");

    const navigate = useNavigate();

    // form function
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/forgot-password`, {
                email,
                newPassword,
                answer,
            });
            if (res && res.data.success) {
                toast.success(res.data && res.data.message);
                navigate("/login");
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    }
    return (
        <Layout>
            <div className='app__fp flex flex-row'>
                <div className="hidden md:block md:w-1/2">Photo Here</div>
                <div className='app__fp-form-box w-full flex flex-col items-center md:w-1/2'>
                    <h1 className="mt-12 mb-6 text-4xl">Forgot Password ?</h1>
                    <p className="text-xs mb-12">We got you</p>
                    <form onSubmit={handleSubmit} className='app__fp-form w-2/3 flex flex-col items-center space-y-5'>
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
                            value={answer}
                            type='text'
                            placeholder='answer'
                            onChange={(e) => setNewAnswer(e.target.value)}
                            required
                        />
                        <input
                            className='p-2 w-4/5 placeholder:text-sm rounded-lg border-2 border-gray-300'
                            value={newPassword}
                            type='password'
                            placeholder='new password'
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                        />
                        <div className="button_box">
                            <button className="py-2 px-3 m-4 rounded-lg border-2 bg-slate-500 text-slate-200" type='submit'>Reset</button>
                        </div>
                    </form>
                </div>
            </div>
        </Layout>
    )
}

export default ForgotPassword