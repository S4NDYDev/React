import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import '../../../styles/placeholders/Acceso.css';

const Acceso = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    name: '',
    confirmPassword: '',
    rememberMe: false
  });
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { login, register } = useAuth();
  const navigate = useNavigate();
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };
  
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    // Basic validation
    if (!formData.username || !formData.password) {
      setFormError('Por favor complete todos los campos');
      return;
    }
    try {
      setFormError('');
      setIsSubmitting(true);
      // Call the login function from our auth context
      await login(formData.username, formData.password);
      setFormSuccess('Inicio de sesión exitoso');
      setTimeout(() => {
        navigate('/');
      }, 1500);
    } catch (error) {
      setFormError(error.message || 'Error al iniciar sesión');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    // Basic validation
    if (!formData.username || !formData.name || !formData.email || !formData.password) {
      setFormError('Por favor complete todos los campos');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setFormError('Las contraseñas no coinciden');
      return;
    }
    try {
      setFormError('');
      setIsSubmitting(true);
      // Prepare user data for registration (adjust as needed for backend)
      const userData = {
        username: formData.username,
        name: formData.name,
        email: formData.email,
        password: formData.password
      };
      await register(userData);
      setFormSuccess('Registro exitoso. ¡Bienvenido!');
      setTimeout(() => {
        navigate('/');
      }, 1500);
    } catch (error) {
      setFormError(error.message || 'Error al registrar usuario');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const toggleForm = () => {
    setIsLogin(!isLogin);
    setFormError('');
    setFormSuccess('');
  };
  
  return (
    <div className="page-container">
      <div className="acceso-container">
        <div className="login-card">
          <div className="login-header">
            <h2>{isLogin ? 'Acceso al Sistema' : 'Registro de Usuario'}</h2>
            <p>
              {isLogin 
                ? 'Ingrese sus credenciales para acceder al sistema de administración escolar' 
                : 'Complete el formulario para crear una nueva cuenta en el sistema'}
            </p>
          </div>
          
          {formError && <div className="form-error">{formError}</div>}
          {formSuccess && <div className="form-success">{formSuccess}</div>}
          
          {isLogin ? (
            <form onSubmit={handleLoginSubmit}>
              <div className="form-group">
                <label htmlFor="username">Nombre de Usuario:</label>
                <input 
                  type="text" 
                  id="username" 
                  name="username"
                  value={formData.username} 
                  onChange={handleChange}
                  placeholder="Ingrese su nombre de usuario"
                  disabled={isSubmitting}
                  required 
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="password">Contraseña:</label>
                <input 
                  type="password" 
                  id="password" 
                  name="password"
                  value={formData.password} 
                  onChange={handleChange}
                  placeholder="Ingrese su contraseña"
                  disabled={isSubmitting}
                  required 
                />
              </div>
              
              <div className="form-check">
                <input 
                  type="checkbox" 
                  id="rememberMe" 
                  name="rememberMe"
                  checked={formData.rememberMe} 
                  onChange={handleChange}
                  disabled={isSubmitting}
                />
                <label htmlFor="rememberMe">Recordar mis datos</label>
              </div>
              
              <button 
                type="submit" 
                className="login-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Procesando...' : 'Iniciar Sesión'}
              </button>
            </form>
          ) : (
            <form onSubmit={handleRegisterSubmit}>
              <div className="form-group">
                <label htmlFor="name">Nombre Completo:</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name"
                  value={formData.name} 
                  onChange={handleChange}
                  placeholder="Ingrese su nombre completo"
                  disabled={isSubmitting}
                  required 
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="username">Nombre de Usuario:</label>
                <input 
                  type="text" 
                  id="username" 
                  name="username"
                  value={formData.username} 
                  onChange={handleChange}
                  placeholder="Ingrese su nombre de usuario"
                  disabled={isSubmitting}
                  required 
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Correo Electrónico:</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email"
                  value={formData.email} 
                  onChange={handleChange}
                  placeholder="usuario@ejemplo.com"
                  disabled={isSubmitting}
                  required 
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="password">Contraseña:</label>
                <input 
                  type="password" 
                  id="password" 
                  name="password"
                  value={formData.password} 
                  onChange={handleChange}
                  placeholder="Cree una contraseña segura"
                  disabled={isSubmitting}
                  required 
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="confirmPassword">Confirmar Contraseña:</label>
                <input 
                  type="password" 
                  id="confirmPassword" 
                  name="confirmPassword"
                  value={formData.confirmPassword} 
                  onChange={handleChange}
                  placeholder="Repita su contraseña"
                  disabled={isSubmitting}
                  required 
                />
              </div>
              
              <button 
                type="submit" 
                className="login-btn"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Procesando...' : 'Registrarse'}
              </button>
            </form>
          )}
          
          <div className="login-footer">
            <button 
              onClick={toggleForm} 
              className="toggle-form-btn"
              disabled={isSubmitting}
            >
              {isLogin ? '¿No tiene cuenta? Regístrese aquí' : '¿Ya tiene cuenta? Inicie sesión'}
            </button>
            {isLogin && <a href="#password-reset">¿Olvidó su contraseña?</a>}
            <p>Si tiene problemas para acceder, contacte al administrador del sistema</p>
          </div>
        </div>
        
        <div className="login-info">
          <h3>Información del Sistema</h3>
          <div className="info-card">
            <div className="info-item">
              <span className="info-label">Versión del sistema:</span>
              <span className="info-value">1.2.0</span>
            </div>
            <div className="info-item">
              <span className="info-label">Última actualización:</span>
              <span className="info-value">18/04/2025</span>
            </div>
            <div className="info-item">
              <span className="info-label">Soporte:</span>
              <span className="info-value">soporte@citec.edu</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Acceso;
