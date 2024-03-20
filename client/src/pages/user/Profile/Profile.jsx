import React, { useState, useEffect } from 'react';
import Layout from '../../../components/Layouts/Layout';
import UserMenu from '../../../components/UserMenu/UserMenu';
// import "./Profile.scss";
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
                <div className='app__profile w-full flex justify-center'>
                    <div className='app__profile-form-box w-[90%] flex flex-col items-center'>
                        <h1>Your Details</h1>
                        <p className='text-xs'>Welcome to dashboard</p>
                        <form onSubmit={handleSubmit} className='app__profile-form flex flex-col items-center'>
                            <div className='app__profile-form1'>
                                <div>
                                    <p className='mb-2 text-xs'>Your Name :</p>
                                    <input
                                        className='py-2 px-3 w-64 mb-4 placeholder:text-sm rounded-lg border-2 border-gray-300'
                                        value={name}
                                        type='text'
                                        placeholder='name'
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                    <p className='mb-2 text-xs'>Your Email :</p>
                                    <input
                                        className='py-2 px-3 w-64 mb-4 placeholder:text-sm rounded-lg border-2 border-gray-300'
                                        value={email}
                                        type='email'
                                        placeholder='email'
                                        onChange={(e) => setEmail(e.target.value)}
                                        disabled
                                    />
                                    <p className='mb-2 text-xs'>Your Password :</p>
                                    <input
                                        className='py-2 px-3 w-64 mb-4 placeholder:text-sm rounded-lg border-2 border-gray-300'
                                        value={password}
                                        type='password'
                                        placeholder='password'
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <p className='mb-2 text-xs'>Your Phone No :</p>
                                    <input
                                        className='py-2 px-3 w-64 mb-4 placeholder:text-sm rounded-lg border-2 border-gray-300'
                                        value={phone}
                                        type='text'
                                        placeholder='phone no'
                                        onChange={(e) => setPhone(e.target.value)}
                                    />
                                    <p className='mb-2 text-xs'>Your Address :</p>
                                    <input
                                        className='py-2 px-3 w-64 mb-4 placeholder:text-sm rounded-lg border-2 border-gray-300'
                                        value={address}
                                        type='text'
                                        placeholder='address'
                                        onChange={(e) => setAddress(e.target.value)}
                                    />
                                </div>
                            </div>
                            <button className="py-2 px-3 m-3 rounded-lg border-2 bg-slate-500 text-slate-200" type='submit'>Update</button>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Profile