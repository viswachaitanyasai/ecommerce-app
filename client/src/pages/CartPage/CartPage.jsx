import React, { useState, useEffect } from "react";
import Layout from "../../components/Layouts/Layout";
import { useAuth } from "../../context/auth";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/cart";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";
import toast from "react-hot-toast";

/* ==========================================
   CartPage — Linear / Modern Design
   ========================================== */
const CartPage = () => {
  const [auth] = useAuth();
  const [cart, setCart] = useCart();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Quantity map: { productId: number }
  const [quantities, setQuantities] = useState({});

  // Initialise quantities from cart on mount & when cart changes
  useEffect(() => {
    const qtyMap = {};
    cart.forEach((item) => {
      qtyMap[item._id] = (qtyMap[item._id] || 0) + 1;
    });
    setQuantities(qtyMap);
  }, [cart.length]);

  // ---- Derived data ----
  const uniqueItems = cart.reduce((acc, item) => {
    if (!acc.find((i) => i._id === item._id)) acc.push(item);
    return acc;
  }, []);

  const cartQuantity = Object.values(quantities).reduce((a, b) => a + b, 0);

  const subtotal = uniqueItems.reduce(
    (sum, item) => sum + item.price * (quantities[item._id] || 0),
    0
  );

  // ---- Helpers ----
  const notify = (msg) =>
    toast.success(msg, {
      style: {
        background: "#0a0a0c",
        color: "#ededef",
        border: "1px solid rgba(255,255,255,0.06)",
        borderRadius: "12px",
      },
      iconTheme: { primary: "#5E6AD2", secondary: "#ededef" },
    });

  // ---- Handlers ----
  const updateQty = (pid, delta) => {
    setQuantities((prev) => {
      const cur = prev[pid] || 0;
      const next = cur + delta;
      if (next <= 0) return prev; // handled by remove
      return { ...prev, [pid]: next };
    });
  };

  const removeCartItem = (pid) => {
    const updated = cart.filter((item) => item._id !== pid);
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
    setQuantities((prev) => {
      const copy = { ...prev };
      delete copy[pid];
      return copy;
    });
    notify("Item removed from cart");
  };

  // ---- Braintree ----
  const getToken = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/braintree/token`
      );
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getToken();
    // eslint-disable-next-line
  }, [auth?.token]);

  const handlePayment = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      // Expand unique items with quantities into flat array (backward-compatible format)
      const flatCart = uniqueItems
        .filter((item) => (quantities[item._id] || 0) > 0)
        .flatMap((item) =>
          Array.from({ length: quantities[item._id] }, () => ({ ...item }))
        );
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/product/braintree/payment`,
        { nonce, cart: flatCart }
      );
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      navigate("/dashboard/user/orders");
      notify("Payment Completed Successfully");
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <Layout>
      <section className="px-4 pt-28 pb-16 md:pt-32 md:pb-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <div className="mb-10 text-center md:text-left">
            <span className="label">Cart</span>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">
              <span className="gradient-text">Shopping Bag</span>
            </h1>
            {cartQuantity > 0 ? (
              <p className="mt-2" style={{ color: "var(--foreground-muted)" }}>
                You have{" "}
                <span className="font-semibold text-foreground">
                  {cartQuantity}
                </span>{" "}
                item{cartQuantity !== 1 ? "s" : ""} in your bag
              </p>
            ) : (
              <p className="mt-2" style={{ color: "var(--foreground-muted)" }}>
                Your bag is empty
              </p>
            )}
          </div>

          {cartQuantity === 0 ? (
            /* ==================== EMPTY STATE ==================== */
            <div className="flex flex-col items-center justify-center py-20">
              <div
                className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid var(--border-default)",
                }}
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
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-foreground">
                Your bag is empty
              </h3>
              <p
                className="mt-1 text-sm"
                style={{ color: "var(--foreground-muted)" }}
              >
                Discover our collection and add items you love.
              </p>
              <button
                onClick={() => navigate("/")}
                className="mt-4 rounded-lg px-6 py-2.5 text-sm font-medium transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                style={{
                  background: "var(--accent)",
                  color: "#fff",
                  boxShadow:
                    "0 0 0 1px rgba(94,106,210,0.5), 0 2px 8px rgba(94,106,210,0.25), inset 0 1px 0 0 rgba(255,255,255,0.2)",
                }}
              >
                Browse Products
              </button>
            </div>
          ) : (
            /* ==================== MAIN LAYOUT ==================== */
            <div className="flex flex-col gap-8 lg:flex-row">
              {/* ---------- Cart Items ---------- */}
              <div className="flex-1 space-y-4">
                {uniqueItems.map((item) => {
                  const qty = quantities[item._id] || 0;
                  return (
                    <div
                      key={item._id}
                      className="group flex flex-col overflow-hidden rounded-2xl sm:flex-row"
                      style={{
                        background:
                          "linear-gradient(to bottom, rgba(255,255,255,0.06), rgba(255,255,255,0.02))",
                        border: "1px solid var(--border-default)",
                        boxShadow:
                          "0 0 0 1px rgba(255,255,255,0.06), 0 2px 20px rgba(0,0,0,0.4), 0 0 40px rgba(0,0,0,0.2)",
                      }}
                    >
                      {/* Product image */}
                      <div
                        className="flex shrink-0 cursor-pointer items-center justify-center sm:w-40"
                        onClick={() => navigate(`/product/${item.slug}`)}
                      >
                        <img
                          className="h-32 w-full object-cover sm:h-full sm:w-40"
                          src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${item._id}`}
                          alt={item.name}
                          loading="lazy"
                        />
                      </div>

                      {/* Details */}
                      <div className="flex flex-1 flex-col justify-between gap-3 p-4 md:p-5">
                        <div className="flex items-start justify-between gap-4">
                          <div
                            className="cursor-pointer"
                            onClick={() => navigate(`/product/${item.slug}`)}
                          >
                            <h3 className="text-base font-semibold text-foreground md:text-lg line-clamp-1">
                              {item.name}
                            </h3>
                            <p
                              className="mt-0.5 text-sm"
                              style={{ color: "var(--foreground-muted)" }}
                            >
                              Rs. {item.price} each
                            </p>
                          </div>
                          <span className="shrink-0 text-lg font-semibold text-foreground">
                            Rs. {item.price * qty}
                          </span>
                        </div>

                        {/* Quantity controls */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <span
                              className="text-xs font-medium uppercase tracking-wider"
                              style={{ color: "var(--foreground-subtle)" }}
                            >
                              Qty
                            </span>
                            <div
                              className="flex items-center overflow-hidden rounded-lg border"
                              style={{ borderColor: "var(--border-default)" }}
                            >
                              <button
                                onClick={() => {
                                  if (qty <= 1) {
                                    removeCartItem(item._id);
                                    return;
                                  }
                                  updateQty(item._id, -1);
                                }}
                                className="flex h-8 w-8 items-center justify-center text-sm transition-colors duration-150 hover:bg-white/[0.08]"
                                style={{ color: "var(--foreground-muted)" }}
                              >
                                −
                              </button>
                              <span
                                className="flex h-8 w-10 items-center justify-center text-sm font-medium text-foreground"
                                style={{
                                  borderLeft: "1px solid var(--border-default)",
                                  borderRight:
                                    "1px solid var(--border-default)",
                                }}
                              >
                                {qty}
                              </span>
                              <button
                                onClick={() => updateQty(item._id, 1)}
                                className="flex h-8 w-8 items-center justify-center text-sm transition-colors duration-150 hover:bg-white/[0.08]"
                                style={{ color: "var(--foreground-muted)" }}
                              >
                                +
                              </button>
                            </div>
                          </div>

                          {/* Remove */}
                          <button
                            onClick={() => removeCartItem(item._id)}
                            className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all duration-200 hover:bg-white/[0.08]"
                            style={{ color: "var(--foreground-muted)" }}
                          >
                            <svg
                              className="h-3.5 w-3.5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={2}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* ---------- Order Summary Sidebar ---------- */}
              <div className="w-full shrink-0 lg:w-96">
                <div
                  className="sticky top-28 rounded-2xl p-6 md:p-8"
                  style={{
                    background:
                      "linear-gradient(to bottom, rgba(255,255,255,0.06), rgba(255,255,255,0.02))",
                    border: "1px solid var(--border-default)",
                    boxShadow:
                      "0 0 0 1px rgba(255,255,255,0.06), 0 2px 20px rgba(0,0,0,0.4), 0 0 40px rgba(0,0,0,0.2)",
                  }}
                >
                  <h2 className="text-xl font-semibold text-foreground">
                    Order Summary
                  </h2>
                  <p
                    className="mt-1 text-xs font-medium uppercase tracking-widest"
                    style={{ color: "var(--foreground-muted)" }}
                  >
                    {cartQuantity} item{cartQuantity !== 1 ? "s" : ""}
                  </p>

                  <div className="mt-6 space-y-3">
                    <div className="flex justify-between text-sm">
                      <span style={{ color: "var(--foreground-muted)" }}>
                        Subtotal
                      </span>
                      <span className="font-medium text-foreground">
                        Rs. {subtotal}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span style={{ color: "var(--foreground-muted)" }}>
                        Shipping
                      </span>
                      <span className="text-sm" style={{ color: "var(--accent)" }}>
                        Free
                      </span>
                    </div>
                    <hr style={{ borderColor: "var(--border-default)" }} />
                    <div className="flex justify-between text-base">
                      <span className="font-semibold text-foreground">
                        Total
                      </span>
                      <span className="text-xl font-semibold text-foreground">
                        Rs. {subtotal}
                      </span>
                    </div>
                  </div>

                  {/* Address Section */}
                  <div className="mt-8">
                    <h3
                      className="mb-2 text-xs font-medium uppercase tracking-widest"
                      style={{ color: "var(--foreground-muted)" }}
                    >
                      Delivery Address
                    </h3>

                    {auth?.user?.address ? (
                      <div
                        className="rounded-xl p-4 text-sm leading-relaxed"
                        style={{
                          background: "rgba(255,255,255,0.03)",
                          border: "1px solid var(--border-default)",
                          color: "var(--foreground)",
                        }}
                      >
                        {auth.user.address}
                      </div>
                    ) : (
                      <p
                        className="text-sm"
                        style={{ color: "var(--foreground-subtle)" }}
                      >
                        No address set.
                      </p>
                    )}

                    <button
                      onClick={() => navigate("/dashboard/user/profile")}
                      className="mt-3 w-full rounded-lg py-2.5 text-sm font-medium transition-all duration-200 hover:bg-white/[0.08]"
                      style={{
                        background: "rgba(255,255,255,0.05)",
                        color: "var(--accent)",
                        border: "1px solid var(--border-default)",
                      }}
                    >
                      {auth?.user?.address
                        ? "Update Address"
                        : auth?.token
                        ? "Add Address"
                        : "Login to continue"}
                    </button>
                  </div>

                  {/* Braintree Payment */}
                  {clientToken && cartQuantity > 0 && (
                    <div className="mt-6">
                      <div
                        className="mb-4 overflow-hidden rounded-xl"
                        style={{
                          background: "rgba(255,255,255,0.03)",
                          border: "1px solid var(--border-default)",
                        }}
                      >
                        <DropIn
                          options={{
                            authorization: clientToken,
                            paypal: { flow: "vault" },
                          }}
                          onInstance={(inst) => setInstance(inst)}
                        />
                      </div>
                      <button
                        onClick={handlePayment}
                        disabled={
                          loading || !instance || !auth?.user?.address
                        }
                        className="group relative w-full overflow-hidden rounded-lg py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-50 active:scale-[0.98]"
                        style={{
                          background: "var(--accent)",
                          boxShadow:
                            "0 0 0 1px rgba(94,106,210,0.5), 0 4px 12px rgba(94,106,210,0.3), inset 0 1px 0 0 rgba(255,255,255,0.2)",
                        }}
                      >
                        <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                        <span className="relative flex items-center justify-center gap-2">
                          {loading ? (
                            <>
                              <svg
                                className="h-4 w-4 animate-spin"
                                viewBox="0 0 24 24"
                                fill="none"
                              >
                                <circle
                                  className="opacity-25"
                                  cx="12"
                                  cy="12"
                                  r="10"
                                  stroke="currentColor"
                                  strokeWidth="4"
                                />
                                <path
                                  className="opacity-75"
                                  fill="currentColor"
                                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                                />
                              </svg>
                              Processing...
                            </>
                          ) : (
                            "Make Payment"
                          )}
                        </span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default CartPage;
