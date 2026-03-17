import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/api/auth/users');
      console.log('Получены пользователи:', response.data);
      setUsers(response.data);
      setError('');
    } catch (err) {
      console.error('Ошибка загрузки пользователей:', err);
      setError('Не удалось загрузить список пользователей');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU');
  };

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '40px' }}>Загрузка...</div>;
  }

  if (error) {
    return (
      <div style={{ textAlign: 'center', padding: '40px' }}>
        <p style={{ color: 'red' }}>{error}</p>
        <button onClick={fetchUsers} style={{ padding: '10px 20px', marginTop: '20px' }}>
          Повторить загрузку
        </button>
      </div>
    );
  }

  return (
    <div className="admin-users">
      <h1>Управление пользователями</h1>
      
      {users.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#666', padding: '40px' }}>
          Нет зарегистрированных пользователей
        </p>
      ) : (
        <div className="users-list">
          <table className="price-table" style={{ width: '100%' }}>
            <thead>
              <tr>
                <th>Имя</th>
                <th>Телефон</th>
                <th>Автомобиль</th>
                <th>Госномер</th>
                <th>Дата регистрации</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user._id}>
                  <td>{user.name || '—'}</td>
                  <td>{user.phone}</td>
                  <td>{user.carModel || '—'}</td>
                  <td>{user.carNumber || '—'}</td>
                  <td>{formatDate(user.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p style={{ marginTop: '20px', color: '#666' }}>
            Всего пользователей: {users.length}
          </p>
        </div>
      )}
    </div>
  );
};

export default AdminUsers;