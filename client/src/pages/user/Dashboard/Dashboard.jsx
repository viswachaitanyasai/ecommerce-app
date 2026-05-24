import React from "react";
import Layout from "../../../components/Layouts/Layout";
import UserMenu from "../../../components/UserMenu/UserMenu";
import { useAuth } from "../../../context/auth";

const Dashboard = () => {
  const [auth] = useAuth();
  const user = auth?.user;

  const details = [
    { label: "Name", value: user?.name },
    { label: "Email", value: user?.email },
    { label: "Phone", value: user?.phone },
    { label: "Address", value: user?.address },
  ];

  return (
    <Layout>
      <section className="px-4 pt-28 pb-16 md:pt-32 md:pb-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {/* User nav */}
          <div className="mb-10 flex justify-center">
            <UserMenu />
          </div>

          {/* Header */}
          <div className="mb-10 text-center">
            <span className="label">Dashboard</span>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
              Welcome back{user?.name ? `, ${user.name}` : ""}
            </h2>
            <p className="mt-2 text-sm" style={{ color: "var(--foreground-muted)" }}>
              Your account overview
            </p>
          </div>

          {/* Info cards */}
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-4 sm:grid-cols-2">
            {details.map((d) => (
              <div
                key={d.label}
                className="rounded-2xl p-5 transition-all duration-300"
                style={{
                  background: "linear-gradient(to bottom, rgba(255,255,255,0.06), rgba(255,255,255,0.02))",
                  border: "1px solid var(--border-default)",
                  boxShadow: "0 0 0 1px rgba(255,255,255,0.06), 0 2px 20px rgba(0,0,0,0.4)",
                }}
              >
                <p
                  className="mb-1 text-xs font-medium uppercase tracking-wider"
                  style={{ color: "var(--foreground-muted)" }}
                >
                  {d.label}
                </p>
                <p className="text-base font-medium" style={{ color: "var(--foreground)" }}>
                  {d.value || (
                    <span style={{ color: "var(--foreground-muted)" }}>Not set</span>
                  )}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Dashboard;
