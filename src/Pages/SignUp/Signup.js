import React from "react";
import SidePanel from "../../Components/SidePanel/SidePanel.js";
import SignupForm from "../../Components/SignupForm/SignupForm.js"
import "./signup.module.css";
import useMediaQuery from '@mui/material/useMediaQuery';

const Signup = () => {
    const isScreenWideEnough = useMediaQuery('(min-width:768px)');
    return (
        <div className="main-signup-div">
            <div className="signup-div">
                {isScreenWideEnough && (
                    <SidePanel top="-95" />
                )}
                <SignupForm />
            </div>
        </div>
    );
}

export default Signup;