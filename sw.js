// Ember Service Worker — cache-busting version
// Clears all old caches and unregisters to stop blocking updates

self.addEventListener('install', () => self.skipWaiting());

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// No caching — always fetch fresh from network
self.addEventListener('fetch', e => {
  e.respondWith(fetch(e.request).catch(() => new Response('Offline')));
});
