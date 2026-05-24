import React from 'react'
import { useNavigate } from 'react-router-dom'
import Layout from '../../components/Layouts/Layout'
import { useSearch } from '../../context/search'
import { useCart } from '../../context/cart';
import toast from 'react-hot-toast';

const Search = () => {
    const [values, useValues] = useSearch();
    const [cart, setCart] = useCart();
    const { navigate } = useNavigate();

    const goTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }

    return (
        <Layout>
            <div>
                <div className='flex flex-col items-center'>
                    <h1 className='text-3xl'>Search Results</h1>
                    <h5 className='text-base'>{values?.results.length < 1 ? "Results not found" : `Found ${values?.results.length}`}</h5>
                </div>
                <div className='app__home-products-box flex flex-wrap justify-center'>
                    {values?.results.map((p) => (
                        <div className='p-2 md:m-4 flex flex-col items-center'>
                            <div className='flex flex-col items-center cursor-pointer' onClick={() => { navigate(`/product/${p.slug}`); goTop(); }}>
                                <img className='w-44 md:w-64' src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`} alt={p.name} />
                                <div className='w-5/6'>
                                    <p className='m-0 font-medium'>{p.name}</p>
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
            </div>
        </Layout>
    )
}

export default Search