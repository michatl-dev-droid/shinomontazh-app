import React, { useState, useEffect } from 'react';
import CouponPopup from '../components/CouponPopup';

const Home = () => {
  const [showCoupon, setShowCoupon] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Проверяем, показывали ли купон сегодня
    const lastSeen = localStorage.getItem('couponLastSeen');
    const today = new Date().toDateString();
    
    if (lastSeen !== today) {
      setShowCoupon(true);
    }
    setLoading(false);
  }, []);

  const handleCloseCoupon = () => {
    setShowCoupon(false);
    localStorage.setItem('couponLastSeen', new Date().toDateString());
  };

  return (
    <div className="home-page">
      {/* Hero секция */}
      <div className="hero-section">
        <h1>Шиномонтаж24</h1>
        <p>Профессиональный шиномонтаж с заботой о вашем автомобиле</p>
        <button className="hero-btn" onClick={() => window.location.href = '/price-list'}>
          Перейти к ценам
        </button>
      </div>

      {/* Преимущества */}
      <div className="features">
        <div className="feature-card">
          <div className="feature-icon">🚗</div>
          <h3>Быстрый шиномонтаж</h3>
          <p>Современное оборудование и опытные мастера</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">📍</div>
          <h3>25 точек по городу</h3>
          <p>Удобное расположение рядом с домом или работой</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">💰</div>
          <h3>Прозрачные цены</h3>
          <p>Фиксированная стоимость без скрытых платежей</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">🎁</div>
          <h3>Скидки постоянным клиентам</h3>
          <p>Регистрируйтесь и получайте персональные предложения</p>
        </div>
      </div>

      {/* CTA секция */}
      <div className="cta-section">
        <h2>Готовы записаться?</h2>
        <button onClick={() => window.location.href = '/appointment'}>
          Записаться сейчас
        </button>
      </div>

      {/* Попап с купоном */}
      {showCoupon && <CouponPopup onClose={handleCloseCoupon} />}

      <style>{`
        .home-page {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
        }

        .hero-section {
          text-align: center;
          padding: 60px 20px;
          background: linear-gradient(135deg, #333 0%, #8B0000 100%);
          color: white;
          border-radius: 20px;
          margin-bottom: 40px;
        }

        .hero-section h1 {
          font-size: 2.5rem;
          margin-bottom: 20px;
          color: white;
        }

        .hero-section p {
          font-size: 1.2rem;
          margin-bottom: 30px;
          opacity: 0.9;
        }

        .hero-btn {
          padding: 12px 30px;
          font-size: 1.1rem;
          background: white;
          color: #8B0000;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-weight: bold;
          transition: transform 0.3s;
        }

        .hero-btn:hover {
          transform: scale(1.05);
        }

        .features {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 30px;
          margin-bottom: 40px;
        }

        .feature-card {
          background: white;
          padding: 30px;
          border-radius: 16px;
          text-align: center;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          transition: transform 0.3s;
        }

        .feature-card:hover {
          transform: translateY(-5px);
        }

        .feature-icon {
          font-size: 48px;
          margin-bottom: 15px;
        }

        .feature-card h3 {
          color: #8B0000;
          margin-bottom: 10px;
        }

        .feature-card p {
          color: #666;
          line-height: 1.5;
        }

        .cta-section {
          text-align: center;
          padding: 40px;
          background: #f5f5f5;
          border-radius: 20px;
        }

        .cta-section h2 {
          margin-bottom: 20px;
          color: #333;
        }

        .cta-section button {
          padding: 12px 30px;
          font-size: 1.1rem;
          background: #8B0000;
          color: white;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: background 0.3s;
        }

        .cta-section button:hover {
          background: #6a0000;
        }

        @media (max-width: 768px) {
          .hero-section h1 {
            font-size: 1.8rem;
          }
          .features {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default Home;