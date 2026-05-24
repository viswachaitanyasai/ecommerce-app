import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer
      style={{
        borderTop: "1px solid var(--border-default)",
        background: "var(--background-elevated)",
      }}
    >
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-4 py-8 md:flex-row md:px-8">
        {/* Copyright */}
        <p className="text-sm" style={{ color: "var(--foreground-muted)" }}>
          &copy; {new Date().getFullYear()} ShopIt. All rights reserved.
        </p>

        {/* Links */}
        <div className="flex items-center gap-6">
          <Link
            to="/about"
            className="text-sm font-medium no-underline transition-all duration-200 hover:opacity-80"
            style={{ color: "var(--foreground-subtle)" }}
          >
            About
          </Link>
          <Link
            to="/contact"
            className="text-sm font-medium no-underline transition-all duration-200 hover:opacity-80"
            style={{ color: "var(--foreground-subtle)" }}
          >
            Contact
          </Link>
          <Link
            to="/policy"
            className="text-sm font-medium no-underline transition-all duration-200 hover:opacity-80"
            style={{ color: "var(--foreground-subtle)" }}
          >
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
