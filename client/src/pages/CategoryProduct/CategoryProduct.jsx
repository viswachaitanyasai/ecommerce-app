import React, { useState, useEffect } from 'react';
import Layout from '../../components/Layouts/Layout';
import axios from "axios"
import { useParams, useNavigate } from 'react-router-dom';

const CategoryProduct = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [products, setProduct] = useState([]);
    const [category, setCategory] = useState([]);
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
    return (
        <Layout>
            <div>
                <h2>Category - {category?.name}</h2>
                <h6>{products?.length} - results found</h6>
                <div className='app__home-products-box'>
                    {products?.map((p) => (
                        <div style={{ width: "15.5rem" }}>
                            <img src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`} alt={p.name} style={{ width: "14rem" }} />
                            <div>
                                <h5>{p.name}</h5>
                                <p>{p.description.substring(0, 15)}...</p>
                                <p>Rs. {p.price}</p>
                                <button onClick={() => navigate(`/product/${p.slug}`)}>More Details</button>
                                <button>Add to cart</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    )
}

export default CategoryProduct