import { useState } from 'react'
import './Dashboard.css'
import DashboardHeader from '../../Components/DashboardHeader/DashboardHeader';
import DashboardContent from "../../Components/DashboardContent/DashboardContent";
import SideNavbar from '../../Components/SideNavbar/SideNavbar';


function Dashboard() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }

  return (
    <div className='grid-container'>
      <DashboardHeader OpenSidebar={OpenSidebar}/>
      <SideNavbar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar}/>
      <DashboardContent />
    </div>
  )
}

export default Dashboard;