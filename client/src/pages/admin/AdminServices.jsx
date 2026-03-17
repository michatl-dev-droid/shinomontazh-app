import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminServices = () => {
  const [services, setServices] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    carType: 'passenger'
  });

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/services');
      setServices(response.data);
    } catch (err) {
      console.error('Ошибка загрузки:', err);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`http://localhost:5000/api/services/${editingId}`, formData);
      } else {
        await axios.post('http://localhost:5000/api/services', formData);
      }
      setFormData({ name: '', category: '', price: '', carType: 'passenger' });
      setEditingId(null);
      fetchServices();
    } catch (err) {
      console.error('Ошибка сохранения:', err);
    }
  };

  const handleEdit = (service) => {
    setEditingId(service._id);
    setFormData({
      name: service.name,
      category: service.category,
      price: service.price,
      carType: service.carType
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Удалить услугу?')) {
      try {
        await axios.delete(`http://localhost:5000/api/services/${id}`);
        fetchServices();
      } catch (err) {
        console.error('Ошибка удаления:', err);
      }
    }
  };

  return (
    <div className="admin-services">
      <h1>Управление услугами</h1>

      <div className="card" style={{ marginBottom: '30px' }}>
        <h2>{editingId ? 'Редактировать услугу' : 'Добавить новую услугу'}</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div className="form-group">
              <label>Название услуги</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Категория</label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                placeholder="Например: Легковые"
                required
              />
            </div>
            <div className="form-group">
              <label>Цена (₽)</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Тип авто</label>
              <select
                name="carType"
                value={formData.carType}
                onChange={handleInputChange}
              >
                <option value="passenger">Легковые</option>
                <option value="suv">Внедорожники</option>
                <option value="truck">Грузовые</option>
              </select>
            </div>
          </div>
          <button type="submit" className="btn btn-primary" style={{ marginTop: '20px' }}>
            {editingId ? 'Сохранить изменения' : 'Добавить услугу'}
          </button>
          {editingId && (
            <button 
              type="button" 
              className="btn btn-secondary" 
              onClick={() => {
                setEditingId(null);
                setFormData({ name: '', category: '', price: '', carType: 'passenger' });
              }}
              style={{ marginLeft: '10px' }}
            >
              Отмена
            </button>
          )}
        </form>
      </div>

      <div className="services-list">
        <table className="price-table" style={{ width: '100%' }}>
          <thead>
            <tr>
              <th>Название</th>
              <th>Категория</th>
              <th>Цена</th>
              <th>Тип авто</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            {services.map(service => (
              <tr key={service._id}>
                <td>{service.name}</td>
                <td>{service.category}</td>
                <td>{service.price} ₽</td>
                <td>{service.carType}</td>
                <td>
                  <button onClick={() => handleEdit(service)} style={{ marginRight: '5px' }}>✏️</button>
                  <button onClick={() => handleDelete(service._id)}>🗑️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminServices;