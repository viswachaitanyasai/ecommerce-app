import React from "react";
import { Link } from "react-router-dom";
import Layout from "../../components/Layouts/Layout";

const About = () => {
  const features = [
    {
      title: "Our Mission",
      desc: "To provide a seamless shopping experience with curated collections for the modern lifestyle — from everyday essentials to extraordinary finds.",
    },
    {
      title: "Our Vision",
      desc: "To become the go-to destination for quality products that tell a story, connecting people with items that enrich their lives.",
    },
    {
      title: "Our Values",
      desc: "Quality, authenticity, and customer satisfaction are at the heart of everything we do. We believe in building trust through transparency.",
    },
  ];

  return (
    <Layout>
      <section className="px-4 pt-28 pb-16 md:pt-32 md:pb-24 lg:px-8">
        <div className="mx-auto max-w-4xl">
          {/* Header */}
          <div className="mb-8 text-center">
            <span className="label">About</span>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
              About Us
            </h2>
          </div>

          {/* Hero illustration + intro */}
          <div
            className="mb-10 overflow-hidden rounded-2xl p-8 md:p-12"
            style={{
              background: "linear-gradient(to bottom, rgba(255,255,255,0.06), rgba(255,255,255,0.02))",
              border: "1px solid var(--border-default)",
              boxShadow: "0 0 0 1px rgba(255,255,255,0.06), 0 2px 20px rgba(0,0,0,0.4)",
            }}
          >
            <div className="flex flex-col items-center gap-6 md:flex-row">
              {/* SVG illustration */}
              <div className="flex-shrink-0">
                <svg width="160" height="160" viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="20" y="40" width="120" height="80" rx="12" stroke="#5E6AD2" strokeWidth="2" fill="rgba(94,106,210,0.1)" />
                  <rect x="40" y="60" width="80" height="40" rx="6" stroke="#5E6AD2" strokeWidth="1.5" fill="rgba(94,106,210,0.05)" />
                  <circle cx="80" cy="80" r="12" stroke="#5E6AD2" strokeWidth="1.5" fill="rgba(94,106,210,0.15)" />
                  <circle cx="60" cy="50" r="4" fill="#5E6AD2" opacity="0.4" />
                  <circle cx="100" cy="50" r="4" fill="#5E6AD2" opacity="0.4" />
                </svg>
              </div>
              <div>
                <p className="text-base leading-relaxed" style={{ color: "var(--foreground)" }}>
                  Welcome to <strong>ShopIt</strong> — your destination for premium products curated for the modern lifestyle.
                  We believe every product tells a story, and we're here to help you find yours.
                </p>
              </div>
            </div>
          </div>

          {/* Feature cards */}
          <div className="grid gap-5 md:grid-cols-3">
            {features.map((f) => (
              <div
                key={f.title}
                className="rounded-2xl p-6 transition-all duration-300 hover:-translate-y-0.5"
                style={{
                  background: "linear-gradient(to bottom, rgba(255,255,255,0.06), rgba(255,255,255,0.02))",
                  border: "1px solid var(--border-default)",
                  boxShadow: "0 0 0 1px rgba(255,255,255,0.06), 0 2px 20px rgba(0,0,0,0.4)",
                }}
              >
                <h3 className="mb-2 text-base font-semibold" style={{ color: "var(--foreground)" }}>
                  {f.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--foreground-subtle)" }}>
                  {f.desc}
                </p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-10 text-center">
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-medium no-underline transition-all duration-200 hover:opacity-90 active:scale-[0.97]"
              style={{
                background: "var(--accent)",
                color: "#fff",
                boxShadow: "0 0 0 1px rgba(94,106,210,0.5), inset 0 1px 0 0 rgba(255,255,255,0.2)",
              }}
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Home
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
