import React from "react";
import { useEffect, useState } from 'react';
import axios from "axios";
import {jwtDecode} from 'jwt-decode'; // Ensure jwt-decode is installed
import Sidebar from "../../Components/Sidebar/Sidebar";
import Tips from "../../Components/Tips/Tips";
import "./TipsandReducedBill.css";
import ReducedBill from "../../Components/ReducedBill/ReducedBill";

const TipsandReducedBill = () =>{
    const [tipsData, setTipsData] = useState({
        personalizedTips: [],
        generalizedTips: [],
        projectedBill: '',
        reducedPercentage: ''
      });
    
      useEffect(() => {
        const fetchTips = async () => {
          try {
            const token = localStorage.getItem("token");
            const userId = jwtDecode(token).id;
    
            const response = await axios.get(`http://localhost:3001/tips/${userId}`);
            setTipsData(response.data);
          } catch (error) {
            console.error('Error fetching tips:', error);
          }
        };
    
        fetchTips();
      }, []);

    return (
        <>
        <Sidebar/>
        <h1 className="contactheader font-weight-bold">Energy Conservations<span> Tips For You!</span></h1>

        {/* <div className="tips-content"> */}
        {/* <Tips/>
        <Tips/>
        <Tips/>
        <Tips/> */}
        {/* </div> */}
        <div className="tips-container">
        {tipsData.personalizedTips.concat(tipsData.generalizedTips).map((tip, index) => (
          <Tips key={index} tip={tip} />
        ))}
      {/* <Tips />
      <Tips />
      <Tips />
      <Tips />

      Add more Tips components as needed */}
    </div>
        <ReducedBill/>
        
        {/* <Tips/> */}
        </>
    );
}
export default TipsandReducedBill;