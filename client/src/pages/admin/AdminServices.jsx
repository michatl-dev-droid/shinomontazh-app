import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const AdminServices = () => {
  const [services, setServices] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);
  const fileInputRef = useRef(null);
  
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
      setLoading(true);
      const response = await axios.get('http://87.249.44.239:5000/api/services');
      setServices(response.data);
    } catch (err) {
      console.error('Ошибка загрузки:', err);
    } finally {
      setLoading(false);
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
        await axios.put(`http://87.249.44.239:5000/api/services/${editingId}`, formData);
      } else {
        await axios.post('http://87.249.44.239:5000/api/services', formData);
      }
      setFormData({ name: '', category: '', price: '', carType: 'passenger' });
      setEditingId(null);
      fetchServices();
    } catch (err) {
      console.error('Ошибка сохранения:', err);
      alert('Ошибка при сохранении услуги');
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
        await axios.delete(`http://87.249.44.239:5000/api/services/${id}`);
        fetchServices();
      } catch (err) {
        console.error('Ошибка удаления:', err);
        alert('Ошибка при удалении услуги');
      }
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    
    setUploading(true);
    try {
      const response = await axios.post('http://87.249.44.239:5000/api/services/import-excel', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert(response.data.message || 'Импорт успешен');
      fetchServices();
      if (fileInputRef.current) fileInputRef.current.value = '';
    } catch (err) {
      console.error('Ошибка импорта:', err);
      const errorMsg = err.response?.data?.error || err.response?.data?.errors?.[0] || 'Ошибка импорта';
      alert(errorMsg);
    } finally {
      setUploading(false);
    }
  };

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '40px' }}>Загрузка...</div>;
  }

  return (
    <div className="admin-services" style={{ padding: '20px' }}>
      <h1>Управление услугами</h1>

      {/* Блок с кнопкой импорта и заголовком */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '20px',
        flexWrap: 'wrap',
        gap: '10px'
      }}>
        <h2 style={{ margin: 0 }}>
          {editingId ? 'Редактировать услугу' : 'Добавить новую услугу'}
        </h2>
        <div>
          <input
            type="file"
            ref={fileInputRef}
            accept=".xlsx, .xls, .csv"
            onChange={handleFileUpload}
            disabled={uploading}
            style={{ display: 'none' }}
            id="excel-upload"
          />
          <label 
            htmlFor="excel-upload" 
            style={{ 
              cursor: uploading ? 'wait' : 'pointer',
              background: uploading ? '#ccc' : '#4caf50',
              color: 'white',
              padding: '8px 16px',
              borderRadius: '4px',
              display: 'inline-block',
              fontSize: '14px',
              fontWeight: 'bold'
            }}
          >
            {uploading ? 'Загрузка...' : '📊 Импорт из Excel'}
          </label>
        </div>
      </div>

      {/* Форма добавления/редактирования */}
      <div className="card" style={{ 
        background: 'white', 
        padding: '20px', 
        borderRadius: '8px', 
        marginBottom: '30px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div className="form-group">
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Название услуги *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                required
              />
            </div>
            <div className="form-group">
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Категория *</label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                placeholder="Например: Легковые"
                style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                required
              />
            </div>
            <div className="form-group">
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Цена *</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                required
              />
            </div>
            <div className="form-group">
              <label style={{ display: 'block', marginBottom: '5px', fontWeight: '500' }}>Тип авто</label>
              <select
                name="carType"
                value={formData.carType}
                onChange={handleInputChange}
                style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
              >
                <option value="passenger">Легковые</option>
                <option value="suv">Внедорожники / SUV</option>
                <option value="truck">Грузовые</option>
              </select>
            </div>
          </div>
          <button 
            type="submit" 
            className="btn btn-primary" 
            style={{ 
              marginTop: '20px',
              padding: '10px 20px',
              background: '#2196F3',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
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
              style={{ 
                marginTop: '20px',
                marginLeft: '10px',
                padding: '10px 20px',
                background: '#f44336',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Отмена
            </button>
          )}
        </form>
      </div>

      {/* Список услуг */}
      <div className="services-list">
        <h2>Список услуг</h2>
        {services.length === 0 ? (
          <p style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
            Нет добавленных услуг
          </p>
        ) : (
          <table className="price-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#f5f5f5' }}>
                <th style={{ padding: '12px', textAlign: 'left' }}>Название</th>
                <th style={{ padding: '12px', textAlign: 'left' }}>Категория</th>
                <th style={{ padding: '12px', textAlign: 'left' }}>Цена</th>
                <th style={{ padding: '12px', textAlign: 'left' }}>Тип авто</th>
                <th style={{ padding: '12px', textAlign: 'left' }}>Действия</th>
              </tr>
            </thead>
            <tbody>
              {services.map(service => (
                <tr key={service._id} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '10px' }}>{service.name}</td>
                  <td style={{ padding: '10px' }}>{service.category}</td>
                  <td style={{ padding: '10px' }}>{service.price} ₽</td>
                  <td style={{ padding: '10px' }}>
                    {service.carType === 'passenger' ? 'Легковые' : 
                     service.carType === 'suv' ? 'Внедорожники' : 'Грузовые'}
                  </td>
                  <td style={{ padding: '10px' }}>
                    <button 
                      onClick={() => handleEdit(service)} 
                      style={{ 
                        marginRight: '5px', 
                        padding: '5px 10px',
                        background: '#2196F3',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                      }}
                    >
                      ✏️
                    </button>
                    <button 
                      onClick={() => handleDelete(service._id)}
                      style={{ 
                        padding: '5px 10px',
                        background: '#f44336',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                      }}
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminServices;