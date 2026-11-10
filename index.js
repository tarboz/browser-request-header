'use strict';

if ('serviceWorker' in window.navigator) {
    navigator.serviceWorker
        .register('sw-headers.js')
        .then(console.log, console.error)
        .catch(console.error)
}