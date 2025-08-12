// Service Worker for TarımVerse PWA
const CACHE_NAME = 'tarimverse-v1.0.0';
const urlsToCache = [
  '/',
  '/static/js/bundle.js',
  '/static/css/main.css',
  '/manifest.json',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png'
];

// Install event
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch event
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached version or fetch from network
        return response || fetch(event.request);
      })
  );
});

// Activate event
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Background sync for offline posts
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync-posts') {
    event.waitUntil(syncPosts());
  }
});

async function syncPosts() {
  // Sync offline posts when connection is restored
  const offlinePosts = await getOfflinePosts();
  for (const post of offlinePosts) {
    try {
      await fetch('/api/posts', {
        method: 'POST',
        body: JSON.stringify(post),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      await removeOfflinePost(post.id);
    } catch (error) {
      console.error('Failed to sync post:', error);
    }
  }
}

async function getOfflinePosts() {
  // Get offline posts from IndexedDB
  return [];
}

async function removeOfflinePost(postId) {
  // Remove synced post from IndexedDB
}

// Push notification handling
self.addEventListener('push', (event) => {
  const options = {
    body: event.data ? event.data.text() : 'Yeni bildirim',
    icon: '/icons/icon-192x192.png',
    badge: '/icons/badge-72x72.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'Görüntüle',
        icon: '/icons/checkmark.png'
      },
      {
        action: 'close',
        title: 'Kapat',
        icon: '/icons/xmark.png'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('TarımVerse', options)
  );
});

// Notification click handling
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});