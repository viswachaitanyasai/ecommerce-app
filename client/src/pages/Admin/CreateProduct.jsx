import React, { useState, useEffect } from 'react'
import AdminMenu from '../../components/AdminMenu/AdminMenu'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Select } from 'antd'
import { useNavigate } from 'react-router-dom'
import AdminDashboard from './AdminDashboard'
const { Option } = Select;

const CreateProduct = () => {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [quantity, setQuantity] = useState("");
    const [shipping, setShipping] = useState("");
    const [photo, setPhoto] = useState("");

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

    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            const productData = new FormData();
            productData.append("name", name);
            productData.append("description", description);
            productData.append("price", price);
            productData.append("quantity", quantity);
            productData.append("photo", photo);
            productData.append("category", category);
            const data = axios.post(`${process.env.REACT_APP_API}/api/v1/product/create-product`, productData)
            if (data?.success) {
                toast.error(data?.message);
            } else {
                toast.success("Product created Successfully");
                navigate("/dashboard/admin/products");
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong")
        }
    }

    return (
        <>
            <AdminDashboard>
                <div className='flex flex-col items-center py-6'>
                    <h1>CreateProduct</h1>
                    <div className='w-[90%] space-y-4 md:w-[60%]'>
                        <Select bordered={false} placeholder="Select a Category" size='large' showSearch onChange={(value) => { setCategory(value) }}>
                            {categories?.map(c => (
                                <Option key={c._id} value={c._id}>{c.name}</Option>
                            ))}
                        </Select>
                        <div>
                            {photo && (
                                <div className='w-20'>
                                    <img src={URL.createObjectURL(photo)} alt='product photo' height={"200px"} />
                                </div>
                            )}
                        </div>
                        <div>
                            <label className='py-1 px-2 rounded-lg border-2 bg-slate-500 text-slate-200'>
                                Upload Photo
                                <input type='file' name='photo' accept='image/*' onChange={(e) => setPhoto(e.target.files[0])} hidden />
                            </label>
                        </div>
                        <div className='space-y-3'>
                            <div className='my-3 space-y-3 md:space-y-0 md:flex md:flex-row'>
                                <input
                                    className='w-full md:mr-4 p-2 border-2 rounded-lg'
                                    type='text'
                                    value={name}
                                    placeholder='write a name'
                                    onChange={(e) => setName(e.target.value)}
                                />
                                <input
                                    className='w-full md:ml-4 p-2 border-2 rounded-lg'
                                    type='text'
                                    value={description}
                                    placeholder='write a description'
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </div>
                            <div className='my-3 space-y-3 md:space-y-0 md:flex md:flex-row'>
                                <input
                                    className='w-full md:mr-4 p-2 border-2 rounded-lg'
                                    type='number'
                                    value={price}
                                    placeholder='write a price'
                                    onChange={(e) => setPrice(e.target.value)}
                                />
                                <input
                                    className='w-full md:ml-4 p-2 border-2 rounded-lg'
                                    type='number'
                                    value={quantity}
                                    placeholder='write quantity'
                                    onChange={(e) => setQuantity(e.target.value)}
                                />
                            </div>
                            <Select
                                variant={false}
                                placeholder='Select Shipping'
                                size='large'
                                showSearch
                                onChange={(value) => setShipping(value)}
                            >
                                <Option value="0">No</Option>
                                <Option value="1">Yes</Option>
                            </Select>
                        </div>
                        <div>
                            <button className='py-2 px-3 rounded-lg border-2 bg-slate-500 text-slate-200' onClick={handleCreate}>Create Product</button>
                        </div>
                    </div>

                </div>
            </AdminDashboard>
        </>
    )
}

export default CreateProduct