// src/components/NotificationComponent.js
import React, { useEffect } from 'react';

const NotificationComponent = () => {
  useEffect(() => {
    const handleClick = async () => {
      if ('serviceWorker' in navigator) {
        try {
          const registration = await navigator.serviceWorker.ready;

          Notification.requestPermission().then((permission) => {
            if (permission !== 'granted') {
              alert('You need to allow push notifications');
            } else {
              const timestamp = new Date().getTime() + 3 * 1000;
              //icon
              const iconPath = process.env.PUBLIC_URL + '/assets/Billsavvyy_logo.png'; 
              setTimeout(() => {
                registration.showNotification('Peak Hour Alert!', {
                  tag: timestamp,
                  body:
                    'Dear BillSavvy Users, this is a reminder that electricity peak hours are in effect from 6-10 p.m. Please be mindful of your electricity usage.',
                  data: {
                    url: window.location.href,
                  },
                  icon: iconPath,
                });
              }, 3 * 1000);
            }
          });
        } catch (error) {
          console.error('Error accessing service worker:', error);
        }
      }
    };

    const notificationButton = document.querySelector('#notification-button');
    if (notificationButton) {
      notificationButton.addEventListener('click', handleClick);
    }

    return () => {
      if (notificationButton) {
        notificationButton.removeEventListener('click', handleClick);
      }
    };
  }, []);

  return (
    <>
    <button
  id="notification-button"
  style={{
    backgroundColor: '#f3b140',
    color: '#fff',
    borderRadius: '50%',
    padding: '10px 20px',
    position: 'fixed',
    top: '150px',
    right: '20px',
    cursor: 'pointer',
    border: 'none',
    outline: 'none',
  }}
>
  BillSavvy
</button>

    </>
  );
};

export default NotificationComponent;