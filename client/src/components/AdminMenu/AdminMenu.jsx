import React from "react";
import { NavLink, useLocation } from "react-router-dom";

const LINKS = [
  { to: "/dashboard/admin/create-category", label: "Create Category" },
  { to: "/dashboard/admin/create-product", label: "Create Product" },
  { to: "/dashboard/admin/products", label: "Products" },
  { to: "/dashboard/admin/orders", label: "Orders" },
];

const AdminMenu = () => {
  const location = useLocation();

  return (
    <nav
      className="flex items-center justify-center gap-1 rounded-2xl p-1.5"
      style={{
        background: "rgba(255,255,255,0.04)",
        border: "1px solid var(--border-default)",
      }}
    >
      {LINKS.map((link) => {
        const isActive = location.pathname === link.to;
        return (
          <NavLink
            key={link.to}
            to={link.to}
            className="rounded-xl px-4 py-2.5 text-sm font-medium no-underline transition-all duration-200"
            style={{
              background: isActive ? "var(--accent)" : "transparent",
              color: isActive ? "#fff" : "var(--foreground-muted)",
              boxShadow: isActive
                ? "0 0 0 1px rgba(94,106,210,0.5), inset 0 1px 0 0 rgba(255,255,255,0.2)"
                : "none",
            }}
          >
            {link.label}
          </NavLink>
        );
      })}
    </nav>
  );
};

export default AdminMenu;
