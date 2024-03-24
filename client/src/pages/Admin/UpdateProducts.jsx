import React, { useState, useEffect } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Select } from 'antd'
import { useNavigate, useParams } from 'react-router-dom'
import AdminDashboard from './AdminDashboard'
const { Option } = Select;

const UpdateProducts = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState("");
  const [id, setId] = useState("");

  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/get-product/${params.slug}`)
      setName(data.product.name);
      setId(data.product._id);
      setDescription(data.product.description);
      setPrice(data.product.price);
      setQuantity(data.product.quantity);
      setShipping(data.product.shipping);
      setCategory(data.product.category._id);
      setName(data.product.name);
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getSingleProduct();
    //eslint-disable-next-line
  }, [])

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/get-category`);
      if (data?.success) {
        setCategories(data.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong")
    }
  }

  useEffect(() => {
    getAllCategory();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      photo && productData.append("photo", photo);
      productData.append("category", category);
      const data = axios.put(`${process.env.REACT_APP_API}/api/v1/product/update-product/${id}`, productData)
      if (data?.success) {
        toast.error(data?.message);
      } else {
        toast.success("Product updated Successfully");
        navigate("/dashboard/admin/products");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong")
    }
  }

  const handleDelete = async () => {
    try {
      let answer = window.prompt("Are you sure do you want to delete? (yes or no)")
      if (!answer) return;
      const { data } = await axios.delete(`${process.env.REACT_APP_API}/api/v1/product/delete-product/${id}`)
      toast.success("Product Deleted Successfully");
      navigate("/dashboard/admin/products");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  }

  return (
    <>
      <AdminDashboard>
        <div className='app__admin-dashboard'>
          <div>
            <h1>Update Product</h1>
            <div>
              <Select
                variant={false}
                placeholder="Select a Category"
                size='large'
                showSearch
                onChange={(value) => { setCategory(value) }}
                value={category}
              >
                {categories?.map(c => (
                  <Option key={c._id} value={c._id}>{c.name}</Option>
                ))}
              </Select>
              <div>
                <label>
                  {photo ? photo.name : "Upload Photo"}
                  <input type='file' name='photo' accept='image/*' onChange={(e) => setPhoto(e.target.files[0])} hidden />
                </label>
              </div>
              <div>
                {photo ? (
                  <div>
                    <img src={URL.createObjectURL(photo)} alt='product photo' height={"200px"} />
                  </div>
                ) : (
                  <div>
                    <img src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${id}`} alt='product photo' height={"200px"} />
                  </div>
                )
                }
              </div>
              <div>
                <input
                  type='text'
                  value={name}
                  placeholder='write a name'
                  onChange={(e) => setName(e.target.value)}
                />
                <input
                  type='text'
                  value={description}
                  placeholder='write a description'
                  onChange={(e) => setDescription(e.target.value)}
                />
                <input
                  type='number'
                  value={price}
                  placeholder='write a price'
                  onChange={(e) => setPrice(e.target.value)}
                />
                <input
                  type='number'
                  value={quantity}
                  placeholder='write quantity'
                  onChange={(e) => setQuantity(e.target.value)}
                />
                <Select
                  variant={false}
                  placeholder='Select Shipping'
                  size='large'
                  showSearch
                  onChange={(value) => setShipping(value)}
                  value={shipping ? "Yes" : 'No'}
                >
                  <Option value="0">No</Option>
                  <Option value="1">Yes</Option>
                </Select>
              </div>
              <div>
                <button onClick={handleUpdate}>Update Product</button>
              </div>
              <div>
                <button onClick={handleDelete}>Delete Product</button>
              </div>
            </div>
          </div>
        </div>
      </AdminDashboard>
    </>
  )
}

export default UpdateProducts