import React, { useState } from "react";
import Layout from '../../components/Layouts/Layout'
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import "./ForgotPassword.scss"

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
            <div className='app__fp'>
                <div className='app__fp-form-box'>
                    <h1>Forgot Password</h1>
                    <form onSubmit={handleSubmit} className='app__fp-form'>
                        <div className='app__fp-form1'>
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
                                <p>Enter your Secret Answer :</p>
                                <input
                                    value={answer}
                                    type='text'
                                    placeholder='answer'
                                    onChange={(e) => setNewAnswer(e.target.value)}
                                    required
                                />
                            </div>

                            <div>
                                <p>Enter your New Password :</p>
                                <input
                                    value={newPassword}
                                    type='password'
                                    placeholder='new password'
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <div className="button_box">
                            <button className="button-2" type='submit'>Reset</button>
                        </div>
                    </form>
                </div>
            </div>
        </Layout>
    )
}

export default ForgotPassword