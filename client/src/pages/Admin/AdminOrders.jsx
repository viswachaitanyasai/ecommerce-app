import React, { useState, useEffect } from 'react'
import AdminMenu from '../../components/AdminMenu/AdminMenu'
import Layout from '../../components/Layouts/Layout'
import { useAuth } from '../../context/auth'
import "./AdminOrders.scss"
import axios from 'axios'
import toast from 'react-hot-toast'
import moment from 'moment'
import { Select } from 'antd'
import AdminDashboard from './AdminDashboard'

const { Option } = Select;
const AdminOrders = () => {
    const [status, setStatus] = useState(["Not Process", "Processing", "Shipped", "deliverd", "cancel"]);
    const [changeStatus, setChangeStatus] = useState("");
    const [orders, setOrders] = useState([]);
    const [auth] = useAuth();

    const getOrders = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/auth/all-orders`);
            setOrders(data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (auth?.token) getOrders();
    }, [auth?.token]);

    const handleChange = async (orderId, value) => {
        try {
            const { data } = await axios.put(`${process.env.REACT_APP_API}/api/v1/auth/order-status/${orderId}`, {
                status: value,
            });
            getOrders();
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <AdminDashboard>
            <div className='flex flex-col items-center p-6'>
                <h1>All Orders</h1>

                <div className='pb-4 border-2 rounded-3xl'>
                    <table>
                        <thead>
                            <th className='p-3 md:p-4 text-xs md:text-base'>#</th>
                            <th className='p-3 md:p-4 text-xs md:text-base'>Status</th>
                            <th className='p-3 md:p-4 text-xs md:text-base'>Buyer</th>
                            <th className='p-3 md:p-4 text-xs md:text-base hidden md:block'>Orders</th>
                            <th className='p-3 md:p-4 text-xs md:text-base'>Payment</th>
                            <th className='p-3 md:p-4 text-xs md:text-base'>Quantity</th>
                        </thead>
                        <tbody>
                            {orders.map((o, i) => {
                                return (
                                    <tr>
                                        <td className='text-center text-xs md:text-base'>{i + 1}</td>
                                        <td className='text-center w-4 text-xs md:text-base'>
                                            <Select
                                                onChange={(value) => handleChange(o._id, value)}
                                                defaultValue={o?.status}
                                            >
                                                {status.map((s, i) => (
                                                    <Option key={i} value={s}>
                                                        {s}
                                                    </Option>
                                                ))}
                                            </Select>
                                        </td>
                                        <td className='text-center text-xs md:text-base'>{o?.buyer?.name}</td>
                                        <td className='text-center text-xs md:text-base hidden md:block'>{moment(o?.createAt).fromNow()}</td>
                                        <td className='text-center text-xs md:text-base'>{o?.payment.success ? "Success" : "Failed"}</td>
                                        <td className='text-center text-xs md:text-base'>{o?.products?.length}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </AdminDashboard>
    )
}

export default AdminOrders