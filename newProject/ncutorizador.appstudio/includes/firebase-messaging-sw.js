// Asegurarse de que estamos en un contexto de Service Worker
console.log('typeof: ', typeof importScripts);
if ('function' === typeof importScripts) {

  console.log('inicializado como service worker');
  // Versión del Service Worker
  const SW_VERSION = '1.0.0';

  
  
  // Importar scripts de Firebase de forma segura
  try {
    importScripts(
      'https://www.gstatic.com/firebasejs/11.9.1/firebase-app-compat.js'
    );
    importScripts(
      'https://www.gstatic.com/firebasejs/11.9.1/firebase-messaging-compat.js'
    );
    console.log('[SW] Scripts de Firebase importados correctamente');
  } catch (e) {
    console.error('[SW] Error importando scripts de Firebase:', e);
  }

  // Configuración de Firebase
  const firebaseConfig = {
    apiKey: 'AIzaSyCPvhFLHzX6Mx3Cvjf6Zq3hbY8UI7iG79s',
    authDomain: 'autorizador-remoto.firebaseapp.com',
    projectId: 'autorizador-remoto',
    storageBucket: 'autorizador-remoto.firebasestorage.app',
    messagingSenderId: '448764386668',
    appId: '1:448764386668:web:02936cf72552a61d92e749',
    measurementId: 'G-K1H627GTPT',
  };

  let messaging;

  // Inicializar Firebase de forma segura
  try {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
      messaging = firebase.messaging();
      console.log('[SW] Firebase inicializado correctamente');
    }
  } catch (error) {
    console.error('[SW] Error inicializando Firebase:', error);
  }

  // Verificar que messaging se haya inicializado correctamente
  if (messaging) {
    // Manejo de mensajes en segundo plano
    messaging.onBackgroundMessage((payload) => {
      console.log('[SW] Mensaje recibido en segundo plano:', payload);

      try {
        const notificationTitle = payload.notification.title || 'Nueva Notificación';
        const notificationOptions = {
          body: payload.notification.body || '',
          icon: payload.notification.icon || '/icon.png',
          badge: '/badge.png',
          tag: payload.notification.tag || 'default',
          data: payload.data || {},
          requireInteraction: true,
          actions: [
            {
              action: 'view',
              title: 'Ver más'
            }
          ]
        };

        return self.registration.showNotification(
          notificationTitle,
          notificationOptions
        );
      } catch (error) {
        console.error('[SW] Error mostrando notificación:', error);
      }
    });
  }

  // Evento de instalación del Service Worker
  self.addEventListener('install', (event) => {
    console.log('[SW] Service Worker instalado - Versión:', SW_VERSION);
    self.skipWaiting();
  });

  // Evento de activación del Service Worker
  self.addEventListener('activate', (event) => {
    console.log('[SW] Service Worker activado');
    event.waitUntil(self.clients.claim());
  });

  // Manejo de clics en las notificaciones
  self.addEventListener('notificationclick', (event) => {
    console.log('[SW] Notificación clickeada:', event);
    event.notification.close();

    if (event.action === 'view') {
      console.log('[SW] Acción "Ver más" seleccionada');
    }

    event.waitUntil(
      clients.matchAll({ type: 'window', includeUncontrolled: true })
        .then((clientList) => {
          for (const client of clientList) {
            if (client.url && 'focus' in client) {
              return client.focus();
            }
          }
          if (clients.openWindow) {
            return clients.openWindow('/');
          }
        })
    );
  });

  // Manejo de errores de notificación
  self.addEventListener('notificationerror', (event) => {
    console.error('[SW] Error en notificación:', event.error);
  });

  // Manejo de eventos push
  self.addEventListener('push', (event) => {
    console.log('[SW] Push recibido:', event);
    
    if (event.data) {
      try {
        const data = event.data.json();
        const options = {
          body: data.body || 'No hay contenido',
          icon: data.icon || '/icon.png',
          badge: '/badge.png',
          data: data
        };

        event.waitUntil(
          self.registration.showNotification(
            data.title || 'Nueva Notificación',
            options
          )
        );
      } catch (error) {
        console.error('[SW] Error procesando push:', error);
      }
    }
  });
} else {
  //console.error('[SW] Este archivo debe ser cargado como Service Worker');
}