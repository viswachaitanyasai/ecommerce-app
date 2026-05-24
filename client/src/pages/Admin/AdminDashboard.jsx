import React from "react";
import Layout from "../../components/Layouts/Layout";
import AdminMenu from "../../components/AdminMenu/AdminMenu";

const AdminDashboard = ({ children }) => {
  return (
    <Layout>
      <section className="px-4 pt-28 pb-16 md:pt-32 md:pb-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {/* Admin nav */}
          <div className="mb-10 flex justify-center">
            <AdminMenu />
          </div>

          {/* Page content */}
          {children}
        </div>
      </section>
    </Layout>
  );
};

export default AdminDashboard;
