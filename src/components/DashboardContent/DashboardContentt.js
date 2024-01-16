import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode'; // Ensure jwt-decode is installed
import {
  BsFillArchiveFill,
  BsFillGrid3X3GapFill,
  BsPeopleFill,
  BsFillBellFill
} from 'react-icons/bs';
import { KingBed, People, AcUnit, Tv, WbIncandescent, EnergySavingsLeaf, WbSunny, LocalLaundryService, DevicesOther } from '@mui/icons-material';
import { CssBaseline, Container, Box, Hidden, Grid, Typography } from '@mui/material';
import DashboardCard from '../DashboardCard/DashboardCard';
import FeedbackForm from '../FeedbackForm/FeedbackForm';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from 'chart.js';
import {Bar} from 'react-chartjs-2';
import BarChart from '../BarChart/BarChart';
ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
)



function Dashboard() {
  //const [userData, setUserData] = useState({
    //username: 'Loading...',
    //email: 'Loading...'
  //});
    const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        const userId = jwtDecode(token).id;

        const response = await axios.get(`http://localhost:3001/dashboard/${userId}`);
        //setUserData(response.data.inputData);
        setUserData({
          //username: response.data.username,
          //email: response.data.signupData.email
          bedrooms: response.data.inputData.bedrooms,
          hasAC: response.data.inputData.hasAC,
          hasTV: response.data.inputData.hasTV,
          numberOfFans: response.data.inputData.numberOfFans,
          usesEnergyEfficientAppliances: response.data.inputData.usesEnergyEfficientAppliances,
          usesRenewableEnergy: response.data.inputData.usesRenewableEnergy,
          washingMachineUsage: response.data.inputData.washingMachineUsage,
          numberOfElectronicDevices: response.data.inputData.numberOfElectronicDevices,

        });
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  // Map the user data to card data
  const cardData = userData ? [
    { color: '#CDD583', icon: <KingBed />, title: 'No of Bedrooms', data: userData.bedrooms },
    
    { color: '#E1EEC7', icon: <AcUnit />, title: 'Availability of AC', data: userData.hasAC },
    { color: '#F8F8F8', icon: <Tv />, title: 'Availability of Television', data: userData.hasTV },
    { color: '#F3B140', icon: <WbIncandescent />, title: 'No of Ceiling Fans', data: userData.numberOfFans },
    { color: '#CDD583', icon: <EnergySavingsLeaf />, title: 'Energy Efficient Appliances', data: userData.usesEnergyEfficientAppliances },
    { color: '#E1EEC7', icon: <WbSunny />, title: 'Renewable Energy Sources', data: userData.usesRenewableEnergy },
    { color: '#F8F8F8', icon: <LocalLaundryService />, title: 'Use of Washing Machine', data: userData.washingMachineUsage },
    { color: '#F3B140', icon: <DevicesOther />, title: 'No of Electronic Devices', data: userData.numberOfElectronicDevices },
  ] : [];


  return (
    <main className='main-container'>
      <div className='main-title'>
        <h3>BILLSAVVY DASHBOARD</h3>
      </div>
      <div className='input-data'>
        <Grid container spacing={3}>
          {cardData.map(({ color, icon, title, data }, index) => (
            <Grid item key={index} xs={6} md={4} lg={3}>
              <DashboardCard color={color} icon={icon} title={title} data={data} />
            </Grid>
          ))}
        </Grid>
      </div>
      <div>
        <BarChart/>
      </div>
      <div>
        <FeedbackForm/>
      </div>
    </main>
  );
}

export default Dashboard;