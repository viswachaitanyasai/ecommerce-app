import React, { useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import axios from 'axios'
import CategoryForm from '../../components/Form/CategoryForm'
import { Modal } from "antd"
import AdminDashboard from './AdminDashboard'

const CreateCategory = () => {
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState("");
    const [visible, setVisible] = useState(false);
    const [selected, setSelected] = useState(null);
    const [updatedName, setUpdatedName] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/category/create-category`, { name })
            if (data?.success) {
                toast.success(`${data.category.name} is created`);
                console.log(data);
                getAllCategory();
            } else {
                toast.error("Error in input")
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong in input form");
        }
    }

    // get categories
    const getAllCategory = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/get-category`);
            if (data?.success) {
                setCategories(data?.category);
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
            const { data } = await axios.put(`${process.env.REACT_APP_API}/api/v1/category/update-category/${selected._id}`, { name: updatedName });
            if (data.success) {
                toast.success(`${updatedName} is updated`);
                setSelected(null);
                setUpdatedName("");
                setVisible(false);
                getAllCategory();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    }

    const handleDelete = async (pId) => {
        try {
            const { data } = await axios.delete(`${process.env.REACT_APP_API}/api/v1/category/delete-category/${pId}`, { name: updatedName });
            if (data.success) {
                toast.success(`category is deleted`);
                getAllCategory();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    }

    return (
        <>
            <AdminDashboard>
                <div className='app__admin-dashboard flex flex-col py-6'>
                    <div className='flex flex-col items-center'>
                        <h1 className='mx-auto'>Manage Catogory</h1>
                        <div>
                            <CategoryForm handleSubmit={handleSubmit} value={name} setValue={setName} />
                        </div>
                        <table className='w-96 my-6'>
                            <thead>
                                <tr>
                                    <th className='p-2'>Name</th>
                                    <th className='p-2 text-center'>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {categories?.map(c => (
                                    <>
                                        <tr>
                                            <td className='p-2' key={c._id}>{c.name}</td>
                                            <td className='flex flex-row justify-evenly'>
                                                <button className='py-1 px-3 rounded-lg border-2 bg-slate-500 text-slate-200' onClick={() => { setVisible(true); setUpdatedName(c.name); setSelected(c) }}>Edit</button>
                                                <button className='py-1 px-3 rounded-lg border-2 bg-slate-500 text-slate-200' onClick={() => { handleDelete(c._id) }}>Delete</button>
                                            </td>
                                        </tr>
                                    </>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <Modal onCancel={() => setVisible(false)} footer={null} visible={visible}>
                        <CategoryForm value={updatedName} setValue={setUpdatedName} handleSubmit={handleUpdate} />
                    </Modal>
                </div>
            </AdminDashboard>
        </>
    )
}

export default CreateCategory