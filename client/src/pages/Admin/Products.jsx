import React, { useState, useEffect } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
// import "./Products.scss"
import { Link } from 'react-router-dom'
import AdminDashboard from './AdminDashboard'

const Products = () => {
    const [products, setProducts] = useState([])

    const getAllProducts = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/get-product`);
            setProducts(data.products);
        } catch (error) {
            console.log(error)
            toast.error("Something went wrong")
        }
    }

    useEffect(() => {
        getAllProducts();
    }, [])
    return (
        <AdminDashboard>
            <div className='app__admin-dashboard flex flex-col items-center p-6'>
                <h1>All Products List</h1>
                <div className=' w-full flex flex-wrap flex-row justify-evenly'>
                    {products?.map((p) => (
                        <Link className='product-link no-underline' key={p._id} to={`/dashboard/admin/products/${p.slug}`}>
                            <div className='w-72 h-28 m-2 flex flex-row justify-around border-2 rounded-lg'>
                                <div className='w-16 flex items-center cursor-pointer'>
                                    <img className='rounded-md' src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`} alt={p.name} />
                                </div>
                                <div className='flex flex-col w-2/3 justify-start'>
                                    <p className='text-2xl text-black no-underline p-1 m-0 mt-4'>{p.name}</p>
                                    <p className='text-base text-black no-underline p-1 m-0'>Rs. {p.price}</p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </AdminDashboard>
    )
}

export default Products