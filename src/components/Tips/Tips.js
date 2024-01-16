import React from "react";
import "./Tips.css";

const Tips = ({tip}) =>{
    return (
        <div className="main-tips">
            <div className="rectangle-orange"></div>
            {/* <div className="rectangle-green"></div> */}

            
                <p className="tip">{tip}</p>

            
            {/* <div className="rectangle-green"></div> */}
            <div className="rectangle-orange"></div>


        </div>
    );
}

export default Tips;