const CACHE_NAME = 'sos-ansiedade-v3';
const ASSETS = [
  './',
  './index.html',
  './style.css',
  './app.js',
  './translations.js',
  './manifest.json',
  './icon-192.png',
  './icon-512.png'
];

// Instala o service worker e salva arquivos no cache
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
});

// Ativa e limpa caches antigos
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      )
    )
  );
});

// Intercepta requisições e serve do cache quando possível
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
