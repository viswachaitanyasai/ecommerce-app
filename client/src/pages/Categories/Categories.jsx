import React from "react";
import { Link } from "react-router-dom";
import useCategory from "../../hooks/useCategory";
import Layout from "../../components/Layouts/Layout";

const Categories = () => {
  const categories = useCategory();

  return (
    <Layout>
      <section className="px-4 pt-28 pb-16 md:pt-32 md:pb-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <div className="mb-10 text-center">
            <span className="label">Browse</span>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
              All Categories
            </h2>
            <p className="mt-2 text-sm" style={{ color: "var(--foreground-muted)" }}>
              {categories.length > 0
                ? `${categories.length} categor${categories.length !== 1 ? "ies" : "y"} available`
                : "Loading categories..."}
            </p>
          </div>

          {/* Category Grid */}
          {categories.length > 0 ? (
            <div className="mx-auto grid max-w-4xl grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:gap-4">
              {categories.map((c, index) => (
                <Link
                  key={c._id}
                  to={`/category/${c.slug}`}
                  className="animate-in group flex items-center justify-between rounded-2xl p-5 transition-all duration-300 hover:-translate-y-0.5"
                  style={{
                    background: "linear-gradient(to bottom, rgba(255,255,255,0.08), rgba(255,255,255,0.02))",
                    border: "1px solid var(--border-default)",
                    boxShadow: "0 0 0 1px rgba(255,255,255,0.06), 0 2px 20px rgba(0,0,0,0.4)",
                    transitionTimingFunction: "var(--ease-expo-out)",
                    textDecoration: "none",
                  }}
                >
                  <span className="text-base font-semibold text-foreground transition-colors duration-200 group-hover:text-white">
                    {c.name}
                  </span>
                  <svg
                    className="h-5 w-5 transition-all duration-200 group-hover:translate-x-0.5"
                    style={{ color: "var(--foreground-muted)" }}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
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
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-foreground">No categories found</h3>
              <p className="mt-1 text-sm" style={{ color: "var(--foreground-muted)" }}>
                Categories will appear here once they are created.
              </p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Categories;
