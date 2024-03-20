import React, { useEffect, useState } from 'react'
// import "./Homepage.scss"
import Layout from '../../components/Layouts/Layout'
import axios from 'axios'
import { Checkbox, Radio } from "antd";
import { Prices } from '../../components/Prices';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/cart';
import toast from 'react-hot-toast';
import NavDropdown from 'react-bootstrap/NavDropdown';

const Homepage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const getTotal = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/product-count`);
      setTotal(data?.total)
    } catch (error) {
      console.log(error);
    }
  }

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/get-category`);
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);

  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`);
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error)
    }
  }

  useEffect(() => {
    if (page === 1) return;
    laodMore();
  }, [page]);

  const laodMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`)
      setLoading(false);
      setProducts([...products, ...data?.products])
    } catch (error) {
      console.log(false)
      setLoading(false);
    }
  }

  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      //below line remove the checked filter which retern false
      all = all.filter(c => c !== id);
      //above code compare all the id in "all" array if any element is same it will remove from array
    }
    setChecked(all);
  }

  useEffect(() => {
    if (!checked.length || radio.length) getAllProducts();
  }, [checked.length, radio.length])

  const filterProducts = async () => {
    try {
      const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/product/product-filters`, { checked, radio });
      setProducts(data?.products)
    } catch (error) {
      console.log(error)
    }
  }

  const goTop = ()=>{
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }

  useEffect(() => {
    if (checked.length || radio.length) filterProducts();
  }, [checked, radio])
  return (
    <Layout>
      <div className='app__home flex flex-col w-full items-center'>
        <h1 className='my-6'>All Products</h1>
        <div className='app__home-filter flex flex-row space-x-4 w-full pl-6 pb-4'>
          <div className='app__home-filter-check'>
            <NavDropdown title="Category" id="basic-category-dropdown" className='app__home-dropdown'>
              {categories.map((c) => (
                <NavDropdown.Item><Checkbox key={c._id} onChange={(e) => handleFilter(e.target.checked, c._id)}>{c.name}</Checkbox></NavDropdown.Item>
              ))}
            </NavDropdown>
          </div>
          <div className='app__home-filter-check'>
            <NavDropdown title="Price" id="basic-proce-dropdown" className='app__home-dropdown'>
              <Radio.Group onChange={(e) => setRadio(e.target.value)}>
                {Prices.map(p => (
                  <div key={p._id}>
                    <Radio value={p.array}>{p.name}</Radio>
                  </div>
                ))}
              </Radio.Group>
              <button className='ml-6' onClick={() => window.location.reload()}>Rest Filter</button>
            </NavDropdown>
          </div>
        </div>
        <div>
          <div className='app__home-products-box flex flex-wrap justify-center'>
            {products?.map((p) => (
              <div className='p-2 md:m-4 flex flex-col items-center'>
                <div className='flex flex-col items-center cursor-pointer' onClick={() => {navigate(`/product/${p.slug}`);goTop();}}>
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
          <div className='flex justify-center m-6'>
            {products && products.length < total && (
              <button
                className='py-2 px-4 w-32 rounded-lg border-2 bg-slate-500 text-slate-200'
                onClick={(e) => { e.preventDefault(); setPage(page + 1) }}>
                {loading ? "loading..." : "load more"}
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Homepage