// v8: the bright-paper offline page and icons (precached: a new name runs install
// again). v7 had the ink-and-paper ones; v6 put pages and build files in separate
// caches; v5 mixed them and kept every deploy's files. activate below deletes the older caches.
const CACHE_NAME = 'scrum-poker-v8';
// Build files (/_next/static/…): their names carry a hash, so a cached copy is
// never stale; only the newest MAX_STATIC_ENTRIES are kept, as every deploy
// brings new names.
const STATIC_CACHE = 'scrum-poker-static-v6';
const MAX_STATIC_ENTRIES = 120;
const OFFLINE_URL = '/offline.html';

// Static assets to precache
const PRECACHE = [
  OFFLINE_URL,
  '/icons/icon-192.png',
  '/icons/icon-512.png',
];

// Install — precache offline page and icons
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE))
  );
  self.skipWaiting();
});

// Activate — clean old caches; navigations needn't wait for the worker to start.
self.addEventListener('activate', (event) => {
  event.waitUntil(Promise.all([
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME && k !== STATIC_CACHE).map((k) => caches.delete(k)))
    ),
    self.registration.navigationPreload?.enable(),
  ]));
  self.clients.claim();
});

// Pages worth replaying offline. Not /room: live state, a stale copy would
// show old votes.
function isCacheablePage(url) {
  return url.origin === self.location.origin && !/^\/room(\/|$)/.test(url.pathname);
}

// A failed write (quota, storage cleared) only costs the offline copy.
function cachePut(name, key, response) {
  return caches.open(name)
    .then((cache) => cache.put(key, response))
    .catch(() => {});
}

/** Keep the build-file cache to its newest entries (keys come oldest first). */
function trimStatic() {
  return caches.open(STATIC_CACHE)
    .then((cache) => cache.keys().then((keys) =>
      Promise.all(keys.slice(0, Math.max(0, keys.length - MAX_STATIC_ENTRIES)).map((k) => cache.delete(k)))
    ))
    .catch(() => {});
}

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip SSE and API requests — they must be online
  if (url.pathname.startsWith('/api/')) return;

  // Navigation requests — network first, offline fallback
  if (request.mode === 'navigate') {
    // Keyed without the query: it can carry secrets and doesn't change these pages.
    const key = url.origin + url.pathname;
    event.respondWith(
      Promise.resolve(event.preloadResponse)
        .then((preloaded) => preloaded || fetch(request))
        .then((response) => {
          // Only real pages: no error pages, and no redirected responses, which
          // browsers refuse to replay for a navigation.
          if (response.ok && response.type === 'basic' && !response.redirected && isCacheablePage(url)) {
            event.waitUntil(cachePut(CACHE_NAME, key, response.clone()));
          }
          return response;
        })
        .catch(() =>
          (isCacheablePage(url) ? caches.match(key) : Promise.resolve(undefined))
            .then((cached) => cached || caches.match(OFFLINE_URL))
        )
    );
    return;
  }

  // Build files — cache first: a hashed name never changes its content.
  if (url.pathname.startsWith('/_next/static/')) {
    event.respondWith(
      caches.match(request).then((cached) => cached || fetch(request).then((response) => {
        if (response.ok) event.waitUntil(cachePut(STATIC_CACHE, request, response.clone()).then(trimStatic));
        return response;
      }))
    );
    return;
  }

  // Icons and fonts — stale-while-revalidate (their names don't change)
  if (
    url.pathname.startsWith('/icons/') ||
    url.pathname.endsWith('.woff2') ||
    url.pathname.endsWith('.woff')
  ) {
    event.respondWith(
      caches.match(request).then((cached) => {
        const fetchPromise = fetch(request).then((response) => {
          // No waitUntil: with a cached copy the event may already be over.
          if (response.ok) cachePut(CACHE_NAME, request, response.clone());
          return response;
        }).catch(() => cached);
        return cached || fetchPromise;
      })
    );
    return;
  }
});
