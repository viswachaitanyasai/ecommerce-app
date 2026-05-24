import React from "react";
import Layout from "../../components/Layouts/Layout";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <Layout>
      <section className="flex min-h-[calc(100vh-8rem)] flex-col items-center justify-center px-4 py-16 md:py-24">
        {/* 404 */}
        <div className="text-center">
          <span className="label">Error</span>
          <h1 className="gradient-text-accent mt-4 text-8xl font-bold leading-none md:text-9xl">
            404
          </h1>
          <div
            className="mx-auto my-6 h-px max-w-xs"
            style={{
              background: "linear-gradient(to right, transparent, var(--border-default), transparent)",
            }}
          />
          <h2 className="text-xl font-semibold text-foreground md:text-2xl">
            Page not found
          </h2>
          <p className="mt-2 text-sm" style={{ color: "var(--foreground-muted)" }}>
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        {/* Back Home */}
        <Link
          to="/"
          className="mt-10 flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
          style={{
            background: "var(--accent)",
            boxShadow: "0 0 0 1px rgba(94,106,210,0.5), 0 4px 12px rgba(94,106,210,0.3), inset 0 1px 0 0 rgba(255,255,255,0.2)",
            textDecoration: "none",
          }}
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l8-9v5c7 0 10 4 10 9-2-3-5-5-10-5v5l-8-9z" />
          </svg>
          Back to Home
        </Link>
      </section>
    </Layout>
  );
};

export default PageNotFound;
