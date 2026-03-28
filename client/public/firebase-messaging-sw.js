importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging-compat.js');

const firebaseConfig = {
  apiKey: "ВАШ_API_KEY",
  authDomain: "shinomontazh-push.firebaseapp.com",
  projectId: "shinomontazh-push",
  storageBucket: "shinomontazh-push.firebasestorage.app",
  messagingSenderId: "1010670762660",
  appId: "ВАШ_APP_ID"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('Фоновое уведомление:', payload);
  self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
    icon: '/favicon.svg',
    badge: '/favicon.svg'
  });
});