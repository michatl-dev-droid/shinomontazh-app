import React from 'react';

const TirePriceTable = ({ data, filteredRadiuses }) => {
  if (!data) return null;

  return (
    <div className="card" style={{ backgroundColor: data.bgColor }}>
      <h2>{data.name}</h2>
      <p style={{ color: '#666', marginBottom: '20px' }}>{data.description}</p>
      <div style={{ overflowX: 'auto' }}>
        <table className="price-table">
          <thead>
            <tr>
              <th style={{ minWidth: '250px' }}>Услуга</th>
              {filteredRadiuses.map(radius => <th key={radius}>R{radius}</th>)}
            </tr>
          </thead>
          <tbody>
            {data.services.map((service, idx) => (
              <tr key={idx}>
                <td>{service.name}</td>
                {filteredRadiuses.map((radius, i) => {
                  const idx = data.radiuses.indexOf(radius);
                  return <td key={i}>{service.prices[idx] !== null ? service.prices[idx] : '—'}</td>;
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TirePriceTable;