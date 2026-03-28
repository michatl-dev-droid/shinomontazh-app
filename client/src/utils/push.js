// Функция для преобразования ключа
function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

// Получение VAPID ключа с сервера
async function getVapidPublicKey() {
  const response = await fetch('/api/push/key');
  const data = await response.json();
  return data.publicKey;
}

// Сохранение подписки на сервере
export async function subscribeToServer() {
  if (!('serviceWorker' in navigator)) return false;
  
  const registration = await navigator.serviceWorker.ready;
  const vapidPublicKey = await getVapidPublicKey();
  
  const subscription = await registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(vapidPublicKey)
  });
  
  await fetch('/api/push/subscribe', {
    method: 'POST',
    body: JSON.stringify(subscription),
    headers: { 'Content-Type': 'application/json' }
  });
  
  return true;
}

// Запрос разрешения на уведомления
export async function requestNotificationPermission() {
  if (!('Notification' in window)) {
    alert('Браузер не поддерживает уведомления');
    return false;
  }
  
  const permission = await Notification.requestPermission();
  if (permission !== 'granted') return false;
  
  // Регистрируем service worker
  if ('serviceWorker' in navigator) {
    await navigator.serviceWorker.register('/sw.js');
    await subscribeToServer();
  }
  
  return true;
}

// Отправка уведомления о купоне (локально, для теста)
export function sendCouponNotification(couponCode, discount) {
  if (Notification.permission === 'granted') {
    new Notification('🎁 Новый купон!', {
      body: `Скидка ${discount}% по промокоду: ${couponCode}`,
      icon: '/favicon.svg',
      badge: '/favicon.svg'
    });
  }
}