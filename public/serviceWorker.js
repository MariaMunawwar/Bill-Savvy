/* eslint-disable no-restricted-globals */

const installHandler = (event) => console.log('ServiceWorker installed');

const notificationClickHandler = (event) => {
  event.waitUntil(self.clients.openWindow('/'));
};

const notificationClickFocusHandler = (event) => {
  event.waitUntil(
    self.clients.matchAll().then((clients) => {
      if (clients.length) {
        clients[0].focus();
      } else {
        self.clients.openWindow('/');
      }
    })
  );
};

const notificationClickPostMessageHandler = (event) => {
  event.waitUntil(
    self.clients.matchAll().then((clients) => {
      if (clients.length) {
        clients[0].focus();
        clients[0].postMessage('Push notification clicked!');
      } else {
        self.clients.openWindow('/');
      }
    })
  );
};

self.addEventListener('install', installHandler);
self.addEventListener('notificationclick', notificationClickHandler);
self.addEventListener('notificationclick', notificationClickFocusHandler);
self.addEventListener('notificationclick', notificationClickPostMessageHandler);

// Manual service worker registration
if ('serviceWorker' in self.navigator) {
  self.navigator.serviceWorker
    .register('/serviceWorker.js')
    .then((registration) => {
      console.log('Service Worker registered with scope:', registration.scope);
    })
    .catch((error) => {
      console.error('Service Worker registration failed:', error);
    })}