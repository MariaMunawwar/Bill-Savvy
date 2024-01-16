import React from "react";
import { useState } from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import "./signupform.css";
import {
    Button,
    TextField,
    InputAdornment,
    Icon, IconButton,
} from "@mui/material";
import PersonSharpIcon from '@mui/icons-material/PersonSharp';
import LockSharpIcon from '@mui/icons-material/LockSharp';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CallSharpIcon from '@mui/icons-material/CallSharp';
import MailSharpIcon from '@mui/icons-material/MailSharp';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import FmdGoodSharpIcon from '@mui/icons-material/FmdGoodSharp';

const SignUpForm = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [address, setAddress] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const handleShowPasswordClick = () => {
        setShowPassword(!showPassword);
    };

    const handleSignup = async (e) => {
        try {
            e.preventDefault();
            const response = await axios.post("http://localhost:3001/signup/signup/", {
                username,
                email,
                password,
                phoneNumber,
                address,
                dateOfBirth,
            });

            console.log("Signup response:", response); //log the entire response object

            // Check if response and data property exist
            if (response && response.data) {
                // Handle success, maybe show a success message or redirect to login
                console.log("Signup successful:", response.data);
                setSuccessMessage("Registration successful!");
                setErrorMessage(""); // clear any previous error messages
            } else {
                // Handle error, display error message, etc.
                console.error("Signup failed: Response or data property is undefined");
                setErrorMessage("Error during signup. Please try again."); // Provide a generic error message
            }
        } catch (error) {
            // Handle error, display error message, etc.
            console.error("Signup failed:", error);
            if (error.response && error.response.data) {
                // Set the error message received from the backend
                setErrorMessage(error.response.data.message);
            } else {
                // Provide a generic error message if the structure is unexpected
                setErrorMessage("Error during signup. Please try again.");
    }
        }

    };

    return (
        <div className="signupformdiv">
            <div className="signupform">
                <h4 id="signup-header">Register to BillSavvy!</h4>
                <form  >
                    <TextField
                        className="rectangleTextfield"
                        color="success"
                        name="Enter Name"
                        label="Enter Name"
                        size="medium"
                        required={true}
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        sx={{
                            '@media (max-width: 768px)': {
                                width: '80vw', // Adjust the width for smaller screens
                            },
                            '@media (min-width: 769px) and (max-width: 1023px)': {
                                width: '30vw', // Adjust the width for medium screens
                            },
                            '@media (min-width: 1024px)': {
                                width: '37vw',  // Default width for larger screens
                            },
                        }}
                        variant="filled"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <PersonSharpIcon />
                                </InputAdornment>
                            ),
                        }}
                    />

                    <TextField
                        className="signupChild1"
                        color="success"
                        name=" Enter Contact Number"
                        label="Enter Contact Number"
                        size="medium"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        disabled={false}
                        sx={{
                            '@media (max-width: 768px)': {
                                width: '80vw', // Adjust the width for smaller screens
                            },
                            '@media (min-width: 769px) and (max-width: 1023px)': {
                                width: '30vw', // Adjust the width for medium screens
                            },
                            '@media (min-width: 1024px)': {
                                width: '37vw',  // Default width for larger screens
                            },
                        }}
                        variant="filled"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <CallSharpIcon />
                                </InputAdornment>
                            ),
                        }}
                    />

                    <TextField
                        className="signupChild2"
                        color="success"
                        name=" Enter Email Address"
                        label="Enter Email Address"
                        size="medium"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        sx={{
                            '@media (max-width: 768px)': {
                                width: '80vw', // Adjust the width for smaller screens
                            },
                            '@media (min-width: 769px) and (max-width: 1023px)': {
                                width: '30vw', // Adjust the width for medium screens
                            },
                            '@media (min-width: 1024px)': {
                                width: '37vw',  // Default width for larger screens
                            },
                        }}
                        variant="filled"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <MailSharpIcon />
                                </InputAdornment>
                            ),
                        }}
                    />

                    <TextField
                        className="signupChild3"
                        color="success"
                        name=" Enter Residential Address"
                        label="Enter Residential Address"
                        size="medium"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        sx={{
                            '@media (max-width: 768px)': {
                                width: '80vw', // Adjust the width for smaller screens
                            },
                            '@media (min-width: 769px) and (max-width: 1023px)': {
                                width: '30vw', // Adjust the width for medium screens
                            },
                            '@media (min-width: 1024px)': {
                                width: '37vw', // Default width for larger screens
                            },
                        }}
                        variant="filled"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <FmdGoodSharpIcon />
                                </InputAdornment>
                            ),
                        }}
                    />

                    <TextField
                        className="signupChild4"
                        color="success"
                        label="Enter Date of Birth"
                        size="medium"
                        value={dateOfBirth}
                        onChange={(e) => setDateOfBirth(e.target.value)}
                        sx={{
                            '@media (max-width: 768px)': {
                                width: '80vw', // Adjust the width for smaller screens
                            },
                            '@media (min-width: 769px) and (max-width: 1023px)': {
                                width: '30vw', // Adjust the width for medium screens
                            },
                            '@media (min-width: 1024px)': {
                                width: '37vw',  // Default width for larger screens
                            },
                        }}
                        variant="filled"
                        type="date"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <CalendarTodayIcon />
                                </InputAdornment>
                            ),
                        }}
                    />

                    <TextField
                        className="signupChild5"
                        color="success"
                        name="Enter Password"
                        label="Enter Password"
                        size="medium"
                        required={true}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        sx={{
                            '@media (max-width: 768px)': {
                                width: '80vw', // Adjust the width for smaller screens
                            },
                            '@media (min-width: 769px) and (max-width: 1023px)': {
                                width: '30vw', // Adjust the width for medium screens
                            },
                            '@media (min-width: 1024px)': {
                                width: '37vw',  // Default width for larger screens
                            },
                        }}
                        variant="filled"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <LockSharpIcon />
                                </InputAdornment>
                            ),
                            endAdornment: (
                                <InputAdornment position="end">
                                    <VisibilityIcon
                                        onClick={handleShowPasswordClick}
                                        aria-label="toggle password visibility"
                                    >
                                        <Icon>{showPassword ? "visibility_off" : "visibility"}</Icon>
                                    </VisibilityIcon>
                                </InputAdornment>
                            ),
                        }}
                    />
                                    <Link to='/' id="link">Already Registered?</Link>


{errorMessage && <div className="error-message">{errorMessage}</div>}
{successMessage && <div className="success-message">{successMessage}</div>}

                    <Button 
                    
                        onClick={(e)=>handleSignup(e)}
                        className="rectangleButton"
                        sx={{
                            '@media (max-width: 768px)': {
                                width: '80vw', // Adjust the width for smaller screens
                            },
                            '@media (min-width: 769px) and (max-width: 1034px)': {
                                width: '30vw', // Adjust the width for medium screens
                            },
                            '@media (min-width: 1024px)': {
                                width: '37vw', // Default width for larger screens
                            },
                        }}
                        color="warning"
                        variant="contained"
                    >
                        Register
                    </Button>
                </form>
                
            </div>
        </div>
    );

}

export default SignUpForm;