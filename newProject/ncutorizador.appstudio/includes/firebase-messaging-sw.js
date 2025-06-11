// Verificar si el contexto es un Service Worker
if (self && self.importScripts) {
    console.log('configurando SW');
    self.addEventListener('install', (event) => {
      console.log('[SW] Service Worker instalado');
      self.skipWaiting();
    });

    self.addEventListener('activate', (event) => {
      console.log('[SW] Service Worker activado');
      event.waitUntil(self.clients.claim());
    });

    try {
      importScripts(
        'https://www.gstatic.com/firebasejs/11.9.1/firebase-app-compat.js',
        'https://www.gstatic.com/firebasejs/11.9.1/firebase-messaging-compat.js'
      );

      const firebaseConfig = {
        apiKey: 'AIzaSyCPvhFLHzX6Mx3Cvjf6Zq3hbY8UI7iG79s',
        authDomain: 'autorizador-remoto.firebaseapp.com',
        projectId: 'autorizador-remoto',
        storageBucket: 'autorizador-remoto.firebasestorage.app',
        messagingSenderId: '448764386668',
        appId: '1:448764386668:web:02936cf72552a61d92e749',
        measurementId: 'G-K1H627GTPT',
      };

      firebase.initializeApp(firebaseConfig);
      const messaging = firebase.messaging();

      messaging.onBackgroundMessage((payload) => {
        console.log('[SW] Mensaje recibido:', payload);
        
        const notificationTitle = payload.notification?.title || 'Nueva Notificación';
        const notificationOptions = {
          body: payload.notification?.body || '',
          icon: payload.notification?.icon || '/ncutorizador/icon.png',
          badge: '/ncutorizador/badge.png',
          tag: 'default',
          requireInteraction: true
        };

        return self.registration.showNotification(notificationTitle, notificationOptions);
      });
    } catch (error) {
      console.error('[SW] Error al cargar Firebase:', error);
    }
}