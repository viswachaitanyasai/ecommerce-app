import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import moment from "moment";
import { useAuth } from "../../context/auth";
import AdminDashboard from "./AdminDashboard";
import SelectInput from "../../components/ui/SelectInput";

const notify = (msg) =>
  toast.success(msg, {
    style: { background: "#0a0a0c", color: "#ededef", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "12px" },
    iconTheme: { primary: "#5E6AD2", secondary: "#ededef" },
  });

const STATUS_OPTIONS = [
  { value: "Not Process", label: "Not Process" },
  { value: "Processing", label: "Processing" },
  { value: "Shipped", label: "Shipped" },
  { value: "deliverd", label: "Delivered" },
  { value: "cancel", label: "Cancel" },
];

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [auth] = useAuth();

  const getOrders = async () => {
    try {
      const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/auth/all-orders`);
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  const handleStatusChange = async (orderId, value) => {
    try {
      await axios.put(
        `${process.env.REACT_APP_API}/api/v1/auth/order-status/${orderId}`,
        { status: value }
      );
      notify(`Order status updated to ${value}`);
      getOrders();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AdminDashboard>
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <span className="label">Admin</span>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            All Orders
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
          <div className="overflow-hidden rounded-2xl" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid var(--border-default)" }}>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr style={{ borderBottom: "1px solid var(--border-default)" }}>
                    <th className="px-4 py-4 text-left text-xs font-medium uppercase tracking-wider md:px-5" style={{ color: "var(--foreground-muted)" }}>#</th>
                    <th className="px-4 py-4 text-left text-xs font-medium uppercase tracking-wider md:px-5" style={{ color: "var(--foreground-muted)" }}>Status</th>
                    <th className="px-4 py-4 text-left text-xs font-medium uppercase tracking-wider md:px-5" style={{ color: "var(--foreground-muted)" }}>Buyer</th>
                    <th className="hidden px-4 py-4 text-left text-xs font-medium uppercase tracking-wider md:table-cell md:px-5" style={{ color: "var(--foreground-muted)" }}>Date</th>
                    <th className="px-4 py-4 text-left text-xs font-medium uppercase tracking-wider md:px-5" style={{ color: "var(--foreground-muted)" }}>Payment</th>
                    <th className="px-4 py-4 text-right text-xs font-medium uppercase tracking-wider md:px-5" style={{ color: "var(--foreground-muted)" }}>Qty</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((o, i) => (
                    <tr
                      key={o._id}
                      style={{ borderBottom: "1px solid var(--border-default)" }}
                      className="transition-colors duration-200 hover:bg-white/[0.02]"
                    >
                      <td className="px-4 py-4 text-sm md:px-5" style={{ color: "var(--foreground-muted)" }}>{i + 1}</td>
                      <td className="px-4 py-4 md:px-5">
                        <div className="max-w-[160px]">
                          <SelectInput value={o?.status} onChange={(value) => handleStatusChange(o._id, value)} options={STATUS_OPTIONS} />
                        </div>
                      </td>
                      <td className="px-4 py-4 text-sm md:px-5" style={{ color: "var(--foreground)" }}>{o?.buyer?.name}</td>
                      <td className="hidden px-4 py-4 text-sm md:table-cell md:px-5" style={{ color: "var(--foreground-muted)" }}>
                        {moment(o?.createAt).fromNow()}
                      </td>
                      <td className="px-4 py-4 md:px-5">
                        {o?.payment?.success ? (
                          <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium" style={{ background: "rgba(34,197,94,0.15)", color: "#22c55e" }}>Paid</span>
                        ) : (
                          <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium" style={{ background: "rgba(239,68,68,0.15)", color: "#ef4444" }}>Failed</span>
                        )}
                      </td>
                      <td className="px-4 py-4 text-right text-sm md:px-5" style={{ color: "var(--foreground)" }}>{o?.products?.length}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </AdminDashboard>
  );
};

export default AdminOrders;
