import React, { useState, useEffect } from 'react'
import Layout from '../../components/Layouts/Layout'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'
import { useCart } from '../../context/cart';
// import "./ProductDetails.scss"
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

  const goTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }

  return (
    <Layout>
      <div className='flex flex-col items-center'>
        <div className='app__product-details w-[90%] md:w-[70%] my-4 flex flex-col md:flex-row items-center md:items-start'>
          <div className='md:w-1/2 flex justify-center'>
            <img className='md:w-[80%]' src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${product._id}`} alt={product.name} />
          </div>
          <div className='flex flex-col md:w-1/2 md:flex md:items-center'>
            <div className='md:w-[90%]'>
              <h4 className='text-sm md:text-lg my-4 ml-4'>{product.name}</h4>
              <h4 className='text-base md:text-2xl font-medium mb-4 ml-4'>Rs. {product.price}</h4>
              <div className='flex flex-row flex-wrap justify-evenly'>
                <button className='border-2 m-2 py-2 w-24 text-center bg-slate-100 focus:bg-slate-700 focus:text-slate-100'>XS</button>
                <button className='border-2 m-2 py-2 w-24 text-center bg-slate-100 focus:bg-slate-700 focus:text-slate-100'>S</button>
                <button className='border-2 m-2 py-2 w-24 text-center bg-slate-100 focus:bg-slate-700 focus:text-slate-100'>M</button>
                <button className='border-2 m-2 py-2 w-24 text-center bg-slate-100 focus:bg-slate-700 focus:text-slate-100'>L</button>
                <button className='border-2 m-2 py-2 w-24 text-center bg-slate-100 focus:bg-slate-700 focus:text-slate-100'>XL</button>
                <button className='border-2 m-2 py-2 w-24 text-center bg-slate-100 focus:bg-slate-700 focus:text-slate-100'>XXL</button>
              </div>
              <h4 className='text-sm my-3 mx-3'>{product.description}</h4>
              <p className='text-sm mt-3 mb-2 flex items-center'><img className='ml-3 mr-2 w-4 h-4' src='../images/info.png' alt='info'></img>Standard delivery in 2-7 days</p>
              <button
                className='border-2 w-full py-2 my-3 text-slate-200 bg-slate-500'
                onClick={
                  () => {
                    setCart([...cart, product]);
                    localStorage.setItem('cart', JSON.stringify([...cart, product]));
                    toast.success("Item Added to Cart");
                  }}>
                Add to cart
              </button>
            </div>
          </div>
        </div>
        <div className='w-full flex flex-col items-center'>
          <h1>Similar Products</h1>
          {relatedProducts?.length < 1 && <p>No Similar Products</p>}
          <div className='app__home-products-box flex flex-row flex-wrap justify-center'>
            {relatedProducts?.map((p) => (
              <div className='p-2 my-6 md:m-4 flex flex-col items-center'>
                <img
                  className='cursor-pointer w-44 md:w-64'
                  onClick={() => { navigate(`/product/${p.slug}`); goTop(); }}
                  src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                  alt={p.name} />
                <div className='w-5/6 cursor-pointer' onClick={() => navigate(`/product/${p.slug}`)}>
                  <h5 className='m-0 font-medium'>{p.name}</h5>
                  <p className='m-0'>{p.description.substring(0, 15)}...</p>
                  <p className='m-0 font-medium text-xl'>Rs. {p.price}</p>
                </div>
                <button
                  className='py-2 px-4 w-full rounded-lg border-2 bg-slate-500 text-slate-200'
                  onClick={() => {
                    setCart([...cart, product]);
                    localStorage.setItem('cart', JSON.stringify([...cart, product]));
                    toast.success("Item Added to Cart");
                  }}>
                  Add to cart
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default ProductDetails