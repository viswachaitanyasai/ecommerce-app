import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layouts/Layout';
import axios from "axios"
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/cart';
import toast from 'react-hot-toast';

const CategoryProduct = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [products, setProduct] = useState([]);
    const [category, setCategory] = useState([]);
    const [cart, setCart] = useCart();

    useEffect(() => {
        if (params?.slug) { getProductByCat(); }
    }, [params?.slug])
    const getProductByCat = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/product-category/${params.slug}`);
            setProduct(data?.products);
            setCategory(data?.category);
        } catch (error) {
            console.log(error)
        }
    }

    const goTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }

    return (
        <Layout>
            <div className='app__home-products-box flex flex-wrap justify-center'>
                {products?.map((p) => (
                    <div className='p-2 md:m-4 flex flex-col items-center'>
                        <div className='flex flex-col items-center cursor-pointer' onClick={() => { navigate(`/product/${p.slug}`); goTop(); }}>
                            <img className='w-44 md:w-64' src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`} alt={p.name} />
                            <div className='w-5/6'>
                                <p className='m-0 font-medium'>{p.name}</p>
                                <p className='m-0'>{p.description.substring(0, 15)}...</p>
                                <p className='m-0 font-medium text-xl'>Rs. {p.price}</p>
                            </div>
                        </div>
                        <button
                            className='py-2 px-4 w-full rounded-lg border-2 bg-slate-500 text-slate-200'
                            onClick={() => {
                                setCart([...cart, p]);
                                localStorage.setItem('cart', JSON.stringify([...cart, p]));
                                toast.success("Item Added to Cart");
                            }}>
                            Add to cart
                        </button>
                    </div>
                ))}
            </div>
        </Layout>
    )
}

export default CategoryProduct