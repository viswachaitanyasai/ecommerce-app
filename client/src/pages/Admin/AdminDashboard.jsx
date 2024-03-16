import React from 'react'
import Layout from '../../components/Layouts/Layout'
import AdminMenu from '../../components/AdminMenu/AdminMenu'
import "./AdminDashboard.scss"
import { useAuth } from '../../context/auth'


const AdminDashboars = () => {
  const [auth] = useAuth();
  return (
    <Layout>
      <div className="app__admin-dashboard">
        <div>
          <AdminMenu />
        </div>
        <div>
          <h1>{auth?.user?.name}</h1>
          <h1>{auth?.user?.email}</h1>
          <h1>{auth?.user?.phone}</h1>
        </div>
      </div>
    </Layout>
  )
}

export default AdminDashboars