import React, { useState, useEffect } from 'react'
import AdminMenu from '../../components/AdminMenu/AdminMenu'
import Layout from '../../components/Layouts/Layout'
import { useAuth } from '../../context/auth'
import "./AdminOrders.scss"
import axios from 'axios'
import toast from 'react-hot-toast'
import moment from 'moment'
import { Select } from 'antd'
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
        <Layout>
            <div className='app_adminOrder'>
                <div>
                    <AdminMenu />
                </div>
                <div>
                    <h1>All Orders</h1>
                    {orders.map((o, i) => {
                        return (
                            <div>
                                <table>
                                    <thead>
                                        <th>#</th>
                                        <th>Status</th>
                                        <th>Buyer</th>
                                        <th>Orders</th>
                                        <th>Payment</th>
                                        <th>Quantity</th>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>{i + 1}</td>
                                            <td>
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
                                            <td>{o?.buyer?.name}</td>
                                            <td>{moment(o?.createAt).fromNow()}</td>
                                            <td>{o?.payment.success ? "Success" : "Failed"}</td>
                                            <td>{o?.products?.length}</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div>
                                    {o?.products?.map((p, i) => (
                                        <div>
                                            <div>
                                                <img src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`} alt={p.name} style={{ width: "14rem" }} />
                                            </div>
                                            <div>
                                                <p>{p.name}</p>
                                                <p>{p.description.substring(0, 10)}</p>
                                                <p>Price :{p.price}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </Layout>
    )
}

export default AdminOrders