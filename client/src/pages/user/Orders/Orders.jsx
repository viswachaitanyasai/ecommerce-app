import React, { useEffect, useState } from "react";
import Layout from "../../../components/Layouts/Layout";
import UserMenu from "../../../components/UserMenu/UserMenu";
import { useAuth } from "../../../context/auth";
import axios from "axios";
import moment from "moment";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [auth] = useAuth();

  const getOrders = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/auth/orders`
      );
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  return (
    <Layout>
      <section className="px-4 pt-28 pb-16 md:pt-32 md:pb-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {/* User nav */}
          <div className="mb-10 flex justify-center">
            <UserMenu />
          </div>

          {/* Header */}
          <div className="mb-8 text-center">
            <span className="label">Orders</span>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
              My Orders
            </h2>
            <p className="mt-2 text-sm" style={{ color: "var(--foreground-muted)" }}>
              {orders.length} order{orders.length !== 1 ? "s" : ""} total
            </p>
          </div>

          {orders.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16">
              <div
                className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid var(--border-default)" }}
              >
                <svg className="h-6 w-6" style={{ color: "var(--foreground-muted)" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <p className="text-sm" style={{ color: "var(--foreground-muted)" }}>No orders yet</p>
            </div>
          ) : (
            <div className="mx-auto max-w-4xl space-y-6">
              {orders.map((order, i) => (
                <div
                  key={order._id}
                  className="overflow-hidden rounded-2xl"
                  style={{
                    background: "linear-gradient(to bottom, rgba(255,255,255,0.06), rgba(255,255,255,0.02))",
                    border: "1px solid var(--border-default)",
                    boxShadow: "0 0 0 1px rgba(255,255,255,0.06), 0 2px 20px rgba(0,0,0,0.4)",
                  }}
                >
                  {/* Order header */}
                  <div
                    className="flex items-center justify-between px-5 py-4"
                    style={{ borderBottom: "1px solid var(--border-default)" }}
                  >
                    <div>
                      <p className="text-xs font-medium" style={{ color: "var(--foreground-muted)" }}>
                        Order #{i + 1}
                      </p>
                      <p className="mt-0.5 text-sm" style={{ color: "var(--foreground)" }}>
                        {moment(order?.createAt).format("MMM D, YYYY")}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span
                        className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium"
                        style={{
                          background:
                            order?.status === "deliverd"
                              ? "rgba(34,197,94,0.15)"
                              : order?.status === "cancel"
                              ? "rgba(239,68,68,0.15)"
                              : "rgba(255,255,255,0.06)",
                          color:
                            order?.status === "deliverd"
                              ? "#22c55e"
                              : order?.status === "cancel"
                              ? "#ef4444"
                              : "var(--foreground)",
                        }}
                      >
                        {order?.status}
                      </span>
                      <span
                        className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium"
                        style={{
                          background: order?.payment?.success
                            ? "rgba(34,197,94,0.15)"
                            : "rgba(239,68,68,0.15)",
                          color: order?.payment?.success ? "#22c55e" : "#ef4444",
                        }}
                      >
                        {order?.payment?.success ? "Paid" : "Failed"}
                      </span>
                    </div>
                  </div>

                  {/* Products list */}
                  <div className="divide-y divide-white/[0.04]">
                    {order?.products?.map((p) => (
                      <div key={p._id} className="flex items-center gap-4 px-5 py-4">
                        <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-xl bg-white/[0.03]">
                          <img
                            className="h-full w-full object-cover"
                            src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                            alt={p.name}
                            loading="lazy"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-medium" style={{ color: "var(--foreground)" }}>
                            {p.name}
                          </p>
                          <p className="mt-0.5 text-xs truncate" style={{ color: "var(--foreground-muted)" }}>
                            {p.description?.substring(0, 60)}
                          </p>
                        </div>
                        <p className="text-sm font-medium" style={{ color: "var(--accent)" }}>
                          Rs. {p.price}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Order footer */}
                  <div
                    className="flex items-center justify-between px-5 py-3"
                    style={{ borderTop: "1px solid var(--border-default)", background: "rgba(255,255,255,0.02)" }}
                  >
                    <p className="text-xs" style={{ color: "var(--foreground-muted)" }}>
                      {order?.products?.length} item{order?.products?.length !== 1 ? "s" : ""}
                    </p>
                    <p className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>
                      Buyer: {order?.buyer?.name}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Orders;
