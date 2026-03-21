import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [formData, setFormData] = useState({
    phone: '',
    password: '',
    confirmPassword: '',
    name: '',
    carModel: '',
    carNumber: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();

  const formatPhoneNumber = (value) => {
    // Удаляем все нецифровые символы
    const numbers = value.replace(/\D/g, '');
    
    // Если начинается с 8, заменяем на +7
    if (numbers.startsWith('8')) {
      return '+7' + numbers.slice(1);
    }
    // Если 10 цифр и начинается с 9, добавляем +7
    if (numbers.startsWith('9') && numbers.length === 10) {
      return '+7' + numbers;
    }
    // Если уже есть +7, оставляем как есть
    if (value.startsWith('+7')) {
      return value;
    }
    // Если уже есть +7 с пробелами
    if (value.startsWith('+7')) {
      return '+7' + numbers.slice(2);
    }
    // Иначе возвращаем как есть
    return value;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Для телефона применяем форматирование
    if (name === 'phone') {
      const formatted = formatPhoneNumber(value);
      setFormData(prev => ({ ...prev, [name]: formatted }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      setError('Пароли не совпадают');
      return;
    }

    if (formData.password.length < 6) {
      setError('Пароль должен содержать минимум 6 символов');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await axios.post('http://87.249.44.239:5000/api/auth/register', {
        phone: formData.phone,
        password: formData.password,
        name: formData.name,
        carModel: formData.carModel,
        carNumber: formData.carNumber
      });
      
      console.log('Ответ сервера:', response.data);
      
      alert('Регистрация успешна! Теперь вы можете войти.');
      
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      
      navigate('/price-list');
      
    } catch (err) {
      console.error('Ошибка регистрации:', err);
      setError(err.response?.data?.error || 'Ошибка при регистрации');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">
      <h1>Регистрация</h1>
      
      <div className="card" style={{ maxWidth: '500px', margin: '0 auto' }}>
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
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Телефон *</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+7 (999) 123-45-67"
              required
              disabled={loading}
            />
            <small style={{ color: '#666', fontSize: '12px' }}>
              Введите номер в формате 9123456789 или +79123456789
            </small>
          </div>

          <div className="form-group">
            <label>Имя</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Ваше имя"
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label>Пароль *</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Минимум 6 символов"
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label>Подтверждение пароля *</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Повторите пароль"
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label>Марка и модель авто</label>
            <input
              type="text"
              name="carModel"
              value={formData.carModel}
              onChange={handleChange}
              placeholder="Например: Toyota Camry"
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label>Госномер</label>
            <input
              type="text"
              name="carNumber"
              value={formData.carNumber}
              onChange={handleChange}
              placeholder="А123БВ777"
              disabled={loading}
            />
          </div>

          <button 
            type="submit" 
            className="btn btn-primary" 
            style={{ 
              width: '100%',
              padding: '12px',
              fontSize: '16px',
              backgroundColor: '#2196F3',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: loading ? 'wait' : 'pointer',
              opacity: loading ? 0.7 : 1
            }}
            disabled={loading}
          >
            {loading ? 'Регистрация...' : 'Зарегистрироваться'}
          </button>
        </form>

        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <Link to="/login" style={{ color: '#2196F3', textDecoration: 'none' }}>
            Уже есть аккаунт? Войти
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;