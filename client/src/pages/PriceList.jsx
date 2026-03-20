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
        <h3>Категории услуг</h3>
        <div className="filters">
          <button className={`${activeType === 'passenger' ? 'active passenger' : ''}`} onClick={() => setActiveType('passenger')}>
            Легковые
          </button>
          <button className={`${activeType === 'suv' ? 'active suv' : ''}`} onClick={() => setActiveType('suv')}>
            Кроссоверы / Внедорожники
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
          <h3>Тип шин</h3>
          <div className="sub-filters" style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
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
          <h3>Фильтр по радиусу</h3>
          <div className="radius-filter" style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
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
      <div style={{ marginTop: '30px' }}>
        {(activeType === 'passenger' || activeType === 'suv') && currentData && (
          <TirePriceTable data={currentData} filteredRadiuses={filteredRadiuses} />
        )}
        {simpleCategories.includes(activeType) && priceData[activeType] && (
          <SimplePriceTable data={priceData[activeType]} />
        )}
      </div>

      <style>{`
  .filters { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 0; }
  .filters button { padding: 5px 12px; border: 1px solid #ddd; background: white; border-radius: 4px; cursor: pointer; font-weight: 500; font-size: 13px; transition: all 0.3s; }
  .filters button:hover { background: #f0f0f0; }
  .filters button.active.passenger { background: #ffe066; color: #333; border-color: #ffd966; }
  .filters button.active.suv { background: #99ccff; color: #333; border-color: #80b3ff; }
  .filters button.active:not(.passenger):not(.suv) { background: #2196F3; color: white; border-color: #1976D2; }
  
  .sub-filters { display: flex; gap: 8px; flex-wrap: wrap; margin-top: 5px; }
  .sub-filters button { padding: 4px 10px; border: 1px solid #ddd; background: white; border-radius: 4px; cursor: pointer; font-size: 12px; }
  .sub-filters button.active { background: #2196F3; color: white; border-color: #1976D2; }
  
  .radius-filter { display: flex; gap: 6px; flex-wrap: wrap; margin-top: 5px; }
  .radius-btn { padding: 3px 8px; border: 1px solid #ddd; background: white; border-radius: 4px; cursor: pointer; font-size: 12px; }
  .radius-btn.active { background: #2196F3; color: white; }
  
  .filter-section { border: 1px solid #ddd; border-radius: 10px; padding: 8px 12px; margin-bottom: 12px; background: #fafafa; }
  .filter-section h3 { margin: 0 0 6px; font-size: 13px; color: #333; font-weight: 500; }
  
  .price-table { width: 100%; border-collapse: collapse; }
  .price-table th, .price-table td { padding: 10px 8px; text-align: left; border-bottom: 1px solid #ddd; font-size: 13px; }
  .price-table th { background: rgba(255,255,255,0.7); font-weight: 600; }
  .card { background: white; border-radius: 8px; padding: 16px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); margin-bottom: 20px; }
  
  @media (max-width: 768px) {
    .price-table { font-size: 14px; }
    .price-table th, .price-table td { padding: 6px; }
    .filters button { padding: 4px 10px; font-size: 12px; }
    .filter-section h3 { font-size: 12px; }
  }
`}</style>
    </div>
  );
};

export default PriceList;