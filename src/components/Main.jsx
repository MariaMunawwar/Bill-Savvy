import React from 'react';
import '../App.css';
import NotificationComponent from './NotificationComponent';


const Main = () => {
    return (
        <div className='main'>
              <NotificationComponent />
            <video src="/videoBg.mp4" autoPlay loop muted />
        </div>
    )
}

export default Main;