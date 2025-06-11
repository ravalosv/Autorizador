// Variables globales
var respuesta3 = '';
var req3;
let firebaseInitialized = false;
let messaging = null;
let initializationInProgress = false;
let retryCount = 0;
const MAX_RETRIES = 3;
const RETRY_DELAY = 2000; // 2 segundos

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

const VAPID_KEY = 'BJuerWdNW1PbCWwmIKJ3u-fp0qvtIh8jXONtvvqEwfECDMmfM0RQJczOnNleyCdGHptjAs-YhkXQtrfu-jP9uAA';

// Función para esperar un tiempo determinado
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Función para cargar scripts de Firebase con retry
async function loadFirebaseScripts() {
    if (typeof firebase !== 'undefined') {
        console.log('Firebase ya está cargado');
        return;
    }

    for (let i = 0; i < MAX_RETRIES; i++) {
        try {
            await Promise.all([
                $.getScript('https://www.gstatic.com/firebasejs/11.9.1/firebase-app-compat.js'),
                $.getScript('https://www.gstatic.com/firebasejs/11.9.1/firebase-messaging-compat.js')
            ]);
            console.log('Scripts de Firebase cargados correctamente');
            return;
        } catch (error) {
            console.warn(`Intento ${i + 1}/${MAX_RETRIES} fallido:`, error);
            if (i < MAX_RETRIES - 1) {
                await delay(RETRY_DELAY);
            } else {
                throw new Error('No se pudieron cargar los scripts de Firebase después de varios intentos');
            }
        }
    }
}

// Función para inicializar Firebase con control de estado
async function initializeFirebase() {
    if (firebaseInitialized) {
        console.log('Firebase ya está inicializado');
        return;
    }

    if (initializationInProgress) {
        console.log('Inicialización de Firebase en progreso...');
        return;
    }

    initializationInProgress = true;

    try {
        console.log('Iniciando inicialización de Firebase...');
        await loadFirebaseScripts();

        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }

        messaging = firebase.messaging();
        firebaseInitialized = true;
        console.log('Firebase inicializado correctamente');
    } catch (error) {
        console.error('Error en initializeFirebase:', error);
        firebaseInitialized = false;
        throw error;
    } finally {
        initializationInProgress = false;
    }
}

// Función para configurar el Service Worker con verificación
async function setupServiceWorker() {
    if (!('serviceWorker' in navigator)) {
        throw new Error('Service Worker no soportado en este navegador');
    }

    // Verificar si ya existe un Service Worker activo
    const existingRegistration = await navigator.serviceWorker.getRegistration();
    if (existingRegistration?.active) {
        console.log('Service Worker ya está activo');
        return existingRegistration;
    }

    try {
        const registration = await navigator.serviceWorker.register('./firebase-messaging-sw.js', {
            scope: './'
        });

        // Esperar a que el Service Worker esté activo
        if (registration.installing) {
            await new Promise((resolve) => {
                registration.installing.addEventListener('statechange', (e) => {
                    if (e.target.state === 'activated') {
                        resolve();
                    }
                });
            });
        }

        console.log('Service Worker registrado y activado:', registration);
        return registration;
    } catch (error) {
        console.error('Error registrando Service Worker:', error);
        throw error;
    }
}

// Función para configurar notificaciones con retry
async function setupNotifications(swRegistration) {
    for (let i = 0; i < MAX_RETRIES; i++) {
        try {
            const permission = await Notification.requestPermission();
            if (permission !== 'granted') {
                throw new Error('Permiso de notificación denegado');
            }

            const token = await messaging.getToken({
                vapidKey: VAPID_KEY,
                serviceWorkerRegistration: swRegistration
            });

            if (!token) {
                throw new Error('No se pudo obtener el token FCM');
            }

            console.log('Token FCM obtenido correctamente');
            
            return token;
        } catch (error) {
            console.warn(`Intento ${i + 1}/${MAX_RETRIES} fallido:`, error);
            if (i < MAX_RETRIES - 1) {
                await delay(RETRY_DELAY);
            } else {
                throw error;
            }
        }
    }
}

// Configurar manejo de mensajes con verificación de estado
function setupMessageHandling() {
    console.log('inicializando setupMessageHandling');
    console.log('messaging:', messaging);
  
    if (!messaging) {
        console.error('Messaging no está inicializado');
        return;
    }

    messaging.onMessage((payload) => {
        console.log('Mensaje recibido en primer plano:', payload);
        if (Notification.permission === 'granted') {
            const { title, body, icon } = payload.notification || {};
            if (title) {
                new Notification(title, { body, icon });
            }
        }
    });
}

// Función principal de inicialización con control de estado
async function initializeApp() {
    if (initializationInProgress) {
        console.log('Inicialización ya en progreso...');
        return;
    }

    try {
        await initializeFirebase();
        const swRegistration = await setupServiceWorker();
        const token = await setupNotifications(swRegistration);
        setupMessageHandling();
        return token;
    } catch (error) {
        console.error('Error en initializeApp:', error);
        throw error;
    }
}

// Eventos del formulario con control de reintentos
Form3.onshow = function() {
    console.log('Form3.onshow iniciando...');
    let initAttempted = false;

    (async () => {
        if (!firebaseInitialized && !initAttempted) {
            initAttempted = true;
            try {
                const token = await initializeApp();
                console.log('Inicialización completada exitosamente');
                console.log('Token: ', token);
            } catch (error) {
                console.error('Error en Form3.onshow:', error);
                NSB.MsgBox('Error: ' + error.message, 0, 'NCautorizador');
            }
        }
    })();
};

// Funciones AJAX
function senddata3(valor) {
    req3 = Ajax('http://novacaja.com/autorizador/auto4.php' + valor, done3);
}

function done3() {
    if (req3.readyState !== 4) return;

    if (req3.status === 200) {
        respuesta3 = req3.responseText;
        if (respuesta3 === '1') {
            ChangeForm(frmAutoriza);
        } else if (respuesta3 === '0') {
            ChangeForm(frmSuscribe);
        }
    } else {
        const msg = buildErrorMessage(req3);
        respuesta = msg;
        Label2.value = msg;
    }
}

function buildErrorMessage(request) {
    let msg = `Error: Status = ${request.status}`;
    if (TypeName(request.statusText) === 'string') {
        msg += ` ${request.statusText}`;
    }
    if (TypeName(request.err) === 'string') {
        msg += ` ${request.error}`;
    }
    return msg;
}

// Event Handlers
btnContinuar.onclick = function() {
    window.plugins.imei.get(
        async (imei) => {
            senddata3('?servicio=e&imei=' + imei);
        },
        async () => {
            NSB.MsgBox('error leyendo imei', 0, 'NCautorizador');
        }
    );
};

btnBaja.onclick = function() {
    window.plugins.imei.get(
        async (imei) => {
            senddata3('?servicio=e&imei=' + imei);
        },
        async () => {
            NSB.MsgBox('error leyendo imei', 0, 'NCautorizador');
        }
    );
};