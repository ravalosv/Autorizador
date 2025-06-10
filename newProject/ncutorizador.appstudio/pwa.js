// version and contentToCache are supplied by IDEController.py during deploy
const cacheName = 'ncutorizador-2025-06-09 19:09:53.032168'; // unique value, generated each deploy
const contentToCache = [
  'code.js',
  'google-services.json',
  'index.html',
  'Logotipo_NOVACAJA.png',
  'icons/readme.txt',
  'icons/android/hdpi.png',
  'icons/android/hdpi_.png',
  'icons/android/ldpi.png',
  'icons/android/ldpi_.png',
  'icons/android/mdpi.png',
  'icons/android/mdpi_.png',
  'icons/android/xhdpi.png',
  'icons/android/xhdpi_.png',
  'icons/android/xxhdpi.png',
  'icons/android/xxhdpi_.png',
  'icons/ios/icon-1024.png',
  'icons/ios/icon-40.png',
  'icons/ios/icon-40@2x.png',
  'icons/ios/icon-50.png',
  'icons/ios/icon-50@2x.png',
  'icons/ios/icon-60.png',
  'icons/ios/icon-60@2x.png',
  'icons/ios/icon-60@3x.png',
  'icons/ios/icon-72.png',
  'icons/ios/icon-72@2x.png',
  'icons/ios/icon-76.png',
  'icons/ios/icon-76@2x.png',
  'icons/ios/icon-small.png',
  'icons/ios/icon-small@2x.png',
  'icons/ios/icon-small@3x.png',
  'icons/ios/icon.png',
  'icons/ios/icon@2x.png',
  'icons/ios/readme.txt',
  'nsb/images/192.png',
  'nsb/images/512.png',
  'nsb/images/72.png',
  'nsb/images/ajax-loader.gif',
  'nsb/library/appstudioFunctions.js',
  'nsb/library/jquery.modal.min.css',
  'nsb/library/jquery.modal.min.js',
  'nsb/library/jquery3.js',
  'splash/readme.txt',
  'splash/android/readme.txt',
  'splash/android/res-long-land-hdpi/default.png',
  'splash/android/res-long-land-ldpi/default.png',
  'splash/android/res-long-land-mdpi/default.png',
  'splash/android/res-long-land-xhdpi/default.png',
  'splash/android/res-long-land-xxhdpi/default.png',
  'splash/android/res-long-land-xxxhdpi/default.png',
  'splash/android/res-long-port-hdpi/default.png',
  'splash/android/res-long-port-ldpi/default.png',
  'splash/android/res-long-port-mdpi/default.png',
  'splash/android/res-long-port-xhdpi/default.png',
  'splash/android/res-long-port-xxhdpi/default.png',
  'splash/android/res-long-port-xxxhdpi/default.png',
  'splash/android/res-notlong-land-hdpi/default.png',
  'splash/android/res-notlong-land-ldpi/default.png',
  'splash/android/res-notlong-land-mdpi/default.png',
  'splash/android/res-notlong-land-xhdpi/default.png',
  'splash/android/res-notlong-land-xxhdpi/default.png',
  'splash/android/res-notlong-land-xxxhdpi/default.png',
  'splash/android/res-notlong-port-hdpi/default.png',
  'splash/android/res-notlong-port-ldpi/default.png',
  'splash/android/res-notlong-port-mdpi/default.png',
  'splash/android/res-notlong-port-xhdpi/default.png',
  'splash/android/res-notlong-port-xxhdpi/default.png',
  'splash/android/res-notlong-port-xxxhdpi/default.png',
  'splash/ios/1000x1000.png',
  'splash/ios/2048x2048.png',
  'splash/ios/Default-568h@2x.png',
  'splash/ios/Default-667h@2x.png',
  'splash/ios/Default-Landscape-736h@3x.png',
  'splash/ios/Default-Landscape.png',
  'splash/ios/Default-Landscape@2x.png',
  'splash/ios/Default-Portrait-736h@3x.png',
  'splash/ios/Default-Portrait.png',
  'splash/ios/Default-Portrait@2x.png',
  'splash/ios/Default.png',
  'splash/ios/Default@2x.png',
  'toolbox/as/dist/asStyle.css',
  'toolbox/bs4/dist/bsFunctions.min.js',
  'toolbox/bs4/dist/css/bootstrap.min.css',
  'toolbox/bs4/dist/js/bootstrap.bundle.min.js',
  'toolbox/bs4/dist/open-iconic/css/open-iconic-bootstrap.min.css',
  'toolbox/bs4/dist/open-iconic/fonts/open-iconic.woff',
];


const trace = false;
if (trace) console.log('[pwa.js] Startup', cacheName);

self.addEventListener('activate', ((e) => {
  'use strict';

  if (trace) console.log('[pwa.js] Clear old caches');
  e.waitUntil(
    caches.keys().then((keyList) => {
      if (trace) console.log('keylist', keyList);
      return Promise.all(keyList.map((key) => {
        if (trace) console.log('  Key:', key);
        if (cacheName.indexOf(key) === -1  && key.substr(0, 'ncutorizador'.length) === 'ncutorizador') {
          if (trace) console.log('  Delete:', key);
          return caches.delete(key);
        }
      }));
    }),
  );
}));

self.addEventListener('install', (e) => {
  'use strict';

  if (trace) console.log('[pwa.js] Install');
  e.waitUntil(
    caches.open(cacheName).then((cache) => {
      if (trace) console.log('[pwa.js] Caching all: app shell and content');
      return cache.addAll(contentToCache);
    }),
  );
});

self.addEventListener('fetch', (e) => {
  'use strict';

  if (trace) console.log('[pwa.js] fetch', e.request.url)
  // override Chromium bug: https://stackoverflow.com/questions/48463483/what-causes-a-failed-to-execute-fetch-on-serviceworkerglobalscope-only-if
  if (e.request.cache === 'only-if-cached' && e.request.mode !== 'same-origin') return;
  e.respondWith(
    caches.open(cacheName)
      .then(cache => cache.match(e.request, { ignoreSearch: true }))
      .then(response => response || fetch(e.request)),
  );
});

if (typeof self.skipWaiting === 'function') {
  if (trace) console.log('[pwa.js] self.skipWaiting() is supported.');
  self.addEventListener('install', function(e) {
    // See https://slightlyoff.github.io/ServiceWorker/spec/service_worker/index.html#service-worker-global-scope-skipwaiting
    e.waitUntil(self.skipWaiting());
  });
} else {
  if (trace) console.log('[pwa.js] self.skipWaiting() is not supported.');
}

if (self.clients && (typeof self.clients.claim === 'function')) {
  if (trace) console.log('[pwa.js] self.clients.claim() is supported.');
  self.addEventListener('activate', function(e) {
    // See https://slightlyoff.github.io/ServiceWorker/spec/service_worker/index.html#clients-claim-method
    e.waitUntil(self.clients.claim());
  });
} else {
  if (trace) console.log('[pwa.js] self.clients.claim() is not supported.');
}

/* Add to home screen prompt:
https://developers.google.com/web/fundamentals/app-install-banners/#criteria
- needs an Install button to show

- Should PWA stuff happen for PhoneGap? no, but we can't check for cordova.js
- Any reason to have a switch for PWA?
- What triggers the update? Simple refresh doesn't do it.
https://developers.google.com/web/fundamentals/primers/service-workers/#update-a-service-worker

- Clear cache happens on activate. When does that happen?
https://github.com/deanhume/pwa-update-available

- remove AddToHomeScreen on Chrome
https://developers.google.com/web/updates/2019/05/mini-infobar-update
*/

/*
Get list of current caches:
caches.keys().then((keyList) => {console.log(keyList)})
*/

