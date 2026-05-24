import React from 'react'
import Layout from '../../components/Layouts/Layout'
import AdminMenu from '../../components/AdminMenu/AdminMenu'
// import "./AdminDashboard.scss"


const AdminDashboard = ({children}) => {
  return (
    <Layout>
      <div className="app__admin-dashboard">
        <div>
          <AdminMenu />
        </div>
        <div>
          {children}
        </div>
      </div>
    </Layout>
  )
}

export default AdminDashboard