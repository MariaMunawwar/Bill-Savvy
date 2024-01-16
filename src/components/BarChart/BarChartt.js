import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import {jwtDecode} from 'jwt-decode'; // Ensure jwt-decode is installed
import axios from 'axios';

const UserProfile = () => {
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    throw new Error('No token found');
                }

                const userId = jwtDecode(token).id;
                const response = await axios.get(`http://localhost:3001/dashboard/${userId}`);
                //const userData = response.data.inputData;
                if (response.data && response.data.inputData) {
                    const userData = response.data.inputData;
                    if (Array.isArray(userData) && userData.length > 0) {
                        // Transform the fetched data and update the state
                        const transformedData = transformDataForChart(userData);
                        setChartData(transformedData);
                    }

                } 

                // Transform the fetched data and update the state
                // const transformedData = transformDataForChart(userData);
                // setChartData(transformedData);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };
        // Call the fetchUserData function
        fetchUserData();
    }, []); // Empty array dependency to run the effect only once

    const transformDataForChart = (formData) => {
        const labels = Object.keys(formData[0]).filter(key => key !== '_id' && key !== 'user');
        const datasets = [
            {
                label: 'Quantity',
                backgroundColor: '#F3B140',
                borderColor: '#F3B140',
                borderWidth: 1,
                hoverBackgroundColor: '#FFD699',
                hoverBorderColor: '#FFD699',
                data: labels.map(label => {
                    const value = formData[0][label];
                    return typeof value === 'boolean' ? (value ? 1 : 0) : mapNonNumericValue(label, value);
                }),
            },
        ];

        return { labels, datasets };
    };

    const mapNonNumericValue = (label, value) => {
        // Check for specific cases and map non-numeric values
        switch (label) {
            case 'laundryFrequency':
                return mapLaundryFrequency(value);
            case 'devices':
                return mapDevices(value);
            // Add more cases for other non-numeric values if needed
            default:
                return typeof value === 'number' ? value : 0;
        }
    };

    const mapLaundryFrequency = (value) => {
        switch (value) {
            case 'More than 10 times':
                return 11;
            // Add more cases for other possibilities
            default:
                return 0;
        }
    };

    const mapDevices = (value) => {
        switch (value) {
            case 'More than 5':
                return 6;
            // Add more cases for other possibilities
            default:
                return 0;
        }
    };

   return (
        <div style={{ padding: '20px', width: '80%' }}>
            <h2>User Form Data</h2>
            {chartData ? (
                <Bar
                    data={chartData}
                    options={{
                        scales: {
                            x: {
                                type: 'category',
                                labels: chartData.labels,
                            },
                            y: {
                                beginAtZero: true,
                            },
                        },
                        plugins: {
                            legend: {
                                display: true,
                            },
                        },
                        elements: {
                            bar: {
                                barPercentage: 0.7,
                            },
                        },
                    }}
                />
            ) : (
                <div>No data to display or user not authenticated.</div>
            )}
        </div>
    );
};

export default UserProfile;