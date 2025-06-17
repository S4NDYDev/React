import React from 'react';
import '../../styles/Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className='header_text'>
        <h1 className="header__title">Sistema de Gestión Farmacéutica</h1>
        <h2 className="header__subtitle"></h2>
      </div>
      <div className='logo_container'>
        <img src={'/public/assets/logo.png'} className="header_logo" alt={`logo_hdr`} />
      </div>
    </header>
  );
};

export default Header;
