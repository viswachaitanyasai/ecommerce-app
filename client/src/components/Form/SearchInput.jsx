import React from 'react'
import { useSearch } from '../../context/search'
import axios from "axios";
import { useNavigate } from "react-router-dom"

const SearchInput = () => {
    const [values, setValues] = useSearch();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/search/${values.keyword}`);
            setValues({ ...values, results: data });
            navigate("/search");
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            <form className='flex' role='search' onSubmit={handleSubmit}>
                <input className='border-2 rounded-full py-2 px-3' type='search' placeholder='search' value={values.keyword} onChange={(e) => setValues({ ...values, keyword: e.target.value })} />
                <button className='p-2 border-2 rounded-full ml-2' type='submit'><img src='./images/search.png'></img></button>
            </form>
        </>
    )
}

export default SearchInput