import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminCoupons = () => {
  const [coupons, setCoupons] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    code: '',
    discount: '',
    discountType: 'percent',
    minOrderAmount: '',
    usageLimit: '',
    validUntil: '',
    description: '',
    isActive: true
  });

  useEffect(() => {
    fetchCoupons();
  }, []);

  const fetchCoupons = async () => {
    try {
      const response = await axios.get('http://87.249.44.239:5000/api/coupons');
      setCoupons(response.data);
    } catch (err) {
      console.error('Ошибка загрузки:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`http://87.249.44.239:5000/api/coupons/${editingId}`, formData);
      } else {
        await axios.post('http://87.249.44.239:5000/api/coupons', formData);
      }
      resetForm();
      fetchCoupons();
      alert(editingId ? 'Купон обновлён' : 'Купон создан');
    } catch (err) {
      console.error('Ошибка сохранения:', err);
      alert('Ошибка при сохранении купона');
    }
  };

  const resetForm = () => {
    setFormData({
      code: '', discount: '', discountType: 'percent', minOrderAmount: '',
      usageLimit: '', validUntil: '', description: '', isActive: true
    });
    setEditingId(null);
  };

  const handleEdit = (coupon) => {
    setEditingId(coupon._id);
    setFormData({
      code: coupon.code,
      discount: coupon.discount,
      discountType: coupon.discountType,
      minOrderAmount: coupon.minOrderAmount,
      usageLimit: coupon.usageLimit,
      validUntil: coupon.validUntil ? coupon.validUntil.split('T')[0] : '',
      description: coupon.description || '',
      isActive: coupon.isActive
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Удалить купон?')) {
      try {
        await axios.delete(`http://87.249.44.239:5000/api/coupons/${id}`);
        fetchCoupons();
      } catch (err) {
        console.error('Ошибка удаления:', err);
      }
    }
  };

  const toggleActive = async (id, currentStatus) => {
    try {
      await axios.patch(`http://87.249.44.239:5000/api/coupons/${id}`, { isActive: !currentStatus });
      fetchCoupons();
    } catch (err) {
      console.error('Ошибка:', err);
    }
  };

  const formatDate = (date) => {
    if (!date) return '∞';
    return new Date(date).toLocaleDateString('ru-RU');
  };

  if (loading) return <div>Загрузка...</div>;

  return (
    <div className="admin-coupons" style={{ padding: '20px' }}>
      <h1>Управление купонами</h1>

      {/* Форма добавления/редактирования */}
      <div className="card" style={{ marginBottom: '30px', padding: '20px', background: '#fff', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
        <h2>{editingId ? 'Редактировать купон' : 'Создать новый купон'}</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '15px' }}>
            <div>
              <label>Код купона *</label>
              <input type="text" name="code" value={formData.code} onChange={handleChange} required style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }} />
            </div>
            <div>
              <label>Скидка *</label>
              <input type="number" name="discount" value={formData.discount} onChange={handleChange} required style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }} />
            </div>
            <div>
              <label>Тип скидки</label>
              <select name="discountType" value={formData.discountType} onChange={handleChange} style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}>
                <option value="percent">Процент (%)</option>
                <option value="fixed">Фиксированная (₽)</option>
              </select>
            </div>
            <div>
              <label>Мин. сумма заказа</label>
              <input type="number" name="minOrderAmount" value={formData.minOrderAmount} onChange={handleChange} style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }} />
            </div>
            <div>
              <label>Лимит использований</label>
              <input type="number" name="usageLimit" value={formData.usageLimit} onChange={handleChange} style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }} />
            </div>
            <div>
              <label>Действителен до</label>
              <input type="date" name="validUntil" value={formData.validUntil} onChange={handleChange} style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }} />
            </div>
            <div style={{ gridColumn: 'span 2' }}>
              <label>Описание</label>
              <input type="text" name="description" value={formData.description} onChange={handleChange} placeholder="Например: 10% на первый заказ" style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }} />
            </div>
            <div>
              <label>
                <input type="checkbox" name="isActive" checked={formData.isActive} onChange={handleChange} />
                Активен
              </label>
            </div>
          </div>
          <div style={{ marginTop: '20px' }}>
            <button type="submit" style={{ padding: '10px 20px', background: '#2196F3', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
              {editingId ? 'Сохранить изменения' : 'Создать купон'}
            </button>
            {editingId && (
              <button type="button" onClick={resetForm} style={{ marginLeft: '10px', padding: '10px 20px', background: '#f44336', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                Отмена
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Список купонов */}
      <h2>Список купонов</h2>
      {coupons.length === 0 ? (
        <p>Нет купонов. Создайте первый!</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse', background: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
          <thead>
            <tr style={{ background: '#f5f5f5' }}>
              <th style={{ padding: '12px', textAlign: 'left' }}>Код</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Скидка</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Мин. сумма</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Действителен до</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Использовано</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Статус</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Действия</th>
             </tr>
          </thead>
          <tbody>
            {coupons.map(coupon => (
              <tr key={coupon._id} style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '10px' }}><strong>{coupon.code}</strong>  </td>
                <td style={{ padding: '10px' }}>{coupon.discount}{coupon.discountType === 'percent' ? '%' : ' ₽'}  </td>
                <td style={{ padding: '10px' }}>{coupon.minOrderAmount} ₽</td>
                <td style={{ padding: '10px' }}>{formatDate(coupon.validUntil)}</td>
                <td style={{ padding: '10px' }}>{coupon.usedCount}/{coupon.usageLimit}</td>
                <td style={{ padding: '10px' }}>
                  <button onClick={() => toggleActive(coupon._id, coupon.isActive)} style={{ padding: '4px 10px', borderRadius: '20px', border: 'none', background: coupon.isActive ? '#4caf50' : '#f44336', color: 'white', cursor: 'pointer' }}>
                    {coupon.isActive ? 'Активен' : 'Неактивен'}
                  </button>
                </td>
                <td style={{ padding: '10px' }}>
                  <button onClick={() => handleEdit(coupon)} style={{ marginRight: '5px', padding: '5px 10px', background: '#2196F3', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>✏️</button>
                  <button onClick={() => handleDelete(coupon._id)} style={{ padding: '5px 10px', background: '#f44336', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>🗑️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminCoupons;