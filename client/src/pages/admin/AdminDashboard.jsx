import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    services: 0,
    points: 0,
    appointments: 0,
    users: 0,
    coupons: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const [services, points, appointments, users, coupons] = await Promise.all([
        axios.get('http://87.249.44.239:5000/api/services'),
        axios.get('http://87.249.44.239:5000/api/service-points'),
        axios.get('http://87.249.44.239:5000/api/appointments'),
        axios.get('http://87.249.44.239:5000/api/auth/users'),
        axios.get('http://87.249.44.239:5000/api/coupons')
      ]);
      
      setStats({
        services: services.data.length,
        points: points.data.length,
        appointments: appointments.data.length,
        users: users.data.length,
        coupons: coupons.data.length
      });
    } catch (err) {
      console.error('Ошибка загрузки статистики:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '40px' }}>
        <p>Загрузка статистики...</p>
      </div>
    );
  }

  return (
    <div className="admin-dashboard" style={{ padding: '20px' }}>
      <h1>Панель управления</h1>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
        gap: '20px', 
        marginTop: '30px' 
      }}>
        {/* Услуги */}
        <Link to="/admin/services" style={{ textDecoration: 'none' }}>
          <div className="stat-card" style={{ 
            background: '#fff9e6', 
            padding: '20px', 
            borderRadius: '12px', 
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            transition: 'transform 0.2s',
            cursor: 'pointer'
          }}>
            <h3 style={{ color: '#333', marginBottom: '10px' }}>📋 Услуги</h3>
            <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#2196F3', margin: '10px 0' }}>{stats.services}</p>
            <p style={{ color: '#666' }}>позиций в прайс-листе</p>
          </div>
        </Link>

        {/* Точки */}
        <Link to="/admin/service-points" style={{ textDecoration: 'none' }}>
          <div className="stat-card" style={{ 
            background: '#e6f3ff', 
            padding: '20px', 
            borderRadius: '12px', 
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            transition: 'transform 0.2s',
            cursor: 'pointer'
          }}>
            <h3 style={{ color: '#333', marginBottom: '10px' }}>📍 Точки</h3>
            <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#4CAF50', margin: '10px 0' }}>{stats.points}</p>
            <p style={{ color: '#666' }}>обслуживания</p>
          </div>
        </Link>

        {/* Записи */}
        <Link to="/admin/appointments" style={{ textDecoration: 'none' }}>
          <div className="stat-card" style={{ 
            background: '#f5f5f5', 
            padding: '20px', 
            borderRadius: '12px', 
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            transition: 'transform 0.2s',
            cursor: 'pointer'
          }}>
            <h3 style={{ color: '#333', marginBottom: '10px' }}>📅 Записи</h3>
            <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#FF9800', margin: '10px 0' }}>{stats.appointments}</p>
            <p style={{ color: '#666' }}>клиентов</p>
          </div>
        </Link>

        {/* Пользователи */}
        <Link to="/admin/users" style={{ textDecoration: 'none' }}>
          <div className="stat-card" style={{ 
            background: '#f5f5f5', 
            padding: '20px', 
            borderRadius: '12px', 
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            transition: 'transform 0.2s',
            cursor: 'pointer'
          }}>
            <h3 style={{ color: '#333', marginBottom: '10px' }}>👥 Пользователи</h3>
            <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#9C27B0', margin: '10px 0' }}>{stats.users}</p>
            <p style={{ color: '#666' }}>зарегистрировано</p>
          </div>
        </Link>

        {/* Купоны */}
        <Link to="/admin/coupons" style={{ textDecoration: 'none' }}>
          <div className="stat-card" style={{ 
            background: '#fff3e0', 
            padding: '20px', 
            borderRadius: '12px', 
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            transition: 'transform 0.2s',
            cursor: 'pointer'
          }}>
            <h3 style={{ color: '#333', marginBottom: '10px' }}>🎁 Купоны</h3>
            <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#FF6F00', margin: '10px 0' }}>{stats.coupons}</p>
            <p style={{ color: '#666' }}>активных купонов</p>
          </div>
        </Link>
      </div>

      <div style={{ marginTop: '40px' }}>
        <h2>Быстрые действия</h2>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '20px' }}>
          <Link to="/admin/services">
            <button className="btn btn-primary" style={{ padding: '10px 20px', background: '#2196F3', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
              ➕ Добавить услугу
            </button>
          </Link>
          <Link to="/admin/service-points">
            <button className="btn btn-primary" style={{ padding: '10px 20px', background: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
              📍 Добавить точку
            </button>
          </Link>
          <Link to="/admin/coupons">
            <button className="btn btn-primary" style={{ padding: '10px 20px', background: '#FF6F00', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
              🎁 Создать купон
            </button>
          </Link>
          <Link to="/admin/appointments">
            <button className="btn btn-secondary" style={{ padding: '10px 20px', background: '#f5f5f5', color: '#333', border: '1px solid #ddd', borderRadius: '4px', cursor: 'pointer' }}>
              📋 Все записи
            </button>
          </Link>
        </div>
      </div>

      <style>{`
        .stat-card {
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .stat-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }
        .btn-primary, .btn-secondary {
          transition: opacity 0.2s;
        }
        .btn-primary:hover, .btn-secondary:hover {
          opacity: 0.9;
        }
      `}</style>
    </div>
  );
};

export default AdminDashboard;