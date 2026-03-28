const router = require('express').Router();

// Хранилище токенов (временно, потом в БД)
let firebaseTokens = [];

// Сохранение токена
router.post('/subscribe', (req, res) => {
  const { token, type } = req.body;
  if (type === 'firebase' && token) {
    if (!firebaseTokens.includes(token)) {
      firebaseTokens.push(token);
      console.log('✅ Новый токен, всего:', firebaseTokens.length);
    }
  }
  res.json({ success: true });
});

// Отправка через Firebase
router.post('/send-firebase', async (req, res) => {
  const { title, body, url } = req.body;
  
  const axios = require('axios');
  const results = [];
  
  for (const token of firebaseTokens) {
    try {
      await axios.post('https://fcm.googleapis.com/fcm/send', {
        to: token,
        notification: {
          title: title,
          body: body,
          icon: '/favicon.svg',
          badge: '/favicon.svg'
        },
        data: {
          url: url || '/',
          click_action: 'https://мастершин24.рф'
        }
      }, {
        headers: {
          'Authorization': 'key=ВАШ_SERVER_KEY',
          'Content-Type': 'application/json'
        }
      });
      results.push({ success: true });
    } catch (err) {
      results.push({ success: false, error: err.message });
    }
  }
  
  res.json({ sent: results.length, total: firebaseTokens.length });
});

module.exports = router;