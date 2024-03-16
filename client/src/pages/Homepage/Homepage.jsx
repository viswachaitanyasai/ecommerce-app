import React, { useEffect, useState } from 'react'
import "./Homepage.scss"
import Layout from '../../components/Layouts/Layout'
import axios from 'axios'
import { Checkbox, Radio } from "antd";
import { Prices } from '../../components/Prices';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/cart';
import toast from 'react-hot-toast';

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

  useEffect(() => {
    if (checked.length || radio.length) filterProducts();
  }, [checked, radio])
  return (
    <Layout>
      <div className='app__home'>
        <div className='app__home-filter'>
          <h3>Filter by Category</h3>
          <div className='app__home-filter-check'>
            {categories.map((c) => (
              <Checkbox key={c._id} onChange={(e) => handleFilter(e.target.checked, c._id)}>{c.name}</Checkbox>
            ))}
          </div>
          <h3>Filter by Price</h3>
          <div className='app__home-filter-check'>
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {Prices.map(p => (
                <div key={p._id}>
                  <Radio value={p.array}>{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>
          <div>
            <button onClick={() => window.location.reload()}>Rest Filter</button>
          </div>
        </div>
        <div>
          <h1>All Products</h1>
          <div className='app__home-products-box'>
            {products?.map((p) => (
              <div style={{ width: "15.5rem" }}>
                <img src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`} alt={p.name} style={{ width: "14rem" }} />
                <div>
                  <h5>{p.name}</h5>
                  <p>{p.description.substring(0, 15)}...</p>
                  <p>Rs. {p.price}</p>
                  <button onClick={() => navigate(`/product/${p.slug}`)}>More Details</button>
                  <button onClick={
                    () => {
                      setCart([...cart, p]);
                      localStorage.setItem('cart', JSON.stringify([...cart, p]));
                      toast.success("Item Added to Cart");
                    }}>
                    Add to cart
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div>
            {products && products.length < total && (
              <button onClick={(e) => { e.preventDefault(); setPage(page + 1) }}>
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