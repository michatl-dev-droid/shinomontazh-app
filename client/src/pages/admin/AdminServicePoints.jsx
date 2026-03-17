import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminServicePoints = () => {
  const [points, setPoints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: '',
    workingHours: '',
    coordinates: { lat: 55.751574, lng: 37.573856 }
  });

  useEffect(() => {
    fetchPoints();
  }, []);

  const fetchPoints = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/service-points');
      setPoints(response.data);
    } catch (err) {
      console.error('Ошибка загрузки точек:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'lat' || name === 'lng') {
      setFormData({
        ...formData,
        coordinates: {
          ...formData.coordinates,
          [name]: parseFloat(value)
        }
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`http://localhost:5000/api/service-points/${editingId}`, formData);
      } else {
        await axios.post('http://localhost:5000/api/service-points', formData);
      }
      setFormData({ name: '', address: '', phone: '', workingHours: '', coordinates: { lat: 55.751574, lng: 37.573856 } });
      setEditingId(null);
      fetchPoints();
    } catch (err) {
      console.error('Ошибка сохранения:', err);
    }
  };

  const handleEdit = (point) => {
    setEditingId(point._id);
    setFormData({
      name: point.name,
      address: point.address,
      phone: point.phone,
      workingHours: point.workingHours,
      coordinates: point.coordinates
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Удалить точку?')) {
      try {
        await axios.delete(`http://localhost:5000/api/service-points/${id}`);
        fetchPoints();
      } catch (err) {
        console.error('Ошибка удаления:', err);
      }
    }
  };

  if (loading) return <div>Загрузка...</div>;

  return (
    <div className="admin-service-points">
      <h1>Управление точками обслуживания</h1>

      <div style={{ background: 'white', padding: '20px', borderRadius: '8px', marginBottom: '30px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <h2>{editingId ? 'Редактировать точку' : 'Добавить новую точку'}</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '5px' }}>Название</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                required
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '5px' }}>Адрес</label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                required
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '5px' }}>Телефон</label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                required
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '5px' }}>Режим работы</label>
              <input
                type="text"
                name="workingHours"
                value={formData.workingHours}
                onChange={handleInputChange}
                placeholder="09:00 - 21:00"
                style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                required
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '5px' }}>Широта (lat)</label>
              <input
                type="number"
                name="lat"
                value={formData.coordinates.lat}
                onChange={handleInputChange}
                step="0.000001"
                style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                required
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '5px' }}>Долгота (lng)</label>
              <input
                type="number"
                name="lng"
                value={formData.coordinates.lng}
                onChange={handleInputChange}
                step="0.000001"
                style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
                required
              />
            </div>
          </div>
          <button type="submit" style={{
            marginTop: '20px',
            padding: '10px 20px',
            background: '#2196F3',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}>
            {editingId ? 'Сохранить изменения' : 'Добавить точку'}
          </button>
          {editingId && (
            <button 
              type="button" 
              onClick={() => {
                setEditingId(null);
                setFormData({ name: '', address: '', phone: '', workingHours: '', coordinates: { lat: 55.751574, lng: 37.573856 } });
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

      <div>
        <h2>Список точек</h2>
        {points.length === 0 ? (
          <p style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
            Нет добавленных точек
          </p>
        ) : (
          <div style={{ display: 'grid', gap: '15px' }}>
            {points.map(point => (
              <div key={point._id} style={{
                background: 'white',
                padding: '20px',
                borderRadius: '8px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                  <div>
                    <h3>{point.name}</h3>
                    <p><strong>Адрес:</strong> {point.address}</p>
                    <p><strong>Телефон:</strong> {point.phone}</p>
                    <p><strong>Режим работы:</strong> {point.workingHours}</p>
                    <p><strong>Координаты:</strong> {point.coordinates.lat}, {point.coordinates.lng}</p>
                  </div>
                  <div>
                    <button 
                      onClick={() => handleEdit(point)}
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
                      onClick={() => handleDelete(point._id)}
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
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminServicePoints;