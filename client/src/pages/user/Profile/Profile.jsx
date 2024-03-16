import React, { useState, useEffect } from 'react';
import Layout from '../../../components/Layouts/Layout';
import UserMenu from '../../../components/UserMenu/UserMenu';
import "./Profile.scss";
import { useAuth } from "../../../context/auth";
import toast from "react-hot-toast";
import axios from "axios"

const Profile = () => {
    const [auth, setAuth] = useAuth();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");

    useEffect(() => {
        const { name, email, phone, address } = auth?.user;
        setName(name);
        setEmail(email);
        setPhone(phone);
        setAddress(address);
    }, [auth?.user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.put(`${process.env.REACT_APP_API}/api/v1/auth/profile`,
                { name, email, password, phone, address }
            );
            if (data?.error) {
                toast.error(data?.error);
            } else {
                setAuth({ ...auth, user: data?.updatedUser });
                let ls = localStorage.getItem("auth");
                ls = JSON.parse(ls);
                ls.user = data.updatedUser;
                localStorage.setItem("auth", JSON.stringify(ls));
                toast.success("Profile Updated Successfully");
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong!");
        }
    }
    return (
        <Layout>
            <div className='app__profile-div'>
                <div>
                    <UserMenu />
                </div>
                <div className='app__profile'>
                    <div className='app__profile-form-box'>
                        <h1>User Profile</h1>
                        <form onSubmit={handleSubmit} className='app__profile-form'>
                            <div className='app__profile-form1'>
                                <div>
                                    <p>Enter your Email :</p>
                                    <input
                                        value={email}
                                        type='email'
                                        placeholder='email'
                                        onChange={(e) => setEmail(e.target.value)}
                                        disabled
                                    />
                                    <p>Enter your Name :</p>
                                    <input
                                        value={name}
                                        type='text'
                                        placeholder='name'
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                    {/* <div className='app__register-form2'> */}
                                    <p>Enter your Address :</p>
                                    <input
                                        value={address}
                                        type='text'
                                        placeholder='address'
                                        onChange={(e) => setAddress(e.target.value)}
                                    />
                                    {/* </div> */}
                                </div>

                                <div>
                                    <p>Enter your Password :</p>
                                    <input
                                        value={password}
                                        type='password'
                                        placeholder='password'
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <p>Enter your Phone No :</p>
                                    <input
                                        value={phone}
                                        type='text'
                                        placeholder='phone no'
                                        onChange={(e) => setPhone(e.target.value)}
                                    />
                                </div>
                            </div>
                            <button type='submit'>Update</button>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Profile