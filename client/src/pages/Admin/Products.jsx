import React, { useState, useEffect } from 'react'
import AdminMenu from '../../components/AdminMenu/AdminMenu'
import Layout from '../../components/Layouts/Layout'
import axios from 'axios'
import toast from 'react-hot-toast'
import "./Products.scss"
import { Link } from 'react-router-dom'

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
        <Layout>
            <div className='app__admin-dashboard'>
                <div>
                    <AdminMenu />
                </div>
                <div>
                    <h1>All Products List</h1>
                    {products?.map((p) => (
                        <Link className='product-link' key={p._id} to={`/dashboard/admin/products/${p.slug}`}>
                            <div style={{ width: "18rem" }}>
                                <img src={ `${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`} alt={p.name} />
                                <div>
                                    <h5>{p.name}</h5>
                                    <p>{p.description}</p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </Layout>
    )
}

export default Products