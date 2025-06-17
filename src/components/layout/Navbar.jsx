import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import AuthAlert from './AuthAlert';
import '../../styles/Navbar.css';
import '../../styles/AuthAlert.css';

const Navbar = () => {
  const location = useLocation();
  const { pathname } = location;
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [showAuthAlert, setShowAuthAlert] = React.useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Handler for protected navigation
  const handleProtectedNav = (e, path) => {
    if (!currentUser) {
      e.preventDefault();
      setShowAuthAlert(true);
    } else {
      navigate(path);
    }
  };

  return (
    <nav className="navbar">
      <ul className="navbar-menu">
        <li>
          <Link
            className={`navbar__link ${pathname === '/' ? 'navbar__link--active' : ''}`}
            to="/"
            onClick={e => handleProtectedNav(e, '/')}
          >
            Inicio
          </Link>
        </li>
        
        <li>
          <Link
            className={`navbar__link ${pathname === '/areas-responsables' ? 'navbar__link--active' : ''}`}
            to="/areas-responsables"
            onClick={e => handleProtectedNav(e, '/areas-responsables')}
          >
            Medicamentos y Suministros
          </Link>
        </li>
        
        {/* Authentication Links */}
        {currentUser ? (
          <>
            <li className="navbar__user-info">
              <span className="navbar__username">Bienvenido, {currentUser.name}</span>
            </li>
            <li>
              <button 
                className="navbar__logout-btn"
                onClick={handleLogout}
              >
                Cerrar Sesión
              </button>
            </li>
          </>
        ) : (
          <li>
            <Link 
              className={`navbar__link ${pathname === '/acceso' ? 'navbar__link--active' : ''}`}
              to="/acceso"
              // No protección en Acceso
            >
              Acceso
            </Link>
          </li>
        )}
        
        <li>
          <Link
            className={`navbar__link ${pathname === '/contacto' ? 'navbar__link--active' : ''}`}
            to="/contacto"
            onClick={e => handleProtectedNav(e, '/contacto')}
          >
            Contacto
          </Link>
        </li>
      </ul>
      {showAuthAlert && <AuthAlert onClose={() => setShowAuthAlert(false)} />}
    </nav>
  );
};

export default Navbar;
