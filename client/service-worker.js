const CACHE_NAME = 'my-pwa-cache';
const urlsToCache = ['/', '/offline.html'];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache)));
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches
      .match(event.request)
      .then((response) => {
        if (response) {
          return response;
        }
        return fetch(event.request).then((response) => {
          if (response.status === 404) {
            return caches.match('/offline.html');
          }
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
          return response;
        });
      })
      .catch(() => {
        return caches.match('/offline.html');
      }),
  );
});

self.addEventListener('beforeinstallprompt', (event) => {
  event.preventDefault();
  const promptEvent = event;
  const installButton = document.createElement('button');
  installButton.textContent = 'Add to Home Screen';
  document.body.appendChild(installButton);
  installButton.addEventListener('click', () => {
    promptEvent.prompt();
    promptEvent.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the install prompt');
      } else {
        console.log('User dismissed the install prompt');
      }
    });
  });
});
