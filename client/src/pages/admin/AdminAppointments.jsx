import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      console.log('📥 Загружаем записи...');
      const response = await axios.get('http:///87.249.44.239:5000/api/appointments');
      console.log('✅ Получены записи:', response.data);
      setAppointments(response.data);
      setError('');
    } catch (err) {
      console.error('❌ Ошибка загрузки:', err);
      setError('Не удалось загрузить записи');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []); // Загружаем при монтировании

  const updateStatus = async (id, status) => {
    try {
      await axios.put(`http:///87.249.44.239:5000/api/appointments/${id}`, { status });
      // После обновления сразу перезагружаем список
      await fetchAppointments();
    } catch (err) {
      console.error('Ошибка обновления:', err);
    }
  };

  const filteredAppointments = appointments.filter(apt => {
    if (filter === 'all') return true;
    return apt.status === filter;
  });

  const getStatusColor = (status) => {
    switch(status) {
      case 'pending': return '#ff9800';
      case 'confirmed': return '#4caf50';
      case 'completed': return '#2196f3';
      case 'cancelled': return '#f44336';
      default: return '#999';
    }
  };

  const getStatusText = (status) => {
    switch(status) {
      case 'pending': return 'Ожидает';
      case 'confirmed': return 'Подтверждена';
      case 'completed': return 'Выполнена';
      case 'cancelled': return 'Отменена';
      default: return status;
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU');
  };

  if (loading && appointments.length === 0) return <div style={{ textAlign: 'center', padding: '40px' }}>Загрузка...</div>;

  return (
    <div className="admin-appointments">
      <h1>Управление записями</h1>
      
      {/* Кнопка обновления вручную */}
      <button 
        onClick={fetchAppointments}
        style={{
          marginBottom: '20px',
          padding: '8px 16px',
          background: '#2196F3',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        🔄 Обновить список
      </button>

      {/* Фильтры */}
      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
        <button 
          onClick={() => setFilter('all')}
          style={{
            padding: '8px 16px',
            background: filter === 'all' ? '#2196F3' : '#f0f0f0',
            color: filter === 'all' ? 'white' : '#333',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Все ({appointments.length})
        </button>
        <button 
          onClick={() => setFilter('pending')}
          style={{
            padding: '8px 16px',
            background: filter === 'pending' ? '#ff9800' : '#f0f0f0',
            color: filter === 'pending' ? 'white' : '#333',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Ожидают ({appointments.filter(a => a.status === 'pending').length})
        </button>
        <button 
          onClick={() => setFilter('confirmed')}
          style={{
            padding: '8px 16px',
            background: filter === 'confirmed' ? '#4caf50' : '#f0f0f0',
            color: filter === 'confirmed' ? 'white' : '#333',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Подтверждены ({appointments.filter(a => a.status === 'confirmed').length})
        </button>
        <button 
          onClick={() => setFilter('completed')}
          style={{
            padding: '8px 16px',
            background: filter === 'completed' ? '#2196F3' : '#f0f0f0',
            color: filter === 'completed' ? 'white' : '#333',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Выполнены ({appointments.filter(a => a.status === 'completed').length})
        </button>
      </div>

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

      {filteredAppointments.length === 0 ? (
        <p style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
          Нет записей в этой категории
        </p>
      ) : (
        <div>
          {filteredAppointments.map(apt => (
            <div key={apt._id} style={{
              background: 'white',
              padding: '20px',
              marginBottom: '15px',
              borderRadius: '8px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '10px' }}>
                    <h3 style={{ margin: 0 }}>{apt.user?.name || 'Клиент'}</h3>
                    <span style={{
                      padding: '4px 8px',
                      background: getStatusColor(apt.status),
                      color: 'white',
                      borderRadius: '4px',
                      fontSize: '12px'
                    }}>
                      {getStatusText(apt.status)}
                    </span>
                  </div>
                  
                  <p><strong>Телефон:</strong> {apt.user?.phone || '—'}</p>
                  <p><strong>Дата:</strong> {formatDate(apt.date)} в {apt.time}</p>
                  <p><strong>Услуга:</strong> {apt.service?.name || '—'}</p>
                  <p><strong>Точка:</strong> {apt.servicePoint?.name || '—'}</p>
                  <p><strong>Авто:</strong> {apt.carModel || '—'} ({apt.carNumber || '—'})</p>
                  {apt.comment && <p><strong>Комментарий:</strong> {apt.comment}</p>}
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                  {apt.status === 'pending' && (
                    <>
                      <button 
                        onClick={() => updateStatus(apt._id, 'confirmed')}
                        style={{
                          padding: '8px 16px',
                          background: '#4caf50',
                          color: 'white',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer'
                        }}
                      >
                        Подтвердить
                      </button>
                      <button 
                        onClick={() => updateStatus(apt._id, 'cancelled')}
                        style={{
                          padding: '8px 16px',
                          background: '#f44336',
                          color: 'white',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer'
                        }}
                      >
                        Отменить
                      </button>
                    </>
                  )}
                  {apt.status === 'confirmed' && (
                    <button 
                      onClick={() => updateStatus(apt._id, 'completed')}
                      style={{
                        padding: '8px 16px',
                        background: '#2196F3',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                      }}
                    >
                      Завершить
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminAppointments;