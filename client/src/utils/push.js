// Запрос разрешения на уведомления
export async function requestNotificationPermission() {
  if (!('Notification' in window)) {
    console.log('Браузер не поддерживает уведомления');
    alert('Ваш браузер не поддерживает уведомления');
    return false;
  }
  
  const permission = await Notification.requestPermission();
  if (permission === 'granted') {
    console.log('Уведомления разрешены');
    return true;
  } else {
    console.log('Уведомления запрещены');
    return false;
  }
}

// Отправка тестового уведомления
export function sendNotification(title, body, url) {
  if (Notification.permission === 'granted') {
    const notification = new Notification(title, {
      body: body,
      icon: '/favicon.svg',
      badge: '/favicon.svg',
      vibrate: [200, 100, 200]
    });
    
    notification.onclick = function() {
      window.focus();
      if (url) window.location.href = url;
    };
    
    return true;
  }
  return false;
}

// Отправка уведомления о купоне
export function sendCouponNotification(couponCode, discount) {
  return sendNotification(
    '🎁 Новый купон!',
    `Скидка ${discount}% по промокоду: ${couponCode}`,
    '/price-list'
  );
}