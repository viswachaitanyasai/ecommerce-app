import React from 'react'
import Layout from "../../../components/Layouts/Layout"
import UserMenu from '../../../components/UserMenu/UserMenu'
import { useAuth } from '../../../context/auth'
import "./Dashboard.scss"

const Dashboard = () => {
  const [auth] = useAuth();
  return (
    <Layout>
        <div className='app__dashboard'>
          <div>
            <UserMenu/>
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

export default Dashboard