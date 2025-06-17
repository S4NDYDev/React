import React, { useState } from 'react';
import '../../../styles/placeholders/Contacto.css';

const Contacto = () => {
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    department: 'general',
    subject: '',
    message: ''
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setContactForm({
      ...contactForm,
      [name]: value
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Contact form submitted:', contactForm);
    alert('Mensaje enviado correctamente (simulación)');
    setContactForm({
      name: '',
      email: '',
      department: 'general',
      subject: '',
      message: ''
    });
  };
  
  return (
    <div className="page-container">
      <div className="contacto-container">
        <div className="contact-section">
          <h2>Contacto</h2>
          <p className="contact-description">
            Si tiene alguna consulta o necesita asistencia, complete el formulario a continuación 
            y nos pondremos en contacto con usted lo antes posible.
          </p>
          
          <div className="contact-form-container">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Nombre Completo:</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name"
                  value={contactForm.name} 
                  onChange={handleChange}
                  required 
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Correo Electrónico:</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email"
                  value={contactForm.email} 
                  onChange={handleChange}
                  required 
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="subject">Asunto:</label>
                <input 
                  type="text" 
                  id="subject" 
                  name="subject"
                  value={contactForm.subject} 
                  onChange={handleChange}
                  required 
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="message">Mensaje:</label>
                <textarea 
                  id="message" 
                  name="message"
                  value={contactForm.message} 
                  onChange={handleChange}
                  rows="5"
                  required 
                ></textarea>
              </div>
              
              <button type="submit" className="contact-btn">Enviar Mensaje</button>
            </form>
          </div>
        </div>
        
        <div className="contact-info-section">
          <h3>Información de Contacto</h3>
          <div className="contact-info-card">
            <div className="contact-info-item">
              <div className="info-icon">📍</div>
              <div className="info-content">
                <h4>Dirección</h4>
                <p>Av. Universidad 1234, Col. Centro<br />Ciudad Universitaria, CP 12345</p>
              </div>
            </div>
            
            <div className="contact-info-item">
              <div className="info-icon">📞</div>
              <div className="info-content">
                <h4>Teléfono</h4>
                <p>(123) 456-7890</p>
                <p>(123) 456-7891</p>
              </div>
            </div>
            
            <div className="contact-info-item">
              <div className="info-icon">✉️</div>
              <div className="info-content">
                <h4>Correo Electrónico</h4>
                <p>info@citec.edu</p>
                <p>soporte@citec.edu</p>
              </div>
            </div>
            
            <div className="contact-info-item">
              <div className="info-icon">🕒</div>
              <div className="info-content">
                <h4>Horario de Atención</h4>
                <p>Lunes a Viernes: 8:00 AM - 4:00 PM</p>
                <p>Sábados: 9:00 AM - 12:00 PM</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contacto;
