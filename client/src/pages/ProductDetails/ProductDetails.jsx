import React, { useState, useEffect } from 'react'
import Layout from '../../components/Layouts/Layout'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'
import { useCart } from '../../context/cart';
import "./ProductDetails.scss"
import toast from 'react-hot-toast';


const ProductDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  useEffect(() => {
    if (params?.slug) { getProduct(); }
  }, [params?.slug])

  //get products details
  const getProduct = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/get-product/${params.slug}`);
      setProduct(data?.product);
      getSimilarProduct(data?.product._id, data?.product.category._id);
    } catch (error) {
      console.log(error)
    }
  }

  //get similar products
  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/related-product/${pid}/${cid}`);
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Layout>
      <div className='app__product-details'>
        <div>
          <img src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${product._id}`} alt={product.name} />
        </div>
        <div>
          <h1>Products details</h1>
          <h4>Name : {product.name}</h4>
          <h4>description : {product.description}</h4>
          <h4>Price : {product.price}</h4>
          <h4>Category : {product?.category?.name}</h4>
          <button onClick={
            () => {
              setCart([...cart, product]);
              localStorage.setItem('cart', JSON.stringify([...cart, product]));
              toast.success("Item Added to Cart");
            }}>
            Add to cart
          </button>
        </div>
      </div>
      <hr />
      <div>
        <h1>Similar Products</h1>
        {relatedProducts?.length < 1 && <p>No Similar Products</p>}
        <div className='app__home-products-box'>
          {relatedProducts?.map((p) => (
            <div style={{ width: "15.5rem" }}>
              <img src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`} alt={p.name} style={{ width: "14rem" }} />
              <div>
                <h5>{p.name}</h5>
                <p>{p.description.substring(0, 15)}...</p>
                <p>Rs. {p.price}</p>
                <button onClick={() => navigate(`/product/${p.slug}`)}>More Details</button>
                <button onClick={
                  () => {
                    setCart([...cart, product]);
                    localStorage.setItem('cart', JSON.stringify([...cart, product]));
                    toast.success("Item Added to Cart");
                  }}>
                  Add to cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  )
}

export default ProductDetails