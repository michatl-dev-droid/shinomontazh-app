import React from 'react';

const SimplePriceTable = ({ data, title }) => {
  if (!data) return null;

  return (
    <div className="card" style={{ backgroundColor: data.bgColor }}>
      <h2>{title || data.name}</h2>
      <table className="price-table">
        <thead>
          <tr><th>Услуга</th><th>Цена</th></tr>
        </thead>
        <tbody>
          {data.services.map((service, idx) => (
            <tr key={idx}>
              <td>{service.name}</td>
              <td>{service.price !== null ? `${service.price} ₽` : '—'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SimplePriceTable;