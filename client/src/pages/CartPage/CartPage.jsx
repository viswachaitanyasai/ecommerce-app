import React, { useState, useEffect } from 'react'
import Layout from '../../components/Layouts/Layout'
import { useAuth } from '../../context/auth'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../../context/cart'
import DropIn from "braintree-web-drop-in-react";
// import "./CartPage.scss"
import axios from 'axios'
import toast from 'react-hot-toast'

const CartPage = () => {
    const [auth, setAuth] = useAuth();
    const [cart, setCart] = useCart();
    const [clientToken, setClientToken] = useState("");
    const [instance, setInstance] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const totalPrice = () => {
        try {
            let total = 0;
            cart?.map(item => { total = total + item.price });
            return total;
        } catch (error) {
            console.log(error);
        }
    }

    const removeCartItem = (pid) => {
        try {
            let myCart = [...cart];
            let index = myCart.findIndex(item => item._id === pid);
            myCart.splice(index, 1);
            setCart(myCart);
            localStorage.setItem("cart", JSON.stringify(myCart));
        } catch (error) {
            console.log(error);
        }
    }

    //get payment gateway token

    const getToken = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/braintree/token`);
            setClientToken(data?.clientToken);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getToken()
    }, [auth?.token]);

    const handlePayment = async () => {
        try {
            setLoading(true);
            const { nonce } = await instance.requestPaymentMethod();
            const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/product/braintree/payment`, {
                nonce,
                cart,
            });
            setLoading(false);
            localStorage.removeItem("cart");
            setCart([]);
            navigate("/dashboard/user/orders");
            toast.success("Payment Completed Successfully ");
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    return (
        <Layout>
            <div className='flex flex-col md:flex-row w-full items-center md:items-start'>
                <div className='app__cart-heading m-4 flex flex-col items-center md:w-1/2'>
                    <h1 className='text-3xl'>Shopping Bag</h1>
                    <h4 className='text-sm'>
                        {cart?.length ? `you have ${cart?.length} items in your cart ${auth?.token ? "" : "Please log in"}` : "Your Cart is Empty"}
                    </h4>
                    <div className='app__cart-items flex flex-wrap justify-center m-4'>
                        {cart.map((p) => (
                            <div className='w-72 h-32 m-2 flex flex-row justify-around border-2 rounded-lg'>
                                <div className='w-16 flex items-center cursor-pointer'>
                                    <img className='rounded-md' src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`} alt={p.name} onClick={() => navigate(`/product/${p.slug}`)} />
                                </div>
                                <div className='flex flex-col w-2/3 justify-evenly'>
                                    <p className='text-sm p-1 m-0'>{p.name}</p>
                                    <p cla className='text-sm font-medium p-1 m-0'>Price :{p.price}</p>
                                    <button className='w-6 ml-6' onClick={() => removeCartItem(p._id)}><img src='./images/delete.png' /></button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='app__cart-detail flex flex-col md:flex-row items-center md:items-start md:w-1/2'>
                    <div className='flex flex-col w-[90%]'>
                        <div className='flex flex-col items-center'>
                            <h2 className='text-3xl m-6'>Cart Summary</h2>
                            <p className='text-xs'>Total | Checkout | Payment</p>
                            <h4>Total :{totalPrice()}</h4>
                        </div>
                        {auth?.user?.address ? (
                            <>
                                <div className='w-[90%] flex flex-col items-start m-4'>
                                    <h4 className='text-base'>Current Address :</h4>
                                    <h5 className='border-2 w-full rounded-lg p-2'>{auth?.user?.address}</h5>
                                    <button
                                        className='border-2 py-1 px-2 rounded-lg bg-gray-200 mx-auto'
                                        onClick={() => navigate("/dashboard/user/profile")}
                                    >
                                        Update Address
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div className='w-[90%] flex flex-col items-start m-4'>
                                {auth?.token ? (
                                    <button
                                        className='border-2 py-1 px-2 rounded-lg bg-gray-200 mx-auto'
                                        onClick={() => navigate("/dashboard/user/profile")}
                                    >
                                        Update Address
                                    </button>
                                ) : (
                                    <button
                                        className='border-2 py-1 px-2 rounded-lg bg-gray-200 mx-auto'
                                        onClick={() =>
                                            navigate("/login", {
                                                state: "/cart",
                                            })
                                        }
                                    >
                                        Login
                                    </button>
                                )}
                            </div>
                        )}
                        <div className='my-6 w-[90%] mx-auto'>
                            {
                                !clientToken || !cart?.length ? ("") : (
                                    <>
                                        <DropIn
                                            options={{
                                                authorization: clientToken,
                                                paypal: {
                                                    flow: "vault"
                                                }
                                            }}
                                            onInstance={instance => setInstance(instance)}
                                        />
                                        <button
                                            className='border-2 py-1 px-2 rounded-lg bg-gray-200'
                                            onClick={handlePayment}
                                            disabled={loading || !instance || !auth?.user?.address}
                                        >
                                            {loading ? "Processing ...." : "Make Payment"}
                                        </button>
                                    </>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default CartPage