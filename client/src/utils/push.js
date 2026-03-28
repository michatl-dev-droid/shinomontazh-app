import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js';
import { getMessaging, getToken, onMessage } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging.js';

// ВСТАВЬТЕ ВАШИ ДАННЫЕ ИЗ FIREBASE
const firebaseConfig = {
  apiKey: "ВАШ_API_KEY",
  authDomain: "ВАШ_AUTH_DOMAIN",
  projectId: "ВАШ_PROJECT_ID",
  storageBucket: "ВАШ_STORAGE_BUCKET",
  messagingSenderId: "ВАШ_MESSAGING_SENDER_ID",
  appId: "ВАШ_APP_ID"
};

// VAPID ключ из Firebase (Cloud Messaging)
const VAPID_KEY = "ВАШ_VAPID_КЛЮЧ";

let messaging = null;
let token = null;

// Инициализация Firebase
export function initFirebase() {
  if (!messaging) {
    const app = initializeApp(firebaseConfig);
    messaging = getMessaging(app);
  }
  return messaging;
}

// Запрос разрешения и получение токена
export async function requestNotificationPermission() {
  if (!('Notification' in window)) {
    alert('Ваш браузер не поддерживает уведомления');
    return false;
  }
  
  const permission = await Notification.requestPermission();
  if (permission !== 'granted') {
    alert('Уведомления не разрешены');
    return false;
  }
  
  try {
    initFirebase();
    
    // Регистрируем service worker
    const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js');
    console.log('Service Worker зарегистрирован');
    
    // Получаем токен
    token = await getToken(messaging, {
      vapidKey: VAPID_KEY,
      serviceWorkerRegistration: registration
    });
    
    console.log('FCM Token:', token);
    
    // Сохраняем токен на сервере
    await fetch('/api/push/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, type: 'firebase' })
    });
    
    // Слушаем уведомления, когда сайт открыт
    onMessage(messaging, (payload) => {
      console.log('Получено уведомление:', payload);
      new Notification(payload.notification.title, {
        body: payload.notification.body,
        icon: '/favicon.svg'
      });
    });
    
    return true;
  } catch (err) {
    console.error('Ошибка:', err);
    alert('Ошибка подключения уведомлений');
    return false;
  }
}

// Отправка тестового уведомления (через сервер)
export async function sendTestNotification() {
  const response = await fetch('/api/push/send-firebase', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      title: '🎁 Тестовый купон!',
      body: 'Скидка 10% по промокоду TEST10',
      url: '/price-list'
    })
  });
  const result = await response.json();
  console.log(result);
}