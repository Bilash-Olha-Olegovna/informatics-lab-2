const CACHE_NAME = 'genai-course-v1';
const ASSETS_TO_CACHE = [
  '/informatics-lab-2/',
  '/informatics-lab-2/styles/custom.css',
  '/informatics-lab-2/scripts/app.js'
];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS_TO_CACHE)));
});

self.addEventListener('fetch', (event) => {
  event.respondWith(caches.match(event.request).then((response) => response || fetch(event.request)));
});
