// Tên bộ nhớ cache
const CACHE_NAME = 'order-manager-v1';
// Danh sách các tệp cần cache để chạy offline
const urlsToCache = [
  './', // Tương đương 'index.html'
  './index.html',
  './manifest.json',
  'https://cdn.tailwindcss.com' // Cache cả Tailwind CSS
];

// 1. Sự kiện 'install': Mở cache và thêm các tệp vào
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// 2. Sự kiện 'fetch': Can thiệp vào các yêu cầu mạng
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Nếu tìm thấy trong cache, trả về từ cache
        if (response) {
          return response;
        }
        // Nếu không, đi lấy từ mạng
        return fetch(event.request);
      }
    )
  );
});
