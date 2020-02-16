self.addEventListener('install', function(event) {
  event.waitUntil(
    console.log('install sw')
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    console.log('activate sw')
  );
});

self.addEventListener('fetch', function(event) {
  if(!event.request.url.includes('https://gnews.io/api')) {
    return;
  }
  event.respondWith(caches.match(event.request).then(function(response) {
    // caches.match() always resolves
    // but in case of success response will have value
    if (response !== undefined) {
      // if you do not clone response you'll 'consume' the response and invalidate it!
      const clone = response.clone();

      return clone.json()
        .then((json) => {
          const msDiff = Date.now() - (json.timestamp * 1000);
          const twoHoursInMs = 1000 * 60 * 60 * 2;
          if (msDiff > twoHoursInMs) {
            return newRequest(event);
          }

          return response;
        })
    } else {
      return newRequest(event);
    }
  }));
});

function newRequest (event) {
  return fetch(event.request).then(function (response) {
    let responseClone = response.clone();

    caches.open('v2').then(function (cache) {
      cache.put(event.request, responseClone);
    });
    return response;
  });
}