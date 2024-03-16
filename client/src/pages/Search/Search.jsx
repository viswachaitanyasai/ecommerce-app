import React from 'react'
import Layout from '../../components/Layouts/Layout'
import { useSearch } from '../../context/search'

const Search = () => {
    const [values, useValues] = useSearch();
    return (
        <Layout>
            <div>
                <div>
                    <h1>Search Results</h1>
                    <h5>{values?.results.length < 1 ? "Results not found" : `Found ${values?.results.length}`}</h5>
                    <div className='app__home-products-box'>
                        {values?.results.map((p) => (
                            <div style={{ width: "15.5rem" }}>
                                <img src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`} alt={p.name} style={{ width: "14rem" }} />
                                <div>
                                    <h5>{p.name}</h5>
                                    <p>{p.description.substring(0, 15)}...</p>
                                    <p>Rs. {p.price}</p>
                                    <button>More Details</button>
                                    <button>Add to cart</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Search