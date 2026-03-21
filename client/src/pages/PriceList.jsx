import React, { useState } from 'react';
import { priceData } from '../data/priceData';
import TirePriceTable from '../components/TirePriceTable';
import SimplePriceTable from '../components/SimplePriceTable';

const PriceList = () => {
  const [activeType, setActiveType] = useState('passenger');
  const [activeSubType, setActiveSubType] = useState('standard');
  const [radiusFilter, setRadiusFilter] = useState('all');

  const currentData = activeType === 'passenger' ? priceData.passenger[activeSubType] : 
                       activeType === 'suv' ? priceData.suv[activeSubType] : null;

  const filteredRadiuses = currentData ? 
    (radiusFilter === 'all' ? currentData.radiuses : currentData.radiuses.filter(r => r === parseInt(radiusFilter))) : [];

  const simpleCategories = ['mgt', 'repair', 'goods', 'extra'];

  return (
    <div className="price-list">
      <h1>Цены</h1>

      {/* Блок 1 - Категории услуг */}
      <div className="filter-section">
        <h3>
          <span className="section-number">1</span>
          Категории услуг
        </h3>
        <div className="filters">
          <button className={`${activeType === 'passenger' ? 'active passenger' : ''}`} onClick={() => setActiveType('passenger')}>
            Легковые
          </button>
          <button className={`${activeType === 'suv' ? 'active suv' : ''}`} onClick={() => setActiveType('suv')}>
            SUV / Внедорожники
          </button>
          <button className={`${activeType === 'mgt' ? 'active' : ''}`} onClick={() => setActiveType('mgt')}>
            МГТ
          </button>
          <button className={`${activeType === 'repair' ? 'active' : ''}`} onClick={() => setActiveType('repair')}>
            Ремонт шин
          </button>
          <button className={`${activeType === 'goods' ? 'active' : ''}`} onClick={() => setActiveType('goods')}>
            Товары
          </button>
          <button className={`${activeType === 'extra' ? 'active' : ''}`} onClick={() => setActiveType('extra')}>
            Доп. работы
          </button>
        </div>
      </div>

      {/* Блок 2 - Тип шин (только для легковых/кроссоверов) */}
      {(activeType === 'passenger' || activeType === 'suv') && (
        <div className="filter-section">
          <h3>
            <span className="section-number">2</span>
            Тип шин
          </h3>
          <div className="sub-filters">
            <button className={activeSubType === 'standard' ? 'active' : ''} onClick={() => setActiveSubType('standard')}>
              Обычные шины
            </button>
            <button className={activeSubType === 'runflat' ? 'active' : ''} onClick={() => setActiveSubType('runflat')}>
              RFT / Низкий профиль
            </button>
          </div>
        </div>
      )}

      {/* Блок 3 - Фильтр по радиусу */}
      {(activeType === 'passenger' || activeType === 'suv') && currentData && (
        <div className="filter-section">
          <h3>
            <span className="section-number">3</span>
            Фильтр по радиусу
          </h3>
          <div className="radius-filter">
            <button className={`radius-btn ${radiusFilter === 'all' ? 'active' : ''}`} onClick={() => setRadiusFilter('all')}>
              Все
            </button>
            {currentData.radiuses.map(r => (
              <button key={r} className={`radius-btn ${radiusFilter === r.toString() ? 'active' : ''}`} onClick={() => setRadiusFilter(r.toString())}>
                R{r}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Отображение прайса */}
      <div style={{ marginTop: '20px' }}>
        {(activeType === 'passenger' || activeType === 'suv') && currentData && (
          <TirePriceTable data={currentData} filteredRadiuses={filteredRadiuses} />
        )}
        {simpleCategories.includes(activeType) && priceData[activeType] && (
          <SimplePriceTable data={priceData[activeType]} />
        )}
      </div>

      <style>{`
  * {
    font-family: 'Segoe UI', 'Roboto', 'Inter', system-ui, sans-serif;
  }

  .price-list {
    max-width: 1400px;
    margin: 0 auto;
  }

  h1 {
    font-size: 1.8rem;
    font-weight: 600;
    color: #1a1a1a;
    margin-bottom: 24px;
    text-align: center;
  }

  /* Блоки фильтров */
  .filter-section {
    border: 1px solid #e0e0e0;
    border-radius: 10px;
    padding: 10px 15px;
    margin-bottom: 15px;
    background: #fafafa;
  }

  .filter-section h3 {
    margin: 0 0 10px;
    font-size: 16px;  /* увеличено с 13px */
    color: #333;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .section-number {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    background: #e74c3c;
    color: white;
    font-size: 13px;
    font-weight: bold;
    border-radius: 50%;
  }

  /* Кнопки */
  .filters {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
  }

  .filters button {
    padding: 8px 16px;  /* увеличено */
    border: 1px solid #ddd;
    background: white;
    border-radius: 6px;
    cursor: pointer;
    font-weight: 500;
    font-size: 15px;  /* увеличено с 13px */
    transition: all 0.3s;
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

  /* Подкатегории */
  .sub-filters {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
  }

  .sub-filters button {
    padding: 6px 14px;  /* увеличено */
    border: 1px solid #ddd;
    background: white;
    border-radius: 6px;
    cursor: pointer;
    font-size: 14px;  /* увеличено с 12px */
  }

  .sub-filters button.active {
    background: #2196F3;
    color: white;
    border-color: #1976D2;
  }

  /* Фильтр по радиусу */
  .radius-filter {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
  }

  .radius-btn {
    padding: 5px 12px;  /* увеличено */
    border: 1px solid #ddd;
    background: white;
    border-radius: 6px;
    cursor: pointer;
    font-size: 14px;  /* увеличено с 12px */
  }

  .radius-btn.active {
    background: #2196F3;
    color: white;
  }

  /* Таблица */
  .price-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 15px;  /* увеличено с 13px */
  }

  .price-table th,
  .price-table td {
    padding: 12px 10px;  /* увеличено */
    text-align: left;
    border-bottom: 1px solid #eee;
  }

  .price-table th {
    background: #f8f9fa;
    font-weight: 600;
    color: #2c3e50;
  }

  .price-table td {
    color: #2c3e50;
  }

  /* Карточка с ценами */
  .card {
    background: white;
    border-radius: 12px;
    padding: 20px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.04);
    margin-bottom: 20px;
  }

  .card h2 {
    font-size: 1.3rem;  /* увеличено */
    font-weight: 600;
    margin-bottom: 12px;
    color: #1a1a1a;
  }

  .card p {
    font-size: 14px;  /* увеличено с 12px */
    color: #666;
    margin-bottom: 15px;
  }

  /* Мобильная адаптация */
 @media (max-width: 768px) {
  .price-table {
    font-size: 14px;  /* увеличено с 13px */
  }
  .price-table th,
  .price-table td {
    padding: 10px 8px;  /* увеличено */
  }
    .filters button {
      padding: 6px 12px;
      font-size: 13px;
    }
    .filter-section h3 {
      font-size: 14px;
    }
    .card h2 {
      font-size: 1.2rem;
    }
    .section-number {
      width: 22px;
      height: 22px;
      font-size: 12px;
    }
  }
`}</style>
    </div>
  );
};

export default PriceList;