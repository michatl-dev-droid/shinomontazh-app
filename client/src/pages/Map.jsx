import React, { useState, useEffect } from 'react';
import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';

const MapPage = () => {
  const [points, setPoints] = useState([
    {
      id: 1,
      name: 'Шиномонтаж на Ленина',
      address: 'ул. Ленина, 10',
      phone: '+7 (999) 123-45-67',
      coords: [55.751574, 37.573856]
    },
    {
      id: 2,
      name: 'Шиномонтаж на Советской',
      address: 'ул. Советская, 25',
      phone: '+7 (999) 234-56-78',
      coords: [55.761574, 37.583856]
    },
    {
      id: 3,
      name: 'Шиномонтаж на Мира',
      address: 'ул. Мира, 15',
      phone: '+7 (999) 345-67-89',
      coords: [55.741574, 37.563856]
    }
  ]);

  const [mapState, setMapState] = useState({
    center: [55.751574, 37.573856],
    zoom: 11
  });

  return (
    <div className="map-page">
      <h1>Карта точек обслуживания</h1>
      
      <YMaps>
        <div className="map-container" style={{ width: '100%', height: '500px', marginBottom: '20px' }}>
          <Map
            state={mapState}
            width="100%"
            height="100%"
          >
            {points.map(point => (
              <Placemark
                key={point.id}
                geometry={point.coords}
                properties={{
                  hintContent: point.name,
                  balloonContent: `
                    <strong>${point.name}</strong><br>
                    ${point.address}<br>
                    Тел: ${point.phone}
                  `
                }}
                options={{
                  preset: 'islands#redDotIcon'
                }}
              />
            ))}
          </Map>
        </div>
      </YMaps>

      <div className="points-list">
        <h2>Список всех точек</h2>
        <div className="points-grid">
          {points.map(point => (
            <div key={point.id} className="point-card">
              <h3>{point.name}</h3>
              <p><strong>Адрес:</strong> {point.address}</p>
              <p><strong>Телефон:</strong> {point.phone}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MapPage;