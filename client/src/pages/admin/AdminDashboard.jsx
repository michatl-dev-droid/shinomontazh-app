import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    services: 0,
    points: 0,
    appointments: 0,
    users: 0
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [services, points, appointments, users] = await Promise.all([
        axios.get('http://localhost:5000/api/services'),
        axios.get('http://localhost:5000/api/service-points'),
        axios.get('http://localhost:5000/api/appointments'),
        axios.get('http://localhost:5000/api/auth/users')
      ]);
      
      setStats({
        services: services.data.length,
        points: points.data.length,
        appointments: appointments.data.length,
        users: users.data.length
      });
    } catch (err) {
      console.error('Ошибка загрузки статистики:', err);
    }
  };

  return (
    <div className="admin-dashboard">
      <h1>Панель управления</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginTop: '30px' }}>
        <Link to="/admin/services" style={{ textDecoration: 'none' }}>
          <div className="stat-card" style={{ background: '#fff9e6', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            <h3 style={{ color: '#333', marginBottom: '10px' }}>Услуги</h3>
            <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#2196F3' }}>{stats.services}</p>
            <p style={{ color: '#666' }}>позиций в прайс-листе</p>
          </div>
        </Link>

        <Link to="/admin/service-points" style={{ textDecoration: 'none' }}>
          <div className="stat-card" style={{ background: '#e6f3ff', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            <h3 style={{ color: '#333', marginBottom: '10px' }}>Точки</h3>
            <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#4CAF50' }}>{stats.points}</p>
            <p style={{ color: '#666' }}>обслуживания</p>
          </div>
        </Link>

        <Link to="/admin/appointments" style={{ textDecoration: 'none' }}>
          <div className="stat-card" style={{ background: '#f5f5f5', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            <h3 style={{ color: '#333', marginBottom: '10px' }}>Записи</h3>
            <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#FF9800' }}>{stats.appointments}</p>
            <p style={{ color: '#666' }}>клиентов</p>
          </div>
        </Link>

        <Link to="/admin/users" style={{ textDecoration: 'none' }}>
          <div className="stat-card" style={{ background: '#f5f5f5', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            <h3 style={{ color: '#333', marginBottom: '10px' }}>Пользователи</h3>
            <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#9C27B0' }}>{stats.users}</p>
            <p style={{ color: '#666' }}>зарегистрировано</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;