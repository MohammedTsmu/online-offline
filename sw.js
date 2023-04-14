const CACHE_NAME = 'my-website-cache-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/style.css',
    '/script.js',
    '/offline.html',
    '/offline.png'
];

self.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function (cache) {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request)
            .then(function (response) {
                if (response) {
                    return response;
                } else {
                    return fetch(event.request)
                        .then(function (response) {
                            return caches.open(CACHE_NAME)
                                .then(function (cache) {
                                    cache.put(event.request, response.clone());
                                    return response;
                                });
                        })
                        .catch(function () {
                            return caches.match('/offline.html');
                        });
                }
            })
    );
});
