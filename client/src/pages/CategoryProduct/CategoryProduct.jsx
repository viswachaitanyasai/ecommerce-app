import React, { useState, useEffect } from "react";
import Layout from "../../components/Layouts/Layout";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../../context/cart";
import toast from "react-hot-toast";
import ProductCard from "../../components/ui/ProductCard";

const notify = (msg) =>
  toast.success(msg, {
    style: { background: "#0a0a0c", color: "#ededef", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "12px" },
    iconTheme: { primary: "#5E6AD2", secondary: "#ededef" },
  });

const CategoryProduct = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState({});
  const [cart, setCart] = useCart();

  useEffect(() => {
    if (params?.slug) getProductByCat();
    // eslint-disable-next-line
  }, [params?.slug]);

  const getProductByCat = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/product-category/${params.slug}`
      );
      setProducts(data?.products || []);
      setCategory(data?.category || {});
    } catch (error) {
      console.log(error);
    }
  };

  const addToCart = (product) => {
    setCart([...cart, product]);
    localStorage.setItem("cart", JSON.stringify([...cart, product]));
    notify("Item Added to Cart");
  };

  const goTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <Layout>
      <section className="px-4 pt-28 pb-16 md:pt-32 md:pb-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <div className="mb-10 text-center">
            <span className="label">Category</span>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
              {category?.name || "Products"}
            </h2>
            <p className="mt-2 text-sm" style={{ color: "var(--foreground-muted)" }}>
              {products.length > 0
                ? `${products.length} product${products.length !== 1 ? "s" : ""} available`
                : "Browse our collection"}
            </p>
          </div>

          {/* Products Grid */}
          {products.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-6">
              {products.map((p, index) => (
                <div
                  key={p._id}
                  className="animate-in"
                  style={{ animationDelay: `${(index % 8) * 0.08}s` }}
                >
                  <ProductCard
                    product={p}
                    onAddToCart={addToCart}
                    onNavigate={(slug) => {
                      navigate(`/product/${slug}`);
                      goTop();
                    }}
                  />
                </div>
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="flex flex-col items-center justify-center py-20">
              <div
                className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid var(--border-default)" }}
              >
                <svg
                  className="h-8 w-8"
                  style={{ color: "var(--foreground-muted)" }}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-foreground">No products found</h3>
              <p className="mt-1 text-sm" style={{ color: "var(--foreground-muted)" }}>
                {category?.name
                  ? `No products available in "${category.name}" yet.`
                  : "This category does not have any products yet."}
              </p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default CategoryProduct;
