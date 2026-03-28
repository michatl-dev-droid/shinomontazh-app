import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { requestNotificationPermission, sendCouponNotification } from '../utils/push';

const Home = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [notifying, setNotifying] = useState(false);

  const enableNotifications = async () => {
    const granted = await requestNotificationPermission();
    setNotificationsEnabled(granted);
    if (granted) {
      alert('✅ Уведомления включены! Теперь вы будете получать информацию о скидках.');
    }
  };

  const sendTestCoupon = () => {
    if (notificationsEnabled) {
      sendCouponNotification('WELCOME10', 10);
    } else {
      alert('🔔 Сначала включите уведомления');
    }
  };

  return (
    <div className="home-page">
      {/* Hero секция */}
      <div className="hero">
        <h1>Шиномонтаж24</h1>
        <p>Профессиональный шиномонтаж в 25 точках вашего города</p>
        <div className="hero-buttons">
          <Link to="/appointment" className="btn-primary">📅 Записаться онлайн</Link>
          <Link to="/price-list" className="btn-secondary">💰 Посмотреть цены</Link>
        </div>
        
        {/* Кнопка включения уведомлений */}
        {!notificationsEnabled && (
          <button onClick={enableNotifications} className="btn-push">
            🔔 Включить уведомления о скидках
          </button>
        )}
        
        {/* Кнопка тестового уведомления */}
        {notificationsEnabled && (
          <button onClick={sendTestCoupon} className="btn-test">
            📱 Тестовое уведомление о купоне
          </button>
          {/* Всегда показывать кнопку для теста */}
<button onClick={sendTestCoupon} className="btn-test">
  📱 Тестовое уведомление о купоне
</button>
        )}
      </div>

      {/* Преимущества */}
      <div className="features">
        <div className="feature">
          <div className="feature-icon">🚗</div>
          <h3>25 точек</h3>
          <p>Удобное расположение рядом с домом или работой</p>
        </div>
        <div className="feature">
          <div className="feature-icon">⚡</div>
          <h3>Быстро</h3>
          <p>Среднее время обслуживания — 30 минут</p>
        </div>
        <div className="feature">
          <div className="feature-icon">💰</div>
          <h3>Прозрачные цены</h3>
          <p>Фиксированная стоимость без скрытых платежей</p>
        </div>
        <div className="feature">
          <div className="feature-icon">🎁</div>
          <h3>Бонусы</h3>
          <p>Скидки постоянным клиентам и купоны</p>
        </div>
      </div>

      {/* Призыв к действию */}
      <div className="cta">
        <h2>Готовы записаться?</h2>
        <p>Выберите удобную точку и время</p>
        <Link to="/appointment" className="btn-cta">Записаться сейчас →</Link>
      </div>

      <style>{`
        .home-page {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
        }

        /* Hero секция */
        .hero {
          text-align: center;
          padding: 60px 20px;
          background: linear-gradient(135deg, #333 0%, #8B0000 100%);
          border-radius: 24px;
          color: white;
          margin-bottom: 40px;
        }
        .hero h1 {
          font-size: 2.5rem;
          margin-bottom: 20px;
          color: white;
        }
        .hero p {
          font-size: 1.2rem;
          margin-bottom: 30px;
          opacity: 0.9;
        }
        .hero-buttons {
          display: flex;
          gap: 15px;
          justify-content: center;
          flex-wrap: wrap;
          margin-bottom: 20px;
        }
        .hero a {
          display: inline-block;
          padding: 12px 28px;
          border-radius: 40px;
          text-decoration: none;
          font-weight: bold;
          transition: transform 0.2s;
        }
        .hero a:hover {
          transform: translateY(-2px);
        }
        .btn-primary {
          background: white;
          color: #8B0000;
        }
        .btn-secondary {
          background: transparent;
          color: white;
          border: 2px solid white;
        }
        .btn-push, .btn-test {
          margin-top: 10px;
          padding: 10px 24px;
          border-radius: 40px;
          border: none;
          cursor: pointer;
          font-weight: bold;
          transition: opacity 0.2s;
        }
        .btn-push {
          background: #ff9800;
          color: white;
        }
        .btn-test {
          background: #4caf50;
          color: white;
        }
        .btn-push:hover, .btn-test:hover {
          opacity: 0.9;
        }

        /* Преимущества */
        .features {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 30px;
          margin-bottom: 60px;
        }
        .feature {
          background: white;
          padding: 30px 20px;
          border-radius: 20px;
          text-align: center;
          box-shadow: 0 4px 15px rgba(0,0,0,0.08);
          transition: transform 0.2s;
        }
        .feature:hover {
          transform: translateY(-5px);
        }
        .feature-icon {
          font-size: 48px;
          margin-bottom: 15px;
        }
        .feature h3 {
          color: #8B0000;
          margin-bottom: 12px;
          font-size: 1.3rem;
        }
        .feature p {
          color: #666;
          line-height: 1.5;
        }

        /* CTA секция */
        .cta {
          text-align: center;
          padding: 50px 20px;
          background: #f5f5f5;
          border-radius: 24px;
        }
        .cta h2 {
          color: #333;
          margin-bottom: 10px;
        }
        .cta p {
          color: #666;
          margin-bottom: 25px;
        }
        .btn-cta {
          display: inline-block;
          padding: 14px 32px;
          background: #8B0000;
          color: white;
          text-decoration: none;
          border-radius: 40px;
          font-weight: bold;
          transition: background 0.2s;
        }
        .btn-cta:hover {
          background: #6a0000;
        }

        /* Мобильная версия */
        @media (max-width: 768px) {
          .hero h1 {
            font-size: 1.8rem;
          }
          .hero p {
            font-size: 1rem;
          }
          .hero-buttons a {
            display: block;
            margin: 10px;
          }
          .features {
            grid-template-columns: 1fr;
            gap: 20px;
          }
          .cta {
            padding: 30px 20px;
          }
        }
      `}</style>
    </div>
  );
};

export default Home;