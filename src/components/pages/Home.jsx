import React from 'react';
import Slider from '../slider/Slider';
import '../../styles/Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <Slider />
      <div className="page-container">
        <div className="welcome-section">
          <h2>Bienvenido al Sistema de Gestión Farmacéutica
</h2>
          {/*<p>
            Este sistema permite gestionar los activos y recursos de la Facultad CITEC
            
          </p>
         */} <div className="feature-cards">
            <div className="feature-card">
              <h3>Gestión de Activos</h3>
              <p>Registra, actualiza y monitorea el estado de los activos de la farmacia.</p>
            </div>
            <div className="feature-card">
              <h3>Medicamentos y Suministros</h3>
              <p>Información sobre consulta de medicamentos y sus disponibilidades</p>
            </div>
            <div className="feature-card">
              <h3>Consejo de Salud</h3>
              <p>Recomendaciones sobre el uso adecuado de medicamentos, prevención de enfermedades, y consejos para el bienestar general.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
