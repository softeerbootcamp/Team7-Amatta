importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');

const CACHE = 'cache-offline-page';
const offlineFallbackPage = 'offline.html';

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE)
      .then((cache) =>
        cache.addAll([
          'https://amatta.site/',
          './offline.html',
          'https://amatta-icons.s3.ap-northeast-2.amazonaws.com/app/icon-x128.png',
          'https://amatta-icons.s3.ap-northeast-2.amazonaws.com/app/icon-x192.png',
          'https://amatta-icons.s3.ap-northeast-2.amazonaws.com/app/icon-x384.png',
          'https://amatta-icons.s3.ap-northeast-2.amazonaws.com/app/icon-x512.png',
        ]),
      ),
  );
});

if (workbox.navigationPreload.isSupported()) {
  workbox.navigationPreload.enable();
}

workbox.routing.registerRoute(
  new RegExp('/*'),
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: CACHE,
  }),
);

self.addEventListener('fetch', (event) => {
  if (event.request.mode === 'navigate') {
    event.respondWith(
      (async () => {
        try {
          const preloadResp = await event.preloadResponse;

          if (preloadResp) {
            return preloadResp;
          }

          const networkResp = await fetch(event.request);
          return networkResp;
        } catch (error) {
          const cache = await caches.open(CACHE);
          const cachedResp = await cache.match(offlineFallbackPage);
          return cachedResp;
        }
      })(),
    );
  }
});
