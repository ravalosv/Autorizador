// Variables globales
var respuesta3 = '';
var req3;
let firebaseInitialized = false;
let messaging = null;

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

// Función para cargar scripts de Firebase
async function loadFirebaseScripts() {
    if (typeof firebase !== 'undefined') return;
    
    try {
        await Promise.all([
            $.getScript('https://www.gstatic.com/firebasejs/11.9.1/firebase-app-compat.js'),
            $.getScript('https://www.gstatic.com/firebasejs/11.9.1/firebase-messaging-compat.js')
        ]);
        console.log('Scripts de Firebase cargados correctamente');
    } catch (error) {
        console.error('Error cargando scripts de Firebase:', error);
        throw new Error('No se pudieron cargar los scripts de Firebase');
    }
}

// Función para inicializar Firebase
async function initializeFirebase() {
    if (firebaseInitialized) {
        console.log('Firebase ya está inicializado');
        return;
    }

    try {
        console.log('Iniciando inicialización de Firebase...');
        
        // 1. Cargar scripts
        await loadFirebaseScripts();

        // 2. Inicializar Firebase
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig);
        }

        // 3. Inicializar servicios
        //window.analytics = firebase.analytics();
        messaging = firebase.messaging();

        firebaseInitialized = true;
        console.log('Firebase inicializado correctamente');

    } catch (error) {
        console.error('Error en initializeFirebase:', error);
        firebaseInitialized = false;
        throw error;
    }
}

// Función para configurar el Service Worker
async function setupServiceWorker() {
    if (!('serviceWorker' in navigator)) {
        throw new Error('Service Worker no soportado en este navegador');
    }

    try {
        const registration = await navigator.serviceWorker.register('./firebase-messaging-sw.js', {
            scope: './'
        });
        console.log('Service Worker registrado:', registration);
        return registration;
    } catch (error) {
        console.error('Error registrando Service Worker:', error);
        throw error;
    }
}

// Función para configurar notificaciones
async function setupNotifications(swRegistration) {
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

        console.log('Token FCM:', token);
        return token;

    } catch (error) {
        console.error('Error en setupNotifications:', error);
        throw error;
    }
}

// Configurar manejo de mensajes
function setupMessageHandling() {
    messaging.onMessage((payload) => {
        console.log('Mensaje recibido en primer plano:', payload);
        if (Notification.permission === 'granted') {
            const { title, body, icon } = payload.notification;
            new Notification(title, { body, icon });
        }
    });
}

// Función principal de inicialización
async function initializeApp() {
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

// Eventos del formulario
Form3.onshow = function() {
    console.log('Form3.onshow iniciando...');
    let initializationAttempted = false;

    (async () => {
        try {
            if (!firebaseInitialized && !initializationAttempted) {
                initializationAttempted = true;
                const token = await initializeApp();
                console.log('Inicialización completada. Token:', token);
            }
        } catch (error) {
            console.error('Error en Form3.onshow:', error);
            NSB.MsgBox('Error: ' + error.message, 0, 'NCautorizador');
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