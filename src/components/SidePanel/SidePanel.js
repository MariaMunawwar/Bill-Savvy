import React from "react";
import "./SidePanel.css";
import Pattern from "../../Assets/Pattern.png";

const SidePanel = ({top}) => {
    return (
        <div className="mainS" style={{ top: `${top}px` }}>
        <div className="bar" id="greenbar"></div>
        <div className="bar" id="orangebar"></div>
        <h1 id="login-header">BillSavvy</h1>
        <p id="login-text">Elevate your energy efficiency with Billsavvy where smart choices lead to lower bills.</p>
        <img src={Pattern} className="Pattern"></img>
        </div>
    );
}

export default SidePanel;