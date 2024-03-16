import React, { useState, useEffect } from 'react'
import Layout from '../../components/Layouts/Layout'
import { useAuth } from '../../context/auth'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../../context/cart'
import DropIn from "braintree-web-drop-in-react";
import "./CartPage.scss"
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
            console.log(data);
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
            <div>
                <div className='app__cart-heading'>
                    <h1>
                        {`Hello ${auth?.token && auth?.user?.name}`}
                    </h1>
                    <h4>
                        {cart?.length ? `you have ${cart?.length} items in your cart ${auth?.token ? "" : "Please log in"}` : "Your Cart is Empty"}
                    </h4>
                </div>
                <div className='app__cart-detail'>
                    <div className='app__cart-items'>
                        {cart.map((p) => (
                            <div>
                                <div>
                                    <img src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`} alt={p.name} style={{ width: "14rem" }} />
                                </div>
                                <div>
                                    <p>{p.name}</p>
                                    <p>{p.description.substring(0, 10)}</p>
                                    <p>Price :{p.price}</p>
                                    <button onClick={() => removeCartItem(p._id)}>Remove</button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div>
                        <h2>Cart Summary</h2>
                        <p>Total | Checkout | Payment</p>
                        <hr />
                        <h4>Total :{totalPrice()}</h4>
                        {auth?.user?.address ? (
                            <>
                                <div>
                                    <h4>Current Address</h4>
                                    <h5>{auth?.user?.address}</h5>
                                    <button
                                        onClick={() => navigate("/dashboard/user/profile")}
                                    >
                                        Update Address
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div>
                                {auth?.token ? (
                                    <button
                                        onClick={() => navigate("/dashboard/user/profile")}
                                    >
                                        Update Address
                                    </button>
                                ) : (
                                    <button
                                        onClick={() =>
                                            navigate("/login", {
                                                state: "/cart",
                                            })
                                        }
                                    >
                                        Please Login to checkout
                                    </button>
                                )}
                            </div>
                        )}
                        <div>
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