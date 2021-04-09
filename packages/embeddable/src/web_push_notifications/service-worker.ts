/// <reference lib="webworker" />

// export empty type because of tsc --isolatedModules flag
export type {};
declare const self: ServiceWorkerGlobalScope;

// The install handler takes care of precaching the resources we always need.
self.addEventListener('install', (event) => {
  self.skipWaiting();
  console.log('install');
});

// The activate handler takes care of cleaning up old caches.
self.addEventListener('activate', (event) => {
  console.log('activate');
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
