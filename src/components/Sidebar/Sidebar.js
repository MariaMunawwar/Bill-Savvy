import React, { useState } from 'react';
import { Button, Offcanvas } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BsBrightnessHighFill, BsGrid1X2Fill, BsMenuButtonWideFill,} from 'react-icons/bs';
import {Link}  from "react-router-dom";

const Sidebar = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  const handleClose = () => setShowSidebar(false);
  const handleShow = () => setShowSidebar(true);

  return (
    <div>
      {/* Navbar with Sidebar Toggle Button */}
      <nav className="navbar navbar-expand-lg navbar-light fixed-top" style={{ width: '100vw', backgroundColor: "#E1EEC7", marginTop: "0px" }}>
        <Button variant="outline-success" onClick={handleShow} className="mr-2" style={{ marginLeft: "1vw" }}>
          ☰
        </Button>
        <span className="navbar-brand font-weight-bold" style={{ marginLeft: "1vw", fontWeight: "400" }}>BillSavvy</span>
      </nav>

      {/* Off-canvas Sidebar */}
      <Offcanvas show={showSidebar} onHide={handleClose} placement="start" style={{ width: '250px', backgroundColor: "#91A56B" }}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>BillSavvy</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {/* Add your sidebar content here */}
          <ul className='sidebar-list'>
            <li className='sidebar-list-item'>

              <Link to='/billprediction' >< BsBrightnessHighFill className='icon' />Bill Prediction</Link>

            </li>
            <li className='sidebar-list-item'>

              <Link to='/bloghome' ><BsMenuButtonWideFill className='icon' /> Eco-Educate</Link>


            </li>
            <li className='sidebar-list-item'>

              <Link to='/dashboard' ><BsGrid1X2Fill className='icon' /> Dashboard</Link>

            </li>


          </ul>
        </Offcanvas.Body>
      </Offcanvas>

      {/* Main Content */}
      {/* <div className={`main-content ${showSidebar ? 'sidebar-open' : ''}`}> */}
      {/* Add your main content here */}
      {/* <p>Main Content</p> */}
      {/* </div> */}
    </div>
  );
};

export default Sidebar;
