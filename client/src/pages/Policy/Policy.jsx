import React from "react";
import { Link } from "react-router-dom";
import Layout from "../../components/Layouts/Layout";

const SECTIONS = [
  {
    title: "Information We Collect",
    items: [
      "Personal information you provide (name, email, phone, address)",
      "Payment information processed securely through Braintree",
      "Order history and shopping preferences",
      "Device and browser information for analytics",
    ],
  },
  {
    title: "How We Use Your Information",
    items: [
      "To process and fulfill your orders",
      "To communicate order updates and customer support",
      "To improve our products and shopping experience",
      "To send relevant promotions (with your consent)",
    ],
  },
  {
    title: "Data Protection",
    items: [
      "All data is encrypted in transit and at rest",
      "We never share your personal data with third parties",
      "You can request data deletion at any time",
      "Secure payment processing via Braintree gateway",
    ],
  },
];

const Policy = () => {
  return (
    <Layout>
      <section className="px-4 pt-28 pb-16 md:pt-32 md:pb-24 lg:px-8">
        <div className="mx-auto max-w-4xl">
          {/* Header */}
          <div className="mb-8 text-center">
            <span className="label">Legal</span>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
              Privacy Policy
            </h2>
            <p className="mx-auto mt-2 max-w-lg text-sm" style={{ color: "var(--foreground-muted)" }}>
              We take your privacy seriously. This policy outlines how we collect, use, and protect your information.
            </p>
          </div>

          {/* Content */}
          <div className="space-y-6">
            {SECTIONS.map((section) => (
              <div
                key={section.title}
                className="rounded-2xl p-6 md:p-8"
                style={{
                  background: "linear-gradient(to bottom, rgba(255,255,255,0.06), rgba(255,255,255,0.02))",
                  border: "1px solid var(--border-default)",
                  boxShadow: "0 0 0 1px rgba(255,255,255,0.06), 0 2px 20px rgba(0,0,0,0.4)",
                }}
              >
                <h3 className="mb-4 text-base font-semibold" style={{ color: "var(--foreground)" }}>
                  {section.title}
                </h3>
                <ul className="space-y-2.5">
                  {section.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm" style={{ color: "var(--foreground-subtle)" }}>
                      <span className="mt-1 flex-shrink-0">
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Last updated */}
          <p className="mt-6 text-center text-xs" style={{ color: "var(--foreground-muted)" }}>
            Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
          </p>

          {/* CTA */}
          <div className="mt-8 text-center">
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

export default Policy;
