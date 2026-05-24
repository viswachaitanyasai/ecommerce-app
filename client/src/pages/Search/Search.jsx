import React from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layouts/Layout";
import { useSearch } from "../../context/search";
import { useCart } from "../../context/cart";
import toast from "react-hot-toast";
import ProductCard from "../../components/ui/ProductCard";

const notify = (msg) =>
  toast.success(msg, {
    style: { background: "#0a0a0c", color: "#ededef", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "12px" },
    iconTheme: { primary: "#5E6AD2", secondary: "#ededef" },
  });

const Search = () => {
  const [values] = useSearch();
  const [cart, setCart] = useCart();
  const navigate = useNavigate();
  const results = values?.results || [];
  const keyword = values?.keyword || "";

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
            <span className="label">Search</span>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
              Search Results
            </h2>
            {keyword && (
              <p className="mt-2 text-sm" style={{ color: "var(--foreground-muted)" }}>
                {results.length > 0
                  ? `Found ${results.length} result${results.length !== 1 ? "s" : ""} for "${keyword}"`
                  : `No results found for "${keyword}"`}
              </p>
            )}
            {!keyword && (
              <p className="mt-2 text-sm" style={{ color: "var(--foreground-muted)" }}>
                Enter a search term to find products
              </p>
            )}
          </div>

          {/* Results Grid */}
          {results.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-6">
              {results.map((p, index) => (
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
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-foreground">No products found</h3>
              <p className="mt-1 text-sm" style={{ color: "var(--foreground-muted)" }}>
                {keyword
                  ? `We couldn't find anything matching "${keyword}". Try a different search term.`
                  : "Start typing in the search bar above to find products."}
              </p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Search;
