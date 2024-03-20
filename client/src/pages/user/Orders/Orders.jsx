import React, { useEffect, useState } from 'react'
import Layout from '../../../components/Layouts/Layout'
import { useAuth } from '../../../context/auth'
import UserMenu from '../../../components/UserMenu/UserMenu'
// import "./Orders.scss"
import axios from 'axios'
import moment from 'moment'
import { Card, Typography } from "@material-tailwind/react";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();

  const getOrders = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/auth/orders`);
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  return (
    <Layout>
      <div className='app_orders flex flex-col items-center'>
        <div>
          <UserMenu />
        </div>
        {/* <div>
          <h1>All Orders</h1>
          {orders.length === 0 ? <h1>No Orders</h1>
            : (orders.map((o, i) => {
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
                        <td>{o?.status}</td>
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
            }))}
        </div> */}
        <div className='flex flex-col items-center'>
          <h1>All Orders</h1>
          {orders.length === 0 ? <h1>No Orders</h1>
            :
            (<Card className="h-full w-full overflow-scroll">
              <table className="w-full min-w-max table-auto text-left">
                <thead>
                  <tr>
                    <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-2 md:p-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal leading-none opacity-70"
                      >
                        #
                      </Typography>
                    </th>
                    <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-2 md:p-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal leading-none opacity-70"
                      >
                        Status
                      </Typography>
                    </th>
                    <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-2 md:p-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal leading-none opacity-70"
                      >
                        Buyer
                      </Typography>
                    </th>
                    <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-2 md:p-4 hidden md:block">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal leading-none opacity-70"
                      >
                        Orders
                      </Typography>
                    </th>
                    <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-2 md:p-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal leading-none opacity-70"
                      >
                        Payment
                      </Typography>
                    </th>
                    <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-2 md:p-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal leading-none opacity-70"
                      >
                        Quantity
                      </Typography>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((p, i) => (
                    <tr key={p?.buyer?.name} className="even:bg-blue-gray-50/50">
                      <td className="p-2 md:p-4">
                        <Typography variant="small" color="blue-gray" className="font-normal">
                          {i + 1}
                        </Typography>
                      </td>
                      <td className="p-2 md:p-4">
                        <Typography variant="small" color="blue-gray" className="font-normal">
                          {p?.status}
                        </Typography>
                      </td>
                      <td className="p-2 md:p-4">
                        <Typography variant="small" color="blue-gray" className="font-normal">
                          {p?.buyer?.name}
                        </Typography>
                      </td>
                      <td className="p-2 md:p-4 hidden md:block">
                        <Typography as="a" href="#" variant="small" color="blue-gray" className="font-medium">
                          {moment(p?.createAt).fromNow()}
                        </Typography>
                      </td>
                      <td className="p-2 md:p-4">
                        <Typography as="a" href="#" variant="small" color="blue-gray" className="font-medium">
                          {p?.payment.success ? "Success" : "Failed"}
                        </Typography>
                      </td>
                      <td className="p-2 md:p-4">
                        <Typography as="a" href="#" variant="small" color="blue-gray" className="font-medium">
                          {p?.products?.length}
                        </Typography>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>)}
        </div>
      </div>
    </Layout>
  )
}

export default Orders