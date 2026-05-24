import React, { useEffect, useState, useRef } from "react";
import Layout from "../../components/Layouts/Layout";
import axios from "axios";
import { Prices } from "../../components/Prices";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/cart";
import toast from "react-hot-toast";
import ProductCard from "../../components/ui/ProductCard";

/* ==========================================
   Custom Checkbox (Linear-style)
   ========================================== */
const CustomCheckbox = ({ checked, onChange, label }) => (
  <label className="group flex cursor-pointer items-center gap-3 px-3 py-2 transition-colors duration-200 hover:bg-white/[0.04] rounded-lg">
    <span
      className="relative flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-md border transition-all duration-200"
      style={{
        borderColor: checked ? "var(--accent)" : "var(--border-default)",
        background: checked ? "var(--accent)" : "transparent",
      }}
    >
      {checked && (
        <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 12 12" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.5 6l2.5 2.5L9.5 3" />
        </svg>
      )}
      <input type="checkbox" checked={checked} onChange={onChange} className="sr-only" />
    </span>
    <span className="text-sm text-foreground select-none">{label}</span>
  </label>
);

/* ==========================================
   Custom Radio (Linear-style)
   ========================================== */
const CustomRadio = ({ selected, value, onChange, label }) => (
  <label className="group flex cursor-pointer items-center gap-3 px-3 py-2 transition-colors duration-200 hover:bg-white/[0.04] rounded-lg">
    <span
      className="relative flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full border transition-all duration-200"
      style={{ borderColor: selected ? "var(--accent)" : "var(--border-default)" }}
    >
      {selected && (
        <span className="h-[10px] w-[10px] rounded-full" style={{ backgroundColor: "var(--accent)" }} />
      )}
      <input type="radio" checked={selected} onChange={() => onChange(value)} className="sr-only" />
    </span>
    <span className="text-sm text-foreground select-none">{label}</span>
  </label>
);

/* ==========================================
   Filter Dropdown (Linear-style)
   ========================================== */
const FilterDropdown = ({ label, isOpen, onToggle, children }) => (
  <div className="relative">
    <button
      onClick={onToggle}
      className="flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-all duration-200 hover:bg-white/[0.08]"
      style={{
        background: isOpen ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.05)",
        border: isOpen ? "1px solid var(--border-hover)" : "1px solid var(--border-default)",
        color: "var(--foreground)",
      }}
    >
      {label}
      <svg
        className={`h-4 w-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    </button>
    {isOpen && (
      <>
        <div className="fixed inset-0 z-10" onClick={onToggle} />
        <div
          className="absolute left-0 top-full z-20 mt-2 w-56 overflow-hidden rounded-xl p-2 shadow-xl backdrop-blur-xl"
          style={{
            background: "rgba(10,10,12,0.95)",
            border: "1px solid var(--border-default)",
            boxShadow: "0 0 0 1px rgba(255,255,255,0.06), 0 8px 40px rgba(0,0,0,0.5)",
          }}
        >
          <div className="max-h-64 overflow-y-auto">{children}</div>
        </div>
      </>
    )}
  </div>
);

/* ==========================================
   Skeleton Loader
   ========================================== */
const ProductSkeleton = () => (
  <div
    className="animate-pulse rounded-2xl"
    style={{
      background: "linear-gradient(to bottom, rgba(255,255,255,0.05), rgba(255,255,255,0.01))",
      border: "1px solid var(--border-default)",
    }}
  >
    <div className="h-48 w-full rounded-t-2xl bg-white/[0.03]" />
    <div className="space-y-3 p-5">
      <div className="h-4 w-3/4 rounded bg-white/[0.05]" />
      <div className="h-3 w-1/2 rounded bg-white/[0.03]" />
      <div className="h-4 w-1/4 rounded bg-white/[0.05]" />
    </div>
  </div>
);

/* ==========================================
   Homepage (Main)
   ========================================== */
const Homepage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [openDropdown, setOpenDropdown] = useState(null);
  const fetchIdRef = useRef(0);

  // ---- API calls ----
  const getTotal = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/product-count`);
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/get-category`);
      if (data?.success) setCategories(data?.category);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllCategory();
    getTotal();
  }, []);

  const getAllProducts = async () => {
    const id = ++fetchIdRef.current;
    try {
      setInitialLoading(true);
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/product-list/1`);
      if (id !== fetchIdRef.current) return; // stale response
      setProducts(data.products);
    } catch (error) {
      console.log(error);
    } finally {
      if (id === fetchIdRef.current) setInitialLoading(false);
    }
  };

  useEffect(() => {
    if (page === 1) return;
    loadMore();
    // eslint-disable-next-line
  }, [page]);

  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`);
      setProducts((prev) => [...prev, ...(data?.products || [])]);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // ---- Filter handlers ----
  const handleCategoryFilter = (value, id) => {
    let all = [...checked];
    if (value) all.push(id);
    else all = all.filter((c) => c !== id);
    setChecked(all);
  };

  const handlePriceFilter = (value) => setRadio(value);

  const filterProducts = async () => {
    const id = ++fetchIdRef.current;
    try {
      setInitialLoading(true);
      const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/product/product-filters`, { checked, radio });
      if (id !== fetchIdRef.current) return; // stale response
      setProducts(data?.products || []);
    } catch (error) {
      console.log(error);
    } finally {
      if (id === fetchIdRef.current) setInitialLoading(false);
    }
  };

  const resetFilters = () => {
    setChecked([]);
    setRadio([]);
    setPage(1);
  };

  useEffect(() => {
    if (checked.length || radio.length) filterProducts();
    else getAllProducts();
    // eslint-disable-next-line
  }, [checked, radio]);

  // ---- Cart handler ----
  const addToCart = (product) => {
    setCart([...cart, product]);
    localStorage.setItem("cart", JSON.stringify([...cart, product]));
    toast.success("Item Added to Cart", {
      style: { background: "#0a0a0c", color: "#ededef", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "12px" },
      iconTheme: { primary: "#5E6AD2", secondary: "#ededef" },
    });
  };

  const goTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const hasMore = products.length < total;

  return (
    <Layout>
      {/* ==================== PRODUCTS SECTION ==================== */}
      <section className="px-4 pt-4 pb-16 md:pt-16 md:pb-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {/* Section header */}
          <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="label">Products</span>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">Our Collection</h2>
              <p className="mt-2" style={{ color: "var(--foreground-muted)" }}>
                {total > 0 ? `Showing ${products.length} of ${total} products` : "Explore our curated selection"}
              </p>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap items-center gap-3">
              <FilterDropdown
                label="Category"
                isOpen={openDropdown === "category"}
                onToggle={() => setOpenDropdown(openDropdown === "category" ? null : "category")}
              >
                {categories.length === 0 && (
                  <p className="px-3 py-4 text-center text-sm" style={{ color: "var(--foreground-muted)" }}>No categories available</p>
                )}
                {categories.map((c) => (
                  <CustomCheckbox
                    key={c._id}
                    checked={checked.includes(c._id)}
                    onChange={(e) => handleCategoryFilter(e.target.checked, c._id)}
                    label={c.name}
                  />
                ))}
              </FilterDropdown>

              <FilterDropdown
                label="Price"
                isOpen={openDropdown === "price"}
                onToggle={() => setOpenDropdown(openDropdown === "price" ? null : "price")}
              >
                {Prices.map((p) => (
                  <CustomRadio
                    key={p._id}
                    selected={radio === p.array}
                    value={p.array}
                    onChange={handlePriceFilter}
                    label={p.name}
                  />
                ))}
              </FilterDropdown>

              {(checked.length > 0 || radio.length > 0) && (
                <button
                  onClick={resetFilters}
                  className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium transition-all duration-200"
                  style={{ color: "var(--foreground-muted)", border: "1px solid var(--border-default)" }}
                >
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Clear filters
                </button>
              )}
            </div>
          </div>

          {/* Products Grid - Bento style */}
          {initialLoading ? (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-6 auto-rows-auto">
              {Array.from({ length: 5 }).map((_, i) => (
                <ProductSkeleton key={i} />
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div
                className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid var(--border-default)" }}
              >
                <svg className="h-8 w-8" style={{ color: "var(--foreground-muted)" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-foreground">No products found</h3>
              <p className="mt-1 text-sm" style={{ color: "var(--foreground-muted)" }}>Try adjusting your filters to discover more.</p>
              <button
                onClick={resetFilters}
                className="mt-4 rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200"
                style={{ background: "var(--accent)", color: "#fff", boxShadow: "inset 0 1px 0 0 rgba(255,255,255,0.2)" }}
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <>
              <div className="group/grid grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-6 auto-rows-auto">
                {products.map((p, index) => (
                  <div
                    key={p._id}
                    className="animate-in"
                    style={{ animationDelay: `${(index % 8) * 0.08}s` }}
                  >
                    <ProductCard
                      product={p}
                      onAddToCart={addToCart}
                      onNavigate={(slug) => { navigate(`/product/${slug}`); goTop(); }}
                    />
                  </div>
                ))}
              </div>

              {hasMore && (
                <div className="mt-12 flex justify-center">
                  <button
                    onClick={() => setPage((p) => p + 1)}
                    disabled={loading}
                    className="group relative overflow-hidden rounded-lg px-10 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-50 active:scale-[0.98]"
                    style={{
                      background: loading ? "rgba(255,255,255,0.05)" : "var(--accent)",
                      boxShadow: loading
                        ? "none"
                        : "0 0 0 1px rgba(94,106,210,0.5), 0 4px 12px rgba(94,106,210,0.3), inset 0 1px 0 0 rgba(255,255,255,0.2)",
                    }}
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Loading...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        Load More
                        <svg className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                      </span>
                    )}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Homepage;
