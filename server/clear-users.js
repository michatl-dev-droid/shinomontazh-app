const mongoose = require('mongoose');
require('dotenv').config();

async function clearUsers() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    const db = mongoose.connection.db;
    await db.collection('users').deleteMany({});
    console.log('✅ Все пользователи удалены');
  } catch (err) {
    console.error('❌ Ошибка:', err);
  } finally {
    await mongoose.disconnect();
    process.exit();
  }
}

clearUsers();