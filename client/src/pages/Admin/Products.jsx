import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import AdminDashboard from "./AdminDashboard";

const notifyError = (msg) =>
  toast.error(msg, {
    style: { background: "#0a0a0c", color: "#ededef", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "12px" },
    iconTheme: { primary: "#ef4444", secondary: "#ededef" },
  });

const Products = () => {
  const [products, setProducts] = useState([]);

  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/get-product`);
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      notifyError("Something went wrong");
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <AdminDashboard>
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <span className="label">Admin</span>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            All Products
          </h2>
          <p className="mt-2 text-sm" style={{ color: "var(--foreground-muted)" }}>
            {products.length} product{products.length !== 1 ? "s" : ""} in total
          </p>
        </div>

        {/* Product grid */}
        {products.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16">
            <div
              className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl"
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid var(--border-default)" }}
            >
              <svg className="h-6 w-6" style={{ color: "var(--foreground-muted)" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
            </div>
            <p className="text-sm" style={{ color: "var(--foreground-muted)" }}>No products yet</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((p) => (
              <Link
                key={p._id}
                to={`/dashboard/admin/products/${p.slug}`}
                className="group overflow-hidden rounded-2xl no-underline transition-all duration-300 hover:-translate-y-1"
                style={{
                  background: "linear-gradient(to bottom, rgba(255,255,255,0.06), rgba(255,255,255,0.02))",
                  border: "1px solid var(--border-default)",
                  boxShadow: "0 0 0 1px rgba(255,255,255,0.06), 0 2px 20px rgba(0,0,0,0.4)",
                }}
              >
                {/* Image */}
                <div className="flex h-44 items-center justify-center overflow-hidden bg-white/[0.02]">
                  <img
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                    alt={p.name}
                    loading="lazy"
                  />
                </div>

                {/* Info */}
                <div className="p-4">
                  <h3
                    className="truncate text-base font-semibold"
                    style={{ color: "var(--foreground)" }}
                  >
                    {p.name}
                  </h3>
                  <p className="mt-1 text-sm font-medium" style={{ color: "var(--accent)" }}>
                    Rs. {p.price}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </AdminDashboard>
  );
};

export default Products;
