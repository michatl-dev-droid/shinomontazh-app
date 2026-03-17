import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Appointment = () => {
  const [user, setUser] = useState(null);
  const [servicePoints, setServicePoints] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const [formData, setFormData] = useState({
    servicePoint: '',
    service: '',
    date: '',
    time: '',
    carModel: '',
    carNumber: '',
    comment: ''
  });

  const navigate = useNavigate();

  // Загружаем данные пользователя при монтировании
  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (!userStr) {
      // Если пользователь не авторизован, перенаправляем на страницу входа
      navigate('/login');
      return;
    }

    try {
      const userData = JSON.parse(userStr);
      setUser(userData);
      
      // Предзаполняем данные автомобиля, если они есть у пользователя
      setFormData(prev => ({
        ...prev,
        carModel: userData.carModel || '',
        carNumber: userData.carNumber || ''
      }));
    } catch (err) {
      console.error('Ошибка парсинга пользователя:', err);
      navigate('/login');
    }
  }, [navigate]);

  // Загружаем точки обслуживания и услуги
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [pointsRes, servicesRes] = await Promise.all([
          axios.get('http://localhost:5000/api/service-points'),
          axios.get('http://localhost:5000/api/services')
        ]);
        
        setServicePoints(pointsRes.data);
        setServices(servicesRes.data);
      } catch (err) {
        console.error('Ошибка загрузки данных:', err);
        setError('Не удалось загрузить данные. Пожалуйста, обновите страницу.');
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchData();
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setSubmitting(true);

    // Проверка заполнения обязательных полей
    if (!formData.servicePoint || !formData.service || !formData.date || !formData.time) {
      setError('Пожалуйста, заполните все обязательные поля');
      setSubmitting(false);
      return;
    }

    try {
      // Подготавливаем данные для отправки
      const appointmentData = {
        user: user._id,
        servicePoint: formData.servicePoint,
        service: formData.service,
        date: formData.date,
        time: formData.time,
        carModel: formData.carModel || user.carModel || '',
        carNumber: formData.carNumber || user.carNumber || '',
        comment: formData.comment || '',
        status: 'pending'
      };

      console.log('Отправка данных:', appointmentData);

      const response = await axios.post('http://localhost:5000/api/appointments', appointmentData);
      
      console.log('Ответ сервера:', response.data);
      
      setSuccess('Заявка успешно отправлена! Мы свяжемся с вами для подтверждения.');
      
      // Очищаем форму, но сохраняем данные автомобиля из профиля
      setFormData({
        servicePoint: '',
        service: '',
        date: '',
        time: '',
        carModel: user.carModel || '',
        carNumber: user.carNumber || '',
        comment: ''
      });

      // Через 3 секунды убираем сообщение об успехе
      setTimeout(() => setSuccess(''), 3000);

    } catch (err) {
      console.error('Ошибка при отправке:', err);
      setError(err.response?.data?.error || 'Произошла ошибка при отправке заявки');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '40px' }}>
        <p>Загрузка...</p>
      </div>
    );
  }

  return (
    <div className="appointment-page">
      <h1>Запись на сервис</h1>
      
      <div className="card" style={{ maxWidth: '600px', margin: '0 auto' }}>
        {error && (
          <div style={{ 
            background: '#ffebee', 
            color: '#c62828', 
            padding: '10px', 
            borderRadius: '4px',
            marginBottom: '20px'
          }}>
            {error}
          </div>
        )}

        {success && (
          <div style={{ 
            background: '#e8f5e8', 
            color: '#2e7d32', 
            padding: '10px', 
            borderRadius: '4px',
            marginBottom: '20px'
          }}>
            {success}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          {/* Точка обслуживания */}
          <div className="form-group">
            <label>Выберите точку обслуживания *</label>
            <select
              name="servicePoint"
              value={formData.servicePoint}
              onChange={handleChange}
              required
              disabled={submitting}
              style={{ width: '100%', padding: '10px', fontSize: '16px' }}
            >
              <option value="">-- Выберите точку --</option>
              {servicePoints.map(point => (
                <option key={point._id} value={point._id}>
                  {point.name} - {point.address}
                </option>
              ))}
            </select>
          </div>

          {/* Услуга */}
          <div className="form-group">
            <label>Выберите услугу *</label>
            <select
              name="service"
              value={formData.service}
              onChange={handleChange}
              required
              disabled={submitting}
              style={{ width: '100%', padding: '10px', fontSize: '16px' }}
            >
              <option value="">-- Выберите услугу --</option>
              {services.map(service => (
                <option key={service._id} value={service._id}>
                  {service.name} - {service.price} ₽
                </option>
              ))}
            </select>
          </div>

          {/* Дата и время */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div className="form-group">
              <label>Дата *</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                min={new Date().toISOString().split('T')[0]}
                required
                disabled={submitting}
                style={{ width: '100%', padding: '10px', fontSize: '16px' }}
              />
            </div>

            <div className="form-group">
              <label>Время *</label>
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                required
                disabled={submitting}
                style={{ width: '100%', padding: '10px', fontSize: '16px' }}
              />
            </div>
          </div>

          {/* Данные автомобиля */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div className="form-group">
              <label>Марка и модель авто</label>
              <input
                type="text"
                name="carModel"
                value={formData.carModel}
                onChange={handleChange}
                placeholder="Например: Toyota Camry"
                disabled={submitting}
                style={{ width: '100%', padding: '10px', fontSize: '16px' }}
              />
            </div>

            <div className="form-group">
              <label>Государственный номер</label>
              <input
                type="text"
                name="carNumber"
                value={formData.carNumber}
                onChange={handleChange}
                placeholder="А123БВ777"
                disabled={submitting}
                style={{ width: '100%', padding: '10px', fontSize: '16px' }}
              />
            </div>
          </div>

          {/* Комментарий */}
          <div className="form-group">
            <label>Комментарий</label>
            <textarea
              name="comment"
              value={formData.comment}
              onChange={handleChange}
              rows="3"
              placeholder="Дополнительные пожелания, особенности автомобиля и т.д."
              disabled={submitting}
              style={{ width: '100%', padding: '10px', fontSize: '16px', resize: 'vertical' }}
            />
          </div>

          {/* Кнопка отправки */}
          <button
            type="submit"
            disabled={submitting}
            style={{
              width: '100%',
              padding: '12px',
              background: submitting ? '#ccc' : '#2196F3',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              fontSize: '16px',
              cursor: submitting ? 'wait' : 'pointer',
              marginTop: '20px'
            }}
          >
            {submitting ? 'Отправка...' : 'Записаться на сервис'}
          </button>
        </form>

        {/* Информация о пользователе */}
        {user && (
          <div style={{ 
            marginTop: '20px', 
            padding: '10px', 
            background: '#f5f5f5', 
            borderRadius: '4px',
            fontSize: '14px',
            color: '#666'
          }}>
            <p>Вы авторизованы как: {user.name || user.phone}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Appointment;