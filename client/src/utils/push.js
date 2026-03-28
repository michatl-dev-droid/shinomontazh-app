import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js';
import { getMessaging, getToken, onMessage } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging.js';

const firebaseConfig = {
  apiKey: "ВАШ_API_KEY",
  authDomain: "shinomontazh-push.firebaseapp.com",
  projectId: "shinomontazh-push",
  storageBucket: "shinomontazh-push.firebasestorage.app",
  messagingSenderId: "1010670762660",
  appId: "ВАШ_APP_ID"
};

const VAPID_KEY = "BEeNJ_dIFRD12d1ErRNcOn4uOUVr2qplTo2okPzbI5pRkQ5f9dyq3nfqEo9Er3AKRzY7lSUq-FErp3FZiCDwc-M";

let messaging = null;

export async function requestNotificationPermission() {
  if (!('Notification' in window)) {
    alert('Ваш браузер не поддерживает уведомления');
    return false;
  }
  
  const permission = await Notification.requestPermission();
  if (permission !== 'granted') return false;
  
  try {
    const app = initializeApp(firebaseConfig);
    messaging = getMessaging(app);
    
    const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js');
    
    const token = await getToken(messaging, {
      vapidKey: VAPID_KEY,
      serviceWorkerRegistration: registration
    });
    
    console.log('FCM Token:', token);
    
    await fetch('/api/push/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, type: 'firebase' })
    });
    
    onMessage(messaging, (payload) => {
      console.log('Уведомление:', payload);
      new Notification(payload.notification.title, {
        body: payload.notification.body,
        icon: '/favicon.svg'
      });
    });
    
    return true;
  } catch (err) {
    console.error('Ошибка:', err);
    return false;
  }
}

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
  alert('Уведомление отправлено!');
}