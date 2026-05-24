import React, { useState, useRef, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import SearchInput from "../Form/SearchInput";
import useCategory from "../../hooks/useCategory";
import { useCart } from "../../context/cart";

/* ==========================================
   Linear-style Header
   ========================================== */
const Header = () => {
  const [auth, setAuth] = useAuth();
  const [cart] = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [catOpen, setCatOpen] = useState(false);
  const categories = useCategory();
  const catRef = useRef(null);

  // Close category dropdown on outside click
  useEffect(() => {
    const handleClick = (e) => {
      if (catRef.current && !catRef.current.contains(e.target)) setCatOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleLogOut = () => {
    setAuth({ ...auth, user: null, token: "" });
    localStorage.removeItem("auth");
    toast.success("Logged out", {
      style: { background: "#0a0a0c", color: "#ededef", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "12px" },
      iconTheme: { primary: "#5E6AD2", secondary: "#ededef" },
    });
  };

  const closeMobile = () => setIsOpen(false);

  return (
    <>
      <header
        className="fixed left-0 top-0 z-50 w-full"
        style={{
          background: "rgba(5,5,6,0.85)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderBottom: "1px solid var(--border-default)",
        }}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 lg:px-8">
          {/* Brand */}
          <NavLink to="/" className="flex items-center gap-2.5 no-underline" onClick={closeMobile}>
            <div
              className="flex h-8 w-8 items-center justify-center rounded-lg"
              style={{ background: "var(--accent)" }}
            >
              <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <span className="text-base font-semibold" style={{ color: "var(--foreground)" }}>
              ShopIt
            </span>
          </NavLink>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-6 md:flex">
            <SearchInput />

            <NavLink
              to="/"
              end
              className="text-sm font-medium no-underline transition-all duration-200 hover:opacity-80"
              style={({ isActive }) => ({
                color: isActive ? "var(--accent)" : "var(--foreground-subtle)",
              })}
            >
              Home
            </NavLink>

            {/* Categories dropdown */}
            <div ref={catRef} className="relative">
              <button
                onClick={() => setCatOpen(!catOpen)}
                className="flex items-center gap-1 text-sm font-medium transition-all duration-200 hover:opacity-80"
                style={{ color: "var(--foreground-subtle)" }}
              >
                Categories
                <svg
                  className={`h-3 w-3 transition-transform duration-200 ${catOpen ? "rotate-180" : ""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {catOpen && (
                <div
                  className="absolute right-0 top-full z-20 mt-2 w-48 overflow-hidden rounded-xl p-1.5 shadow-xl backdrop-blur-xl"
                  style={{
                    background: "rgba(10,10,12,0.95)",
                    border: "1px solid var(--border-default)",
                    boxShadow: "0 0 0 1px rgba(255,255,255,0.06), 0 8px 40px rgba(0,0,0,0.5)",
                  }}
                >
                  {categories?.length > 0 ? (
                    categories.map((c) => (
                      <Link
                        key={c._id}
                        to={`/category/${c.slug}`}
                        className="block rounded-lg px-3 py-2 text-sm no-underline transition-all duration-200 hover:bg-white/[0.06]"
                        style={{ color: "var(--foreground)" }}
                        onClick={() => setCatOpen(false)}
                      >
                        {c.name}
                      </Link>
                    ))
                  ) : (
                    <p className="px-3 py-2 text-sm" style={{ color: "var(--foreground-muted)" }}>
                      No categories
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Auth links */}
            {!auth?.user ? (
              <>
                <NavLink
                  to="/register"
                  className="text-sm font-medium no-underline transition-all duration-200 hover:opacity-80"
                  style={({ isActive }) => ({
                    color: isActive ? "var(--accent)" : "var(--foreground-subtle)",
                  })}
                >
                  Register
                </NavLink>
                <NavLink
                  to="/login"
                  className="text-sm font-medium no-underline transition-all duration-200 hover:opacity-80"
                  style={({ isActive }) => ({
                    color: isActive ? "var(--accent)" : "var(--foreground-subtle)",
                  })}
                >
                  Log In
                </NavLink>
              </>
            ) : (
              <>
                <NavLink
                  to={`/dashboard/${auth?.user?.role === 1 ? "admin/create-category" : "user/profile"}`}
                  className="text-sm font-medium no-underline transition-all duration-200 hover:opacity-80"
                  style={({ isActive }) => ({
                    color: isActive ? "var(--accent)" : "var(--foreground-subtle)",
                  })}
                >
                  Dashboard
                </NavLink>
                <NavLink
                  to="/login"
                  onClick={handleLogOut}
                  className="text-sm font-medium no-underline transition-all duration-200 hover:opacity-80"
                  style={{ color: "var(--foreground-subtle)" }}
                >
                  Log Out
                </NavLink>
              </>
            )}

            {/* Cart */}
            <NavLink
              to="/cart"
              className="relative flex items-center gap-1 text-sm font-medium no-underline transition-all duration-200 hover:opacity-80"
              style={({ isActive }) => ({
                color: isActive ? "var(--accent)" : "var(--foreground-subtle)",
              })}
            >
              Cart
              {cart?.length > 0 && (
                <span
                  className="flex h-5 min-w-[20px] items-center justify-center rounded-full px-1.5 text-[11px] font-semibold leading-none"
                  style={{
                    background: "var(--accent)",
                    color: "#fff",
                    boxShadow: "0 0 0 1px rgba(94,106,210,0.5), inset 0 1px 0 0 rgba(255,255,255,0.2)",
                  }}
                >
                  {cart.length}
                </span>
              )}
            </NavLink>
          </nav>

          {/* Mobile hamburger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="relative flex h-9 w-9 items-center justify-center rounded-xl md:hidden"
            style={{ color: "var(--foreground)" }}
            aria-label="Toggle menu"
          >
            <div className="relative flex h-4 w-5 flex-col justify-center gap-[5px]">
              <span
                className="block h-[2px] w-full rounded-full transition-all duration-300"
                style={{
                  background: "var(--foreground)",
                  transform: isOpen ? "rotate(45deg) translate(2.5px, 2.5px)" : "none",
                }}
              />
              <span
                className="block h-[2px] w-full rounded-full transition-all duration-300"
                style={{
                  background: "var(--foreground)",
                  opacity: isOpen ? 0 : 1,
                }}
              />
              <span
                className="block h-[2px] w-full rounded-full transition-all duration-300"
                style={{
                  background: "var(--foreground)",
                  transform: isOpen ? "rotate(-45deg) translate(2.5px, -2.5px)" : "none",
                }}
              />
            </div>
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      <>
        {/* Backdrop */}
        <div
          className={`fixed inset-0 z-40 transition-opacity duration-300 md:hidden ${
            isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
          }`}
          style={{ background: "rgba(0,0,0,0.6)" }}
          onClick={closeMobile}
        />

        {/* Drawer */}
        <div
          className={`fixed bottom-0 right-0 top-0 z-50 w-72 transform overflow-y-auto transition-transform duration-300 ease-out md:hidden`}
          style={{
            background: "rgba(10,10,12,0.98)",
            borderLeft: "1px solid var(--border-default)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            transform: isOpen ? "translateX(0)" : "translateX(100%)",
          }}
        >
          <div className="flex flex-col gap-1 p-6 pt-20">
            <SearchInput />

            <div className="mt-4 flex flex-col gap-1">
              <MobileLink to="/" onClick={closeMobile}>Home</MobileLink>

              {categories?.map((c) => (
                <MobileLink key={c._id} to={`/category/${c.slug}`} onClick={closeMobile}>
                  {c.name}
                </MobileLink>
              ))}

              <hr style={{ borderColor: "var(--border-default)", margin: "8px 0" }} />

              {!auth?.user ? (
                <>
                  <MobileLink to="/register" onClick={closeMobile}>Register</MobileLink>
                  <MobileLink to="/login" onClick={closeMobile}>Log In</MobileLink>
                </>
              ) : (
                <>
                  <MobileLink
                    to={`/dashboard/${auth?.user?.role === 1 ? "admin/create-category" : "user/profile"}`}
                    onClick={closeMobile}
                  >
                    Dashboard
                  </MobileLink>
                  <MobileLink to="/login" onClick={() => { handleLogOut(); closeMobile(); }}>
                    Log Out
                  </MobileLink>
                </>
              )}

              <hr style={{ borderColor: "var(--border-default)", margin: "8px 0" }} />

              <MobileLink to="/cart" onClick={closeMobile}>
                Cart{cart?.length > 0 ? ` (${cart.length})` : ""}
              </MobileLink>
            </div>
          </div>
        </div>
      </>
    </>
  );
};

/* Small helper for mobile drawer links */
const MobileLink = ({ to, onClick, children }) => (
  <NavLink
    to={to}
    onClick={onClick}
    className="rounded-lg px-3 py-2.5 text-sm font-medium no-underline transition-all duration-200 hover:bg-white/[0.06]"
    style={({ isActive }) => ({
      color: isActive ? "var(--accent)" : "var(--foreground)",
      background: isActive ? "rgba(94,106,210,0.1)" : "transparent",
    })}
  >
    {children}
  </NavLink>
);

export default Header;
