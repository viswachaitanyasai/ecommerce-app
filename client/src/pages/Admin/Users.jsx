import React from "react";
import AdminDashboard from "./AdminDashboard";

const Users = () => {
  return (
    <AdminDashboard>
      <div className="mx-auto max-w-2xl text-center">
        <span className="label">Admin</span>
        <h2 className="mt-2 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
          All Users
        </h2>
        <p className="mt-2 text-sm" style={{ color: "var(--foreground-muted)" }}>
          User management
        </p>
      </div>
    </AdminDashboard>
  );
};

export default Users;
