import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useCategory from '../../hooks/useCategory';
import Layout from '../../components/Layouts/Layout';

const Categories = () => {
    const categories = useCategory();
    return (
        <Layout>
            <div>
                <div>
                    {categories.map((c) => (
                        <div key={c._id}>
                            <button><Link to={`/category/${c.slug}`} style={{ textDecoration: "none", color: "black" }}>{c.name}</Link></button>
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    )
}

export default Categories