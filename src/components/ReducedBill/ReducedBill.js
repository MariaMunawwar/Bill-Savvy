import React from "react";
import { useEffect, useState } from 'react';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode'; // Ensure jwt-decode is installed
import "./reducedbill.css"

const ReducedBill = () =>{
    const [billData, setBillData] = useState({
        projectedBill: '',
        reducedPercentage: ''
    });

    useEffect(() => {
        const fetchBillData = async () => {
            try {
                const token = localStorage.getItem("token");
                const userId = jwtDecode(token).id;

                const response = await axios.get(`http://localhost:3001/tips/${userId}`);
                setBillData({
                    projectedBill: response.data.projectedBill,
                    reducedPercentage: response.data.reducedPercentage
                });
            } catch (error) {
                console.error('Error fetching bill data:', error);
            }
        };

        fetchBillData();
    }, []);
    return (
        <div className="reducedbill">
            <div className="rectangle-white"></div>
            <div className="rectangle-green"></div>

            <h4 className="save-header">Save Upto</h4>
            <p className="save-percent">{billData.reducedPercentage}%</p>
            <p className="reduced-header"> If you carefully follow all the tips, Your monthly bill will be reduced to :</p>
            <p className="reduced-amount">Rs {billData.projectedBill}</p>
            <p className="note">Note: Actual results may slighly vary from predicted ones.</p>

            {/* <div className="rectangle-green"></div>
            <div className="rectangle-white"></div> */}


        </div>
    );
}

export default ReducedBill;