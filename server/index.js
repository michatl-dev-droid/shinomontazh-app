const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Подключение к MongoDB
console.log('🔄 Подключение к MongoDB...');
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB подключена'))
  .catch(err => {
    console.error('❌ Ошибка MongoDB:', err);
    process.exit(1);
  });

// Подключаем маршруты
app.use('/api/auth', require('./routes/auth'));
app.use('/api/services', require('./routes/services'));
app.use('/api/service-points', require('./routes/servicePoints'));
app.use('/api/appointments', require('./routes/appointments'));

// Тестовый маршрут
app.get('/', (req, res) => {
  res.json({ 
    message: 'Сервер работает!', 
    time: new Date().toLocaleString('ru-RU'),
    status: 'OK',
    environment: process.env.NODE_ENV || 'development'
  });
});

// HEALTH CHECK - должен быть ЗДЕСЬ
app.get('/health', (req, res) => {
  console.log('📊 Health check запрос получен');
  res.status(200).json({ 
    status: 'healthy',
    timestamp: new Date().toISOString(),
    mongodb: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});
// Специальный маршрут для Chrome DevTools (убирает ошибку)
app.get('/.well-known/appspecific/com.chrome.devtools.json', (req, res) => {
  res.status(200).json({});
});

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'healthy',
    timestamp: new Date().toISOString(),
    mongodb: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

// Обработка 404 - ЭТО В САМОМ КОНЦЕ
app.use((req, res) => {
  res.status(404).json({ error: 'Маршрут не найден' });
});
// Обработка 404 - ИСПРАВЛЕНО
app.use((req, res) => {
  res.status(404).json({ error: 'Маршрут не найден' });
});

// Глобальный обработчик ошибок
app.use((err, req, res, next) => {
  console.error('❌ Необработанная ошибка:', err);
  res.status(500).json({ 
    error: 'Внутренняя ошибка сервера',
    message: err.message 
  });
});

// Запуск сервера
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log('=================================');
  console.log('✅ ОСНОВНОЙ СЕРВЕР ЗАПУЩЕН!');
  console.log(`🌐 Порт: ${PORT}`);
  console.log(`🌍 Окружение: ${process.env.NODE_ENV || 'development'}`);
  console.log('=================================');
});

// Обработка завершения процесса
process.on('SIGINT', async () => {
  console.log('\n🔄 Завершение работы сервера...');
  await mongoose.disconnect();
  console.log('✅ Отключено от MongoDB');
  process.exit(0);
});

process.on('SIGTERM', async () => {
  console.log('\n🔄 Завершение работы сервера...');
  await mongoose.disconnect();
  console.log('✅ Отключено от MongoDB');
  process.exit(0);
});