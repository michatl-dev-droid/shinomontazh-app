import React, { useState } from 'react';

const PriceList = () => {
  const [activeType, setActiveType] = useState('passenger');
  const [activeSubType, setActiveSubType] = useState('standard');
  const [radiusFilter, setRadiusFilter] = useState('all');

  // Данные прайс-листа на основе вашего файла
  const priceData = {
    // ЛЕГКОВЫЕ (passenger)
    passenger: {
      standard: {
        name: 'Легковые (стандарт)',
        description: 'Обычные легковые шины',
        bgColor: '#fff9e6', // бледно-желтый
        radiuses: [13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
        services: [
          { name: 'Съём + шиномонтаж + балансировка + установка', prices: [850, 850, 850, 950, 1140, 1140, 1300, 1620, 1860, 2260, 3060, 3860] },
          { name: 'Съём + балансировка + установка', prices: [500, 500, 500, 550, 640, 640, 720, 880, 1000, 1200, 1600, 2000] },
          { name: 'Съём + установка', prices: [420, 420, 420, 470, 520, 520, 590, 740, 840, 1020, 1380, 1750] },
          { name: 'Демонтаж', prices: [160, 160, 160, 180, 230, 230, 270, 350, 410, 510, 710, 910] },
          { name: 'Монтаж', prices: [190, 190, 190, 220, 270, 270, 310, 390, 450, 550, 750, 950] },
          { name: 'Балансировка', prices: [270, 270, 270, 290, 350, 350, 390, 470, 530, 630, 830, 1030] },
          { name: 'Проверка биения', prices: [140, 140, 140, 160, 180, 180, 220, 300, 360, 460, 660, 860] },
          { name: 'Правка диска СТАЛЬ', prices: [670, 670, 670, 670, 750, 750, null, null, null, null, null, null] },
          { name: 'Правка диска ЛИТЬЕ', prices: [1230, 1230, 1230, 1500, 1670, 1670, 2000, 2670, 2670, 3340, 5000, 8000] }
        ]
      },
      runflat: {
        name: 'Легковые RFT / низкий профиль',
        description: 'RunFlat и низкопрофильные шины',
        bgColor: '#fff9e6', // бледно-желтый
        radiuses: [13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
        services: [
          { name: 'Съём + шиномонтаж + балансировка + установка', prices: [1070, 1070, 1070, 1170, 1380, 1380, 1540, 1860, 2100, 2500, 3300, 4100] },
          { name: 'Демонтаж', prices: [270, 270, 270, 290, 350, 350, 390, 470, 530, 630, 830, 1030] },
          { name: 'Монтаж', prices: [300, 300, 300, 330, 390, 390, 430, 510, 570, 670, 870, 1070] }
        ]
      }
    },

    // КРОССОВЕРЫ (suv)
    suv: {
      standard: {
        name: 'Кроссоверы / Внедорожники',
        description: 'Обычные шины для кроссоверов',
        bgColor: '#e6f3ff', // бледно-синий
        radiuses: [16, 17, 18, 19, 20, 21, 22, 23, 24],
        services: [
          { name: 'Съём + шиномонтаж + балансировка + установка', prices: [1000, 1250, 1250, 1500, 1620, 2000, 2500, 3100, 3900] },
          { name: 'Съём + балансировка + установка', prices: [580, 690, 690, 820, 880, 1060, 1320, 1620, 2020] },
          { name: 'Съём + установка', prices: [470, 560, 560, 690, 740, 920, 1150, 1420, 1790] },
          { name: 'Демонтаж', prices: [190, 260, 260, 320, 350, 450, 570, 720, 920] },
          { name: 'Монтаж', prices: [230, 300, 300, 360, 390, 490, 610, 760, 960] },
          { name: 'Балансировка', prices: [320, 380, 380, 440, 470, 550, 680, 830, 1030] },
          { name: 'Проверка биения', prices: [160, 200, 200, 260, 290, 390, 520, 670, 870] },
          { name: 'Правка диска СТАЛЬ', prices: [780, 1000, 1000, null, null, null, null, null, null] },
          { name: 'Правка диска ЛИТЬЕ', prices: [1600, 1890, 1890, 2230, 2890, 2890, 3560, 7000, 9000] }
        ]
      },
      runflat: {
        name: 'Кроссоверы RFT / низкий профиль',
        description: 'RunFlat и низкопрофильные шины',
        bgColor: '#e6f3ff', // бледно-синий
        radiuses: [16, 17, 18, 19, 20, 21, 22, 23, 24],
        services: [
          { name: 'Съём + шиномонтаж + балансировка + установка', prices: [1280, 1530, 1530, 1780, 1900, 2280, 2780, 3380, 4180] },
          { name: 'Демонтаж', prices: [330, 400, 400, 460, 490, 590, 710, 860, 1060] },
          { name: 'Монтаж', prices: [370, 440, 440, 500, 530, 630, 750, 900, 1100] }
        ]
      }
    },

    // МГТ (отдельная категория)
    mgt: {
      name: 'МГТ',
      bgColor: '#f5f5f5', // светло-серый
      services: [
        { name: 'Съём + шиномонтаж + балансировка + установка', price: 1500 },
        { name: 'Съём + балансировка + установка', price: 1000 },
        { name: 'Съём + установка', price: 710 },
        { name: 'Демонтаж', price: 230 },
        { name: 'Монтаж', price: 270 },
        { name: 'Балансировка', price: 290 },
        { name: 'Проверка биения', price: 140 },
        { name: 'Правка диска СТАЛЬ', price: 1670 },
        { name: 'Правка диска ЛИТЬЕ', price: null }
      ]
    },

    // РЕМОНТ ШИН (отдельная категория)
    repair: {
      name: 'Ремонт шин',
      bgColor: '#f5f5f5',
      services: [
        { name: 'Гриб 7 или заплатка мини', price: 390 },
        { name: 'Гриб 9 или заплатка средняя', price: 450 },
        { name: 'Гриб 12 или заплатка большая', price: 500 },
        { name: 'Жгут', price: 390 },
        { name: 'Пластырь кордовый с 10 до 12', price: 780 },
        { name: 'Пластырь кордовый с 14 до 16', price: 890 },
        { name: 'Пластырь кордовый с 17 до 20', price: 1120 },
        { name: 'Пластырь кордовый 231 и тп', price: 1670 },
        { name: 'На камеру заплатка мини', price: 390 },
        { name: 'На камеру заплатка средняя', price: 450 },
        { name: 'На камеру заплатка большая', price: 500 }
      ]
    },

    // ТОВАРЫ (отдельная категория)
    goods: {
      name: 'Товары',
      bgColor: '#f5f5f5',
      services: [
        { name: 'Дополнительный груз', price: 140 },
        { name: 'Вентиль', price: 140 },
        { name: 'Пакет малый', price: 60 },
        { name: 'Пакет большой', price: 80 }
      ]
    },

    // ДОПОЛНИТЕЛЬНЫЕ РАБОТЫ (отдельная категория)
    extra: {
      name: 'Дополнительные работы',
      bgColor: '#f5f5f5',
      services: [
        { name: 'Вулканизация', price: 780 },
        { name: 'Установка вашего вентиля', price: 70 },
        { name: 'Снятие секреток', price: 890 },
        { name: 'Снятие слизанных, не откручивающихся болтов', price: 780 },
        { name: 'Подкачать колесо', price: 60 },
        { name: 'Смазка медная 1 ступицы', price: 120 },
        { name: 'Зачистка 1 ступицы', price: 120 },
        { name: 'Монтаж или демонтаж камеры', price: 120 },
        { name: 'Установка датчика давления', price: 450 },
        { name: 'Оптимизация шины за 1 колесо', price: 230 }
      ]
    }
  };

  // Получаем текущие данные в зависимости от выбранной категории
  const getCurrentData = () => {
    if (activeType === 'passenger') return priceData.passenger[activeSubType];
    if (activeType === 'suv') return priceData.suv[activeSubType];
    return null;
  };

  const currentData = getCurrentData();

  // Фильтрация радиусов
  const getFilteredRadiuses = () => {
    if (!currentData) return [];
    if (radiusFilter === 'all') return currentData.radiuses;
    return currentData.radiuses.filter(r => r === parseInt(radiusFilter));
  };

  const filteredRadiuses = getFilteredRadiuses();

  return (
    <div className="price-list">
      {/* Основные фильтры - все кнопки на одном уровне */}
      <div className="filters">
        <button 
          className={activeType === 'passenger' ? 'active passenger' : ''}
          onClick={() => { setActiveType('passenger'); setActiveSubType('standard'); setRadiusFilter('all'); }}
        >
          Легковые
        </button>
        <button 
          className={activeType === 'suv' ? 'active suv' : ''}
          onClick={() => { setActiveType('suv'); setActiveSubType('standard'); setRadiusFilter('all'); }}
        >
          Кроссоверы / Внедорожники
        </button>
        <button 
          className={activeType === 'mgt' ? 'active' : ''}
          onClick={() => { setActiveType('mgt'); setRadiusFilter('all'); }}
        >
          МГТ
        </button>
        <button 
          className={activeType === 'repair' ? 'active' : ''}
          onClick={() => { setActiveType('repair'); setRadiusFilter('all'); }}
        >
          Ремонт шин
        </button>
        <button 
          className={activeType === 'goods' ? 'active' : ''}
          onClick={() => { setActiveType('goods'); setRadiusFilter('all'); }}
        >
          Товары
        </button>
        <button 
          className={activeType === 'extra' ? 'active' : ''}
          onClick={() => { setActiveType('extra'); setRadiusFilter('all'); }}
        >
          Доп. работы
        </button>
      </div>

      {/* Подкатегории для легковых и кроссоверов */}
      {(activeType === 'passenger' || activeType === 'suv') && (
        <div className="sub-filters-container" style={{ 
          marginTop: '10px', 
          padding: '15px', 
          borderRadius: '8px',
          backgroundColor: activeType === 'passenger' ? '#fff9e6' : '#e6f3ff'
        }}>
          {/* Текстовое поле над кнопками (выровнено по левому краю) */}
          <div style={{ 
            color: 'red', 
            fontWeight: 'bold',
            fontSize: '16px',
            textTransform: 'uppercase',
            marginBottom: '10px',
            textAlign: 'left'
          }}>
            ⬇ ВЫБРАТЬ ТИП ШИН ⬇
          </div>
          
          <div className="sub-filters" style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <button 
              className={activeSubType === 'standard' ? 'active' : ''}
              onClick={() => setActiveSubType('standard')}
            >
              Обычные шины
            </button>
            <button 
              className={activeSubType === 'runflat' ? 'active' : ''}
              onClick={() => setActiveSubType('runflat')}
            >
              RFT / Низкий профиль
            </button>
          </div>
        </div>
      )}

      {/* Фильтр по радиусу (только для легковых и кроссоверов) */}
      {(activeType === 'passenger' || activeType === 'suv') && currentData && (
        <div className="radius-filter" style={{ 
          marginTop: '15px',
          padding: '10px',
          backgroundColor: '#f8f9fa',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          flexWrap: 'wrap'
        }}>
          <span style={{ fontWeight: 'bold', color: '#333' }}>Фильтр по радиусу:</span>
          <button 
            className={`radius-btn ${radiusFilter === 'all' ? 'active' : ''}`}
            onClick={() => setRadiusFilter('all')}
          >
            Все
          </button>
          {currentData.radiuses.map(radius => (
            <button
              key={radius}
              className={`radius-btn ${radiusFilter === radius.toString() ? 'active' : ''}`}
              onClick={() => setRadiusFilter(radius.toString())}
            >
              R{radius}
            </button>
          ))}
        </div>
      )}

      {/* Отображение прайса */}
      <div className="price-content" style={{ marginTop: '30px' }}>
        {/* Легковые */}
        {activeType === 'passenger' && (
          <div className="card" style={{ backgroundColor: priceData.passenger[activeSubType].bgColor }}>
            <h2>{priceData.passenger[activeSubType].name}</h2>
            <p style={{ color: '#666', marginBottom: '20px' }}>{priceData.passenger[activeSubType].description}</p>
            
            <div style={{ overflowX: 'auto' }}>
              <table className="price-table">
                <thead>
                  <tr>
                    <th style={{ minWidth: '250px' }}>Услуга</th>
                    {filteredRadiuses.map(radius => (
                      <th key={radius}>R{radius}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {priceData.passenger[activeSubType].services.map((service, index) => (
                    <tr key={index}>
                      <td>{service.name}</td>
                      {filteredRadiuses.map((radius, i) => {
                        const radiusIndex = priceData.passenger[activeSubType].radiuses.indexOf(radius);
                        return (
                          <td key={i}>
                            {service.prices[radiusIndex] || '—'}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Кроссоверы */}
        {activeType === 'suv' && (
          <div className="card" style={{ backgroundColor: priceData.suv[activeSubType].bgColor }}>
            <h2>{priceData.suv[activeSubType].name}</h2>
            <p style={{ color: '#666', marginBottom: '20px' }}>{priceData.suv[activeSubType].description}</p>
            
            <div style={{ overflowX: 'auto' }}>
              <table className="price-table">
                <thead>
                  <tr>
                    <th style={{ minWidth: '250px' }}>Услуга</th>
                    {filteredRadiuses.map(radius => (
                      <th key={radius}>R{radius}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {priceData.suv[activeSubType].services.map((service, index) => (
                    <tr key={index}>
                      <td>{service.name}</td>
                      {filteredRadiuses.map((radius, i) => {
                        const radiusIndex = priceData.suv[activeSubType].radiuses.indexOf(radius);
                        return (
                          <td key={i}>
                            {service.prices[radiusIndex] || '—'}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* МГТ */}
        {activeType === 'mgt' && (
          <div className="card" style={{ backgroundColor: priceData.mgt.bgColor }}>
            <h2>{priceData.mgt.name}</h2>
            <table className="price-table">
              <thead>
                <tr>
                  <th>Услуга</th>
                  <th>Цена</th>
                </tr>
              </thead>
              <tbody>
                {priceData.mgt.services.map((service, index) => (
                  <tr key={index}>
                    <td>{service.name}</td>
                    <td>{service.price || '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Ремонт шин */}
        {activeType === 'repair' && (
          <div className="card" style={{ backgroundColor: priceData.repair.bgColor }}>
            <h2>{priceData.repair.name}</h2>
            <table className="price-table">
              <thead>
                <tr>
                  <th>Услуга</th>
                  <th>Цена</th>
                </tr>
              </thead>
              <tbody>
                {priceData.repair.services.map((service, index) => (
                  <tr key={index}>
                    <td>{service.name}</td>
                    <td>{service.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Товары */}
        {activeType === 'goods' && (
          <div className="card" style={{ backgroundColor: priceData.goods.bgColor }}>
            <h2>{priceData.goods.name}</h2>
            <table className="price-table">
              <thead>
                <tr>
                  <th>Услуга</th>
                  <th>Цена</th>
                </tr>
              </thead>
              <tbody>
                {priceData.goods.services.map((service, index) => (
                  <tr key={index}>
                    <td>{service.name}</td>
                    <td>{service.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Дополнительные работы */}
        {activeType === 'extra' && (
          <div className="card" style={{ backgroundColor: priceData.extra.bgColor }}>
            <h2>{priceData.extra.name}</h2>
            <table className="price-table">
              <thead>
                <tr>
                  <th>Услуга</th>
                  <th>Цена</th>
                </tr>
              </thead>
              <tbody>
                {priceData.extra.services.map((service, index) => (
                  <tr key={index}>
                    <td>{service.name}</td>
                    <td>{service.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <style>{`
        .filters {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
          margin-bottom: 20px;
        }
        .filters button {
          padding: 10px 20px;
          border: 1px solid #ddd;
          background: white;
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.3s;
          font-weight: 500;
        }
        .filters button:hover {
          background: #f0f0f0;
        }
        .filters button.active.passenger {
          background: #ffe066;
          color: #333;
          border-color: #ffd966;
        }
        .filters button.active.suv {
          background: #99ccff;
          color: #333;
          border-color: #80b3ff;
        }
        .filters button.active:not(.passenger):not(.suv) {
          background: #2196F3;
          color: white;
          border-color: #1976D2;
        }
        
        .sub-filters button {
          padding: 8px 16px;
          border: 1px solid #ddd;
          background: white;
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.3s;
        }
        .sub-filters button:hover {
          background: #f0f0f0;
        }
        .sub-filters button.active {
          background: #2196F3;
          color: white;
          border-color: #1976D2;
        }

        .radius-filter {
          margin-top: 15px;
          padding: 10px;
          background-color: #f8f9fa;
          border-radius: 8px;
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
        }

        .radius-btn {
          padding: 5px 10px;
          border: 1px solid #ddd;
          background: white;
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.3s;
          font-size: 14px;
        }

        .radius-btn:hover {
          background: #e0e0e0;
        }

        .radius-btn.active {
          background: #2196F3;
          color: white;
          border-color: #1976D2;
        }

        .price-table {
          width: 100%;
          border-collapse: collapse;
        }
        .price-table th,
        .price-table td {
          padding: 12px;
          text-align: left;
          border-bottom: 1px solid #ddd;
        }
        .price-table th {
          background-color: rgba(255,255,255,0.7);
          font-weight: 600;
        }
        .price-table td {
          color: #333;
        }
        .card {
          background: white;
          border-radius: 8px;
          padding: 20px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        @media (max-width: 768px) {
          .gradient-title {
            font-size: 1.8rem;
            padding: 15px;
          }
          .price-table {
            font-size: 14px;
          }
          .price-table th,
          .price-table td {
            padding: 8px;
          }
        }
      `}</style>
    </div>
  );
};

export default PriceList;