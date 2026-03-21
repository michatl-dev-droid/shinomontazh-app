import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ServicePoints = () => {
  const [points, setPoints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchPoints();
  }, []);

  const fetchPoints = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://87.249.44.239:5000/api/service-points');
      console.log('Загружены точки:', response.data);
      setPoints(response.data);
      setError('');
    } catch (err) {
      console.error('Ошибка загрузки точек:', err);
      setError('Не удалось загрузить точки обслуживания');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="service-points">
        <h1>Наши точки обслуживания</h1>
        <p style={{ textAlign: 'center', padding: '40px' }}>Загрузка...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="service-points">
        <h1>Наши точки обслуживания</h1>
        <p style={{ textAlign: 'center', color: 'red', padding: '40px' }}>{error}</p>
      </div>
    );
  }

  return (
    <div className="service-points">
      <h1>Наши точки обслуживания</h1>
      
      {points.length === 0 ? (
        <p style={{ textAlign: 'center', padding: '40px' }}>Нет добавленных точек</p>
      ) : (
        <div className="points-grid">
          {points.map((point) => (
            <div key={point._id} className="point-card">
              <h3>{point.name}</h3>
              <p className="address">
                <strong>Адрес:</strong> {point.address}
              </p>
              <p className="phone">
                <strong>Телефон:</strong> {point.phone}
              </p>
              <p className="hours">
                <strong>Режим работы:</strong> {point.workingHours}
              </p>
              <button 
                className="btn-select"
                onClick={() => window.location.href = '/appointment'}
              >
                Записаться
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ServicePoints;