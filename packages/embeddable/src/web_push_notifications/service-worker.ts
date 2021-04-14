/// <reference lib="webworker" />
declare const self: ServiceWorkerGlobalScope;

import { at } from './db';
import { storeSubscription, subscribeToPushNotifications } from './subscription';

// The install handler takes care of precaching the resources we always need.
self.addEventListener('install', (event) => {
  self.skipWaiting();
  console.log('install');
});

// The activate handler takes care of cleaning up old caches.
self.addEventListener('activate', (event) => {
  console.log('activate');
  event.waitUntil(self.clients.claim());
});

self.addEventListener('push', function (event) {
  const data = event.data?.json();

  const options = {
    body: data.content || '',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: '2',
      notification: data,
    },
    actions: [{ action: 'close', title: 'Close' }],
  };

  event.waitUntil(self.registration.showNotification(data.title, options));
});

self.addEventListener(
  'notificationclick',
  function (event) {
    const clickedNotification = event.notification;

    // Normal notification click handler
    if (event.action === '') {
      const url = clickedNotification.data.notification.action_url;
      if (url) self.clients.openWindow(url);

      return;
    }

    // Actions handlers
    if (event.action === 'close') clickedNotification.close();
  },
  false,
);

self.addEventListener('pushsubscriptionchange', async (event) => {
  console.log('Subscription expired');

  // TODO: Get project by subdomain
  const project = await at(0, 'projects');
  if (!project) throw Error('Project not found');

  event.waitUntil(
    subscribeToPushNotifications(self.registration.pushManager, project.vapidPublicKey).then(async (subscription) => {
      console.log('Subscribed after expiration', subscription);

      // TODO: Get user by ID
      const user = await at(0, 'users');
      if (user) storeSubscription(subscription, user, project);
      else throw Error('User not found');
    }),
  );
});
