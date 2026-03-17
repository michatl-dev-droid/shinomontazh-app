import React from 'react';

const ServicePoints = () => {
  const points = [
    {
      name: 'Шиномонтаж на Ленина',
      address: 'ул. Ленина, 10',
      phone: '+7 (999) 123-45-67',
      hours: '09:00 - 21:00'
    },
    {
      name: 'Шиномонтаж на Советской',
      address: 'ул. Советская, 25',
      phone: '+7 (999) 234-56-78',
      hours: '10:00 - 22:00'
    },
    {
      name: 'Шиномонтаж на Мира',
      address: 'ул. Мира, 15',
      phone: '+7 (999) 345-67-89',
      hours: '09:00 - 20:00'
    },
  ];

  return (
    <div className="service-points">
      <h1>Наши точки обслуживания</h1>
      
      <div className="points-grid">
        {points.map((point, index) => (
          <div key={index} className="point-card">
            <h3>{point.name}</h3>
            <p className="address">
              <strong>Адрес:</strong> {point.address}
            </p>
            <p className="phone">
              <strong>Телефон:</strong> {point.phone}
            </p>
            <p className="hours">
              <strong>Режим работы:</strong> {point.hours}
            </p>
            <button className="btn-select">
              Записаться
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicePoints;