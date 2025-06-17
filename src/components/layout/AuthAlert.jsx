import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/AuthAlert.css';

const AuthAlert = ({ onClose }) => (
  <div className="auth-alert-overlay">
    <div className="auth-alert-box">
      <p>Debe autenticarse primero para acceder a esta sección.</p>
      <Link className="auth-alert-link" to="/acceso">Ir a Acceso</Link>
      <button className="auth-alert-close" onClick={onClose}>Cerrar</button>
    </div>
  </div>
);

export default AuthAlert;
