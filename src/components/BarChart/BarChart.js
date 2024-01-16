import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { BsBarChartSteps } from 'react-icons/bs';
import './barchart.css';

const BarChart = () => {
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        const dummyData = [
            {
                _id: 'dummyId',
                user: 'dummyUserId',
                bedrooms: 8,
                people: 10,
                ac: true, // Converted to boolean
                television: false, // Converted to boolean
                fans: 8,
                efficientAppliances: false, // Converted to boolean
                renewableEnergy: false, // Converted to boolean
                laundryFrequency: 'More than 10 times',
                devices: 'More than 5',
            },
        ];

        const transformedData = transformDataForChart(dummyData);
        setChartData(transformedData);
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
        <div className='barchart' >
                   <h1 className="barchartheader">Consumption<span> Trends</span></h1>
                    {chartData && chartData.labels ? (
                        <div>
                            <Bar
                                data={chartData}
                                options={{
                                    scales: {
                                        x: {
                                            type: 'category',
                                            labels: chartData.labels,
                                            ticks: {
                                                font: {
                                                    weight: 'bold',
                                                },
                                            },
                                        },
                                        y: {
                                            beginAtZero: true,
                                            ticks: {
                                                font: {
                                                    weight: 'bold',
                                                },
                                            },
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
                        </div>
            ) : (
                <div>Loading...</div>
            )}
        </div>
    );
};

export default BarChart;