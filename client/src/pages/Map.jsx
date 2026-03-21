import React, { useState, useEffect } from 'react';
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';
import axios from 'axios';

const MapPage = () => {
  const [points, setPoints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [mapState, setMapState] = useState({
    center: [55.751574, 37.573856],
    zoom: 10
  });

  useEffect(() => {
    fetchPoints();
  }, []);

  const fetchPoints = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://87.249.44.239:5000/api/service-points');
      console.log('Загружены точки для карты:', response.data);
      setPoints(response.data);
      
      // Если есть точки, центрируем карту на первую
      if (response.data.length > 0) {
        setMapState({
          center: [response.data[0].coordinates.lat, response.data[0].coordinates.lng],
          zoom: 12
        });
      }
      setError('');
    } catch (err) {
      console.error('Ошибка загрузки точек для карты:', err);
      setError('Не удалось загрузить точки на карту');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="map-page">
        <h1>Карта точек обслуживания</h1>
        <p style={{ textAlign: 'center', padding: '40px' }}>Загрузка карты...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="map-page">
        <h1>Карта точек обслуживания</h1>
        <p style={{ textAlign: 'center', color: 'red', padding: '40px' }}>{error}</p>
      </div>
    );
  }

  return (
    <div className="map-page">
      <h1>Карта точек обслуживания</h1>
      
      <YMaps>
        <div className="map-container" style={{ width: '100%', height: '500px', marginBottom: '20px', borderRadius: '12px', overflow: 'hidden' }}>
          <Map
            state={mapState}
            width="100%"
            height="100%"
            options={{
              suppressMapOpenBlock: true,
              yandexMapDisablePoiInteractivity: true
            }}
          >
            {points.map(point => (
              <Placemark
                key={point._id}
                geometry={[point.coordinates.lat, point.coordinates.lng]}
                properties={{
                  hintContent: point.name,
                  balloonContent: `
                    <div style="padding: 8px;">
                      <strong>${point.name}</strong><br>
                      ${point.address}<br>
                      Тел: ${point.phone}<br>
                      ${point.workingHours ? `Режим: ${point.workingHours}` : ''}
                    </div>
                  `
                }}
                options={{
                  preset: 'islands#redDotIcon',
                  iconColor: '#8B0000'
                }}
              />
            ))}
          </Map>
        </div>
      </YMaps>

      <div className="points-list">
        <h2>Список всех точек</h2>
        {points.length === 0 ? (
          <p style={{ textAlign: 'center', padding: '20px', color: '#666' }}>
            Нет добавленных точек
          </p>
        ) : (
          <div className="points-grid">
            {points.map(point => (
              <div key={point._id} className="point-card">
                <h3>{point.name}</h3>
                <p><strong>Адрес:</strong> {point.address}</p>
                <p><strong>Телефон:</strong> {point.phone}</p>
                {point.workingHours && (
                  <p><strong>Режим работы:</strong> {point.workingHours}</p>
                )}
                <button 
                  className="btn-select"
                  onClick={() => window.location.href = '/appointment'}
                  style={{
                    width: '100%',
                    padding: '8px',
                    marginTop: '12px',
                    background: '#8B0000',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  Записаться
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <style>{`
        .points-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 20px;
          margin-top: 20px;
        }
        .point-card {
          background: white;
          border-radius: 12px;
          padding: 16px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
          transition: transform 0.2s;
        }
        .point-card:hover {
          transform: translateY(-2px);
        }
        .point-card h3 {
          color: #8B0000;
          margin-bottom: 10px;
        }
        .point-card p {
          margin: 8px 0;
          font-size: 14px;
          color: #333;
        }
        .btn-select:hover {
          background: #6a0000 !important;
        }
        @media (max-width: 768px) {
          .points-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default MapPage;