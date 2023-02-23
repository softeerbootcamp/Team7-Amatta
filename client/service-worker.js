const CACHE_NAME = 'amatta';

const cacheUrls = ['/'];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(cacheUrls))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys.map((key) => {
            if (key !== CACHE_NAME) {
              return caches.delete(key);
            }
          }),
        ),
      )
      .then(() => self.clients.claim()),
  );
});

self.addEventListener('fetch', (event) => {
  const requestUrl = new URL(event.request.url);
  if (requestUrl.pathname === ('/user/login' || 'user/join' || 'user/logout')) return;
  if (requestUrl.protocol !== 'http:' && requestUrl.protocol !== 'https:') {
    return;
  }

  if (navigator.onLine && event.request.url.match(/\.(jpg|jpeg|png|gif|css|js|svg)$/)) {
    event.respondWith(
      caches.open('amatta').then((cache) =>
        cache.match(event.request).then(
          (response) =>
            response ||
            fetch(event.request).then((response) => {
              cache.put(event.request, response.clone());
              return response;
            }),
        ),
      ),
    );
  } else if (!navigator.onLine) {
    event.respondWith(caches.match(event.request).then((response) => response));
  }
  return;
});

self.addEventListener('beforeinstallprompt', (event) => {
  event.preventDefault();
  const promptEvent = event;
  const installButton = document.createElement('button');
  installButton.textContent = '홈 화면에 Amatta 추가하기';
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
