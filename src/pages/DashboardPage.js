import React, { useContext } from 'react'
import SideDrawer from '../components/sidebar/Sidebar'
import { capriwaycontext } from '../context/MainContext'
import AdminDashboardPage from './AdminDashboardPage'
import DesignerDashboardPage from './DesignerDashboardPage'
import StoreDashboardPage from './StoreDashboardPage'

export default function DashboardPage() {
  const { user } = useContext(capriwaycontext)

  const isAdmin = JSON.parse(localStorage.getItem('capriwayUser')) === 'admin' ? true : false
  const isDesigner = JSON.parse(localStorage.getItem('capriwayUser')) === 'designer' ? true : false
  
  return (
    <SideDrawer>
      {isAdmin ? (
        <AdminDashboardPage />
      ) : isDesigner ? (
        <DesignerDashboardPage />
      ) : (
        <StoreDashboardPage />
      )}
    </SideDrawer>
  )
}
