'use strict';

if (typeof self !== 'undefined') {
    self.addEventListener('install', (event) => {
        console.log('Inside the install handler:', event);
    });

    self.addEventListener('activate', (event) => {
        console.log('Inside the activate handler:', event);
    });

    self.addEventListener('fetch', (event) => {
        var newHeaders = new Headers(event.request.headers);
        newHeaders.set('x-HEADER_NAME', 'HEADER_VALUE');
        var modifiedReq = new Request(event.request, {
            headers: newHeaders
        });

        event.respondWith(fetch(modifiedReq));
    });
}

