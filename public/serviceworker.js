const FILE_CACHE = "static-cache-v1",
    DATA_CACHE = "data-cache-v1";

const FILES_TO_CACHE = [
    '/',
    '/index.js',
    '/style.css',
    '/icons/icon-192x192.png',
    '/icons/icon-512x512.png'
];

self.addEventListener("install", function(e){
    e.waitUntil(
        caches.open(FILE_CACHE).then(function(cache){
            console.log("Cache opened");
            return cache.addAll(FILES_TO_CACHE);
        })
    )
});

self.addEventListener("fetch", function(e){
    if(event.request.url.includes("/api")){
        e.respondWith(
            caches.open(DATA_CACHE).then(cache => {
                return fetch(e.request)
                    .then(response => {
                        if(response.status === 200) {
                            cache.put(event.request.url, response.clone())
                        }
                        return response;
                    })
                    .catch(err => {
                        cache.match(event.request.url);
                    })
            })
        )
        return;
    }

    e.respondeWith(fetch(e.request).catch(function() {
        return caches.match(e.request).then(res => {
            if(res){
                return res;
            } else{
                return "/";
            }
        })
    }))
});