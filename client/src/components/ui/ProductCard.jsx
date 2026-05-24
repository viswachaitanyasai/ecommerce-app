import React from "react";
import SpotlightCard from "./SpotlightCard";

/**
 * ProductCard — A consistent product card used across the app.
 *
 * Features:
 * - SpotlightCard mouse-tracking effect
 * - Glass gradient surface with multi-layer shadows
 * - Image with hover zoom and bottom gradient fade
 * - Product name, description, price
 * - Accent "Add to Cart" button with cart icon
 *
 * Props:
 *   product       — Product object { _id, name, price, description, slug }
 *   onAddToCart   — (product) => void
 *   onNavigate    — (slug) => void
 */
const ProductCard = ({ product, onAddToCart, onNavigate, compact = false }) => {
  const { _id, name, price, description, slug } = product;

  return (
    <SpotlightCard
      className="group flex h-full flex-col overflow-hidden rounded-2xl transition-all duration-300"
      style={{
        background: "linear-gradient(to bottom, rgba(255,255,255,0.08), rgba(255,255,255,0.02))",
        border: "1px solid var(--border-default)",
        boxShadow: "0 0 0 1px rgba(255,255,255,0.06), 0 2px 20px rgba(0,0,0,0.4), 0 0 40px rgba(0,0,0,0.2)",
        transitionTimingFunction: "var(--ease-expo-out)",
      }}
    >
      <div
        className="flex h-full flex-col transition-all duration-300 group-hover:-translate-y-1"
        style={{ transitionTimingFunction: "var(--ease-expo-out)" }}
      >
        {/* Image */}
        <div
          className="relative flex items-center justify-center overflow-hidden cursor-pointer"
          onClick={() => onNavigate(slug)}
        >
          <img
            className={`w-full object-cover transition-transform duration-500 group-hover:scale-105 ${compact ? "h-36" : "h-48 md:h-56"}`}
            src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${_id}`}
            alt={name}
            loading="lazy"
          />
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#050506] to-transparent" />
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col justify-between gap-3 p-4 md:p-5">
          <div className="cursor-pointer" onClick={() => onNavigate(slug)}>
            <h3 className={`font-semibold text-foreground line-clamp-1 ${compact ? "text-sm" : "text-base md:text-lg"}`}>
              {name}
            </h3>
            <p className={`mt-1 text-sm line-clamp-2 ${compact ? "text-xs" : ""}`} style={{ color: "var(--foreground-muted)" }}>
              {description ? `${description.substring(0, compact ? 30 : 40)}...` : "Premium quality product"}
            </p>
          </div>

          <div className="flex items-center justify-between gap-3">
            <span className={`font-semibold text-foreground ${compact ? "text-base" : "text-lg md:text-xl"}`}>
              Rs. {price}
            </span>
            <button
              onClick={() => onAddToCart(product)}
              className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
              style={{
                background: "var(--accent)",
                color: "#fff",
                boxShadow: "0 0 0 1px rgba(94,106,210,0.5), 0 2px 8px rgba(94,106,210,0.25), inset 0 1px 0 0 rgba(255,255,255,0.2)",
              }}
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
              </svg>
              Add
            </button>
          </div>
        </div>
      </div>
    </SpotlightCard>
  );
};

export default ProductCard;
