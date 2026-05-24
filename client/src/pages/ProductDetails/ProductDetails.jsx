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

const SIZES = ["XS", "S", "M", "L", "XL", "XXL"];

const ProductDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [selectedSize, setSelectedSize] = useState(null);

  useEffect(() => {
    if (params?.slug) getProduct();
    // eslint-disable-next-line
  }, [params?.slug]);

  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/get-product/${params.slug}`
      );
      const p = data?.product;
      setProduct(p);
      if (p?._id && p?.category?._id) getSimilarProduct(p._id, p.category._id);
    } catch (error) {
      console.log(error);
    }
  };

  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products || []);
    } catch (error) {
      console.log(error);
    }
  };

  const addToCart = (item) => {
    setCart([...cart, item]);
    localStorage.setItem("cart", JSON.stringify([...cart, item]));
    notify("Item Added to Cart");
  };

  const goTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  if (!product) {
    return (
      <Layout>
        <section className="px-4 pt-28 pb-16 md:pt-32 md:pb-24 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col items-center justify-center py-20">
              <div
                className="mb-4 flex h-16 w-16 animate-pulse items-center justify-center rounded-2xl"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid var(--border-default)" }}
              >
                <svg className="h-8 w-8" style={{ color: "var(--foreground-muted)" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <p className="text-sm" style={{ color: "var(--foreground-muted)" }}>Loading product...</p>
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="px-4 pt-28 pb-16 md:pt-32 md:pb-24 lg:px-8">
        <div className="mx-auto max-w-6xl">
          {/* ===== Product Detail Card ===== */}
          <div className="animate-in overflow-hidden rounded-2xl" style={{ background: "linear-gradient(to bottom, rgba(255,255,255,0.08), rgba(255,255,255,0.02))", border: "1px solid var(--border-default)", boxShadow: "0 0 0 1px rgba(255,255,255,0.06), 0 2px 20px rgba(0,0,0,0.4)" }}>
            <div className="flex flex-col md:flex-row">
              {/* Image */}
              <div className="flex items-center justify-center bg-white/[0.02] p-8 md:w-1/2 md:p-12">
                <img
                  className="h-auto max-h-80 w-full rounded-xl object-contain md:max-h-96"
                  src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${product._id}`}
                  alt={product.name}
                />
              </div>

              {/* Details */}
              <div className="flex flex-col justify-center gap-6 p-6 md:w-1/2 md:p-10">
                {/* Category tag */}
                {product?.category?.name && (
                  <span className="label">{product.category.name}</span>
                )}

                {/* Name */}
                <h1 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
                  {product.name}
                </h1>

                {/* Price */}
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-semibold text-foreground md:text-4xl">
                    Rs. {product.price}
                  </span>
                </div>

                {/* Description */}
                <p className="text-sm leading-relaxed" style={{ color: "var(--foreground-muted)" }}>
                  {product.description || "No description available."}
                </p>

                {/* Size Selector */}
                <div>
                  <p className="mb-3 text-xs font-medium uppercase tracking-wider" style={{ color: "var(--foreground-subtle)" }}>
                    Size
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {SIZES.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className="flex h-10 w-12 items-center justify-center rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105 active:scale-95"
                        style={{
                          background: selectedSize === size ? "var(--accent)" : "rgba(255,255,255,0.06)",
                          color: selectedSize === size ? "#fff" : "var(--foreground)",
                          border: selectedSize === size ? "1px solid var(--accent)" : "1px solid var(--border-default)",
                          boxShadow: selectedSize === size ? "0 0 0 1px rgba(94,106,210,0.5), inset 0 1px 0 0 rgba(255,255,255,0.2)" : "none",
                        }}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Delivery info */}
                <div className="flex items-center gap-2 text-xs" style={{ color: "var(--foreground-subtle)" }}>
                  <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                  </svg>
                  Standard delivery in 2–7 days
                </div>

                {/* Add to Cart */}
                <button
                  onClick={() => addToCart(product)}
                  className="flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                  style={{
                    background: "var(--accent)",
                    boxShadow: "0 0 0 1px rgba(94,106,210,0.5), 0 4px 12px rgba(94,106,210,0.3), inset 0 1px 0 0 rgba(255,255,255,0.2)",
                  }}
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
                  </svg>
                  Add to Cart
                </button>
              </div>
            </div>
          </div>

          {/* ===== Similar Products Section ===== */}
          {relatedProducts.length > 0 && (
            <div className="mt-16 md:mt-20">
              <hr className="section-divider mb-10" />
              <div className="mb-8 text-center">
                <span className="label">Related</span>
                <h2 className="mt-2 text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
                  Similar Products
                </h2>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-6">
                {relatedProducts.map((p, index) => (
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
            </div>
          )}

          {/* No Similar Products */}
          {product?._id && relatedProducts.length === 0 && (
            <div className="mt-16 md:mt-20">
              <hr className="section-divider mb-10" />
              <div className="flex flex-col items-center justify-center py-12">
                <p className="text-sm" style={{ color: "var(--foreground-muted)" }}>No similar products found.</p>
              </div>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default ProductDetails;
