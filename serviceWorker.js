self.addEventListener('install', e => {
    e.waitUntil(
        caches.open('contacts-pwa-cache').then(cache => {
            return cache.addAll([
                './',                   // Root directory
                './index.html',         // Main HTML
                './styles.css',         // CSS file
                './script.js',          // JavaScript file
                './manifest.json',      // Manifest file
                './icon.png'            // App icon
            ]);
        })
    );
});

self.addEventListener('fetch', e => {
    e.respondWith(
        caches.match(e.request).then(response => {
            return response || fetch(e.request); // Serve cached files or fetch from network
        })
    );
});
