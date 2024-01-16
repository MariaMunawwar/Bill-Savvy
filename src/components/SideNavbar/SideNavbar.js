import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode'; // Ensure jwt-decode is installed
import 
{BsUpload,  BsFillCaretLeftFill,BsBrightnessHighFill ,BsGrid1X2Fill, BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, 
  BsListCheck, BsMenuButtonWideFill, BsFillGearFill, BsPencil}
 from 'react-icons/bs';
 import Logo from "../../Assets/Billsavvy_logo.png";
 import Account from "../../Assets/Account.png";
 import "./sidenavbar.css"
 import {Link} from "react-router-dom";

function SideNavbar({openSidebarToggle, OpenSidebar}) {
    //const [username, setUsername] = useState('Username ');
    const [userData, setUserData] = useState({
        username: 'Loading...',
        email: 'Loading...'
      });
  const [isEditing, setIsEditing] = useState(false);
  const [newUsername, setNewUsername] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        const userId = jwtDecode(token).id;
        const response = await axios.get(`http://localhost:3001/dashboard/${userId}`);
        setUserData({
          username: response.data.username,
          email: response.data.signupData.email

        });
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleEditClick = () => {
    setIsEditing(true);
    setNewUsername(userData.username);
  };

  const handleSaveClick = () => {
    setNewUsername(newUsername);
    //api call to update username in backend
    //setUserData({...userData, username: newUsername});
    setIsEditing(false);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  const handleInputChange = (e) => {
    setNewUsername(e.target.value);
  };

  return (
    <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive": ""}>
        <div className='sidebar-title'>
            <div className='sidebar-brand'>
                {/* <BsCart3  className='icon_header'/> SHOP */}
                <img src={Logo} alt="BillSavvy Logo" style={{ width: '50px', borderRadius: '50%', marginLeft:'-1px',marginBottom: '8px',backgroundColor: "#91A56B" }} />
                <h2 id="logo_title">BillSavvy</h2>
            </div>
            <span className='icon close_icon' onClick={OpenSidebar}>x</span>
        </div>

        <ul className='sidebar-list'>
        <li className='sidebar-list-item'>
          <div>
            <img src={Account} alt="Profile" className="profile-picture" height="120px" />
            <BsUpload className='icon' onClick={console.log("hello")} style={{cursor:'pointer'}}/>
          </div>
        </li>

        <li className="sidebar-list-item">
          {isEditing ? (
            <>
              <input type="text" value={newUsername} onChange={handleInputChange} class="edit-input" />
              <button onClick={handleSaveClick} className='edit-btn'>Save</button>
              <button onClick={handleCancelClick} className='edit-btn'>Cancel</button>
            </>
          ) : (
            <>
              {userData.username}
              <BsPencil className="icon" onClick={handleEditClick} style={{cursor:'pointer'}}/>
            </>
          )}
        </li>

        <li className='sidebar-list-item'>{userData.email}</li>
        <li className='sidebar-list-item'>
                {/* <a href="">
                    <BsFillArchiveFill className='icon'/> Products
                </a> */}
                <Link to='/billprediction' >< BsBrightnessHighFill  className='icon'/>Bill Prediction</Link>

            </li>
        <li className='sidebar-list-item'>
                {/* <a href="">
                    <BsMenuButtonWideFill className='icon'/> Reports
                </a> */}
                 <Link to='/bloghome' ><BsMenuButtonWideFill className='icon'/> Eco-Educate</Link>

                
            </li>
            <li className='sidebar-list-item'>
                {/* <a href="">
                    <BsGrid1X2Fill className='icon'/> Dashboard
                </a> */}
                <Link to='/dashboard' ><BsGrid1X2Fill className='icon'/> Dashboard</Link>

            </li>
            
            
            <li className='sidebar-list-item'>
                {/* <a href="">
                    <BsFillGearFill className='icon'/> Setting
                </a> */}
                <Link to='/Dashboard' ><BsFillCaretLeftFill className='icon'/> SignOut</Link>

            </li>
        </ul>
    </aside>
  )
}

export default SideNavbar;