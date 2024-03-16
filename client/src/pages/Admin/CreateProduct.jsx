import React, {useState, useEffect} from 'react'
import Layout from '../../components/Layouts/Layout'
import AdminMenu from '../../components/AdminMenu/AdminMenu'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Select } from 'antd'
import { useNavigate } from 'react-router-dom'
const {Option} = Select;

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
            productData.append("name",name);
            productData.append("description",description);
            productData.append("price",price);
            productData.append("quantity",quantity);
            productData.append("photo",photo);
            productData.append("category",category);
            const data = axios.post(`${process.env.REACT_APP_API}/api/v1/product/create-product`, productData)
            if(data?.success){
                toast.error(data?.message);
            }else{
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
            <Layout>
                <div className='app__admin-dashboard'>
                    <div>
                        <AdminMenu/>
                    </div>
                    <div>
                        <h1>CreateProduct</h1>
                        <div>
                            <Select bordered={false} placeholder="Select a Category" size='large' showSearch onChange={(value) => {setCategory(value)}}>
                                {categories?.map(c => (
                                    <Option key={c._id} value={c._id}>{c.name}</Option>
                                ))}
                            </Select>
                            <div>
                                <label>
                                    {photo ? photo.name : "Upload Photo"}
                                    <input type='file' name='photo' accept='image/*' onChange={(e) => setPhoto(e.target.files[0])} hidden/>
                                </label>
                            </div>
                            <div>
                                {photo && (
                                    <div>
                                        <img src={URL.createObjectURL(photo)} alt='product photo' height={"200px"}/>
                                    </div>
                                )}
                            </div>
                            <div>
                                <input
                                    type='text'
                                    value={name}
                                    placeholder='write a name'
                                    onChange={(e)=> setName(e.target.value)}
                                />
                                <input
                                    type='text'
                                    value={description}
                                    placeholder='write a description'
                                    onChange={(e)=> setDescription(e.target.value)}
                                />
                                <input
                                    type='number'
                                    value={price}
                                    placeholder='write a price'
                                    onChange={(e)=> setPrice(e.target.value)}
                                />
                                <input
                                    type='number'
                                    value={quantity}
                                    placeholder='write quantity'
                                    onChange={(e)=> setQuantity(e.target.value)}
                                />
                                <Select
                                    bordered={false}
                                    placeholder='Select Shipping'
                                    size='large'
                                    showSearch
                                    onChange={(value)=> setShipping(value)}
                                >
                                    <Option value="0">No</Option>
                                    <Option value="1">Yes</Option>
                            </Select>
                            </div>
                            <div>
                                <button onClick={handleCreate}>Create Product</button>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    )
}

export default CreateProduct