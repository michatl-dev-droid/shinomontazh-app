import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          🚗 Шиномонтаж24
        </Link>
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/price-list">Цены</Link>
          </li>
          <li className="nav-item">
            <Link to="/service-points">Адреса</Link>
          </li>
          <li className="nav-item">
            <Link to="/map">Карта</Link>
          </li>
          <li className="nav-item">
            <Link to="/appointment">Записаться</Link>
          </li>
          <li className="nav-item">
            <Link to="/login">Войти</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;