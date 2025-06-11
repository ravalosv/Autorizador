importScripts(
	'https://www.gstatic.com/firebasejs/11.9.1/firebase-app-compat.js'
);
importScripts(
	'https://www.gstatic.com/firebasejs/11.9.1/firebase-messaging-compat.js'
);

firebase.initializeApp({
	apiKey: 'AIzaSyCPvhFLHzX6Mx3Cvjf6Zq3hbY8UI7iG79s',
	authDomain: 'autorizador-remoto.firebaseapp.com',
	projectId: 'autorizador-remoto',
	storageBucket: 'autorizador-remoto.firebasestorage.app',
	messagingSenderId: '448764386668',
	appId: '1:448764386668:web:02936cf72552a61d92e749',
	measurementId: 'G-K1H627GTPT',
});

const messaging = firebase.messaging();

// Manejar mensajes en segundo plano
messaging.onBackgroundMessage((payload) => {
	console.log('Mensaje recibido en segundo plano:', payload);

	const notificationTitle = payload.notification.title;
	const notificationOptions = {
		body: payload.notification.body,
		icon: payload.notification.icon,
	};

	return self.registration.showNotification(
		notificationTitle,
		notificationOptions
	);
});
