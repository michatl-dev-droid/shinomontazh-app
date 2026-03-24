import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CouponPopup = ({ onClose }) => {
  const [coupon, setCoupon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetchCoupon();
  }, []);

  const fetchCoupon = async () => {
    try {
      const response = await axios.get('http://87.249.44.239:5000/api/coupons/active');
      setCoupon(response.data);
    } catch (err) {
      console.error('Ошибка загрузки купона:', err);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    if (coupon && coupon.code) {
      navigator.clipboard.writeText(coupon.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (loading) return null;
  if (!coupon) return null;

  return (
    <div className="coupon-overlay">
      <div className="coupon-popup">
        <button className="coupon-close" onClick={onClose}>×</button>
        <div className="coupon-content">
          <div className="coupon-icon">🎁</div>
          <h2>Специальное предложение!</h2>
          <p className="coupon-discount">
            {coupon.discountType === 'percent' ? `${coupon.discount}%` : `${coupon.discount} ₽`} скидка
          </p>
          <p className="coupon-description">{coupon.description || 'на первый заказ'}</p>
          <div className="coupon-code" onClick={copyToClipboard}>
            <span>{coupon.code}</span>
            <button className="copy-btn">{copied ? '✓ Скопировано!' : '📋 Скопировать'}</button>
          </div>
          <p className="coupon-hint">Скопируйте промокод и используйте при записи</p>
        </div>
      </div>

      <style>{`
        .coupon-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0,0,0,0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10000;
        }
        .coupon-popup {
          background: white;
          border-radius: 20px;
          max-width: 400px;
          width: 90%;
          position: relative;
          animation: slideIn 0.3s ease;
        }
        .coupon-close {
          position: absolute;
          top: 15px;
          right: 20px;
          background: none;
          border: none;
          font-size: 28px;
          cursor: pointer;
          color: #999;
        }
        .coupon-content {
          padding: 30px 20px;
          text-align: center;
        }
        .coupon-icon {
          font-size: 60px;
          margin-bottom: 15px;
        }
        .coupon-popup h2 {
          color: #8B0000;
          margin-bottom: 10px;
        }
        .coupon-discount {
          font-size: 32px;
          font-weight: bold;
          color: #2196F3;
          margin: 15px 0;
        }
        .coupon-code {
          background: #f5f5f5;
          border-radius: 12px;
          padding: 12px;
          margin: 20px 0;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          cursor: pointer;
        }
        .coupon-code span {
          font-family: monospace;
          font-size: 18px;
          font-weight: bold;
          letter-spacing: 2px;
        }
        .copy-btn {
          background: #2196F3;
          color: white;
          border: none;
          padding: 8px 12px;
          border-radius: 6px;
          cursor: pointer;
        }
        .coupon-hint {
          font-size: 12px;
          color: #666;
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(-50px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default CouponPopup;